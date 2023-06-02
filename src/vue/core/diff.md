---
title: vue3 diff
---

## 比较前提

vue 在做 diff 比较时有一个前提就是两次对比的节点是相同的：需要符合 key 相同以及 type 相同

```js
// packages\runtime-core\src\vnode.ts 354-368
export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
  if (
    __DEV__ &&
    n2.shapeFlag & ShapeFlags.COMPONENT &&
    hmrDirtyComponents.has(n2.type as ConcreteComponent)
  ) {
    // #7042, ensure the vnode being unmounted during HMR
    // bitwise operations to remove keep alive flags
    n1.shapeFlag &= ~ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
    n2.shapeFlag &= ~ShapeFlags.COMPONENT_KEPT_ALIVE
    // HMR only: if the component has been hot-updated, force a reload.
    return false
  }
  return n1.type === n2.type && n1.key === n2.key
}
```

## diff 比较

| 情况  | 老节点 text | 老节点 children | 新节点 text | 新节点 children |
| :---: | :---------: | :-------------: | :---------: | :-------------: |
|   1   |      ❎      |        ❎        |      ❎      |        ❎        |
|   2   |      ❎      |        ✅        |      ❎      |        ❎        |
|   3   |      ✅      |        ❎        |      ❎      |        ❎        |
|   4   |      ❎      |        ❎        |      ❎      |        ✅        |
|   5   |      ❎      |        ✅        |      ❎      |        ✅        |
|   6   |      ✅      |        ❎        |      ❎      |        ✅        |
|   7   |      ❎      |        ❎        |      ✅      |        ❎        |
|   8   |      ❎      |        ✅        |      ✅      |        ❎        |
|   9   |      ✅      |        ❎        |      ✅      |        ❎        |

1. 头头比较，从头遍历比较新旧队列，相同节点则 `patch`，节点不符合 `isSameVNodeType` 则跳出循环
2. 尾尾比较，从尾遍历比较新旧队列，相同节点则 `patch`，节点不符合 `isSameVNodeType` 则跳出循环
3. 添加新节点，经过步骤1、2比较，旧队列不存在节点且新队列还有节点，则 `patch` 剩余新节点
4. 删除旧节点，经过步骤1、2比较，旧队列存在节点且新队列为空，则 `unmount` 旧队列剩余节点
5. 经过步骤1、2比较，新旧队列都存有节点，进行复杂比较，找出需要新增、更新、删除和复用节点
   1. 生成 key Map：`keyToNewIndexMap`，用于新节点 `key` 映射当前节点在新队列中的 `index`
   2. 遍历旧队列，找到匹配的节点，尽可能多的找到相同节点（当旧节点有 `key` 时根据 `keyToNewIndexMap` 找，没有 `key` 则遍历新队列去匹配旧节点）
      1. 当旧节点没有匹配到新节点 `newIndex`，则 `unmount` 此旧节点
      2. 匹配的新节点还需要根据 `newIndex >= maxNewIndexSoFar` 判断是否有移动
      3. 当新队列的所有节点都匹配完，剩余旧节点要被 `unmount`
   3. 通过 `toBePatched` 遍历新队列，当新节点对应 `newIndexToOldIndexMap` 值为 `0`，则 `patch` 该节点，当 `newIndexToOldIndexMap` 有值且 `moved` 为正则该节点需要 `move`

## patch

1. 当新旧节点完全相同则不用更新
2. 当旧节点存在且不符合 `isSameVNodeType`，则需要`unmount`旧节点
3. 当新节点的 `patchFlag` 为 `PatchFlags.BAIL` 时，退出优化模式 `optimized = false`
4. 判断节点的 `type`
   1. `Text` 类型调用 `processText`
   2. `Comment` 类型调用 `processCommentNode`
   3. `Static` 类型且旧节点不存在，调用 `mountStaticNode`
   4. `Fragment` 类型调用 `processFragment`
   5. `type` 类型是其他值的，需要判断节点的 `shapeFlag`
      1. `ShapeFlags.ELEMENT` 调用 `processElement`
      2. `ShapeFlags.COMPONENT` 调用 `processComponent`

## unmount

1. 移除节点的 ref
2. 节点的 `shapeFlag & ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE` 则 `deactivate` 该节点并退出 `unmount`方法
3. 节点有 `props.onVnodeBeforeUnmount`，则执行 `invokeVNodeHook`
4. 节点的 `shapeFlag & ShapeFlags.COMPONENT` 则执行 `unmountComponent`
5.

## 源码

```js
// packages\runtime-core\src\renderer.ts 1751-1989
const patchKeyedChildren = (
  c1: VNode[],
  c2: VNodeArrayChildren,
  container: RendererElement,
  parentAnchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  let i = 0;
  const l2 = c2.length;
  let e1 = c1.length - 1; // prev ending index
  let e2 = l2 - 1; // next ending index

  // 1. sync from start
  // (a b) c
  // (a b) d e
  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = (c2[i] = optimized
      ? cloneIfMounted(c2[i] as VNode)
      : normalizeVNode(c2[i]));
    if (isSameVNodeType(n1, n2)) {
      patch(
        n1,
        n2,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      break;
    }
    i++;
  }

  // 2. sync from end
  // a (b c)
  // d e (b c)
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1];
    const n2 = (c2[e2] = optimized
      ? cloneIfMounted(c2[e2] as VNode)
      : normalizeVNode(c2[e2]));
    if (isSameVNodeType(n1, n2)) {
      patch(
        n1,
        n2,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      break;
    }
    e1--;
    e2--;
  }

  // 3. common sequence + mount
  // (a b)
  // (a b) c
  // i = 2, e1 = 1, e2 = 2
  // (a b)
  // c (a b)
  // i = 0, e1 = -1, e2 = 0
  if (i > e1) {
    if (i <= e2) {
      const nextPos = e2 + 1;
      const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor;
      while (i <= e2) {
        patch(
          null,
          (c2[i] = optimized
            ? cloneIfMounted(c2[i] as VNode)
            : normalizeVNode(c2[i])),
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        i++;
      }
    }
  }

  // 4. common sequence + unmount
  // (a b) c
  // (a b)
  // i = 2, e1 = 2, e2 = 1
  // a (b c)
  // (b c)
  // i = 0, e1 = 0, e2 = -1
  else if (i > e2) {
    while (i <= e1) {
      unmount(c1[i], parentComponent, parentSuspense, true);
      i++;
    }
  }

  // 5. unknown sequence
  // [i ... e1 + 1]: a b [c d e] f g
  // [i ... e2 + 1]: a b [e d c h] f g
  // i = 2, e1 = 4, e2 = 5
  else {
    const s1 = i; // prev starting index
    const s2 = i; // next starting index

    // 5.1 build key:index map for newChildren
    const keyToNewIndexMap: Map<string | number | symbol, number> = new Map();
    for (i = s2; i <= e2; i++) {
      const nextChild = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]));
      if (nextChild.key != null) {
        if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
          warn(
            `Duplicate keys found during update:`,
            JSON.stringify(nextChild.key),
            `Make sure keys are unique.`
          );
        }
        keyToNewIndexMap.set(nextChild.key, i);
      }
    }

    // 5.2 loop through old children left to be patched and try to patch
    // matching nodes & remove nodes that are no longer present
    let j;
    let patched = 0;
    const toBePatched = e2 - s2 + 1;
    let moved = false;
    // used to track whether any node has moved
    let maxNewIndexSoFar = 0;
    // works as Map<newIndex, oldIndex>
    // Note that oldIndex is offset by +1
    // and oldIndex = 0 is a special value indicating the new node has
    // no corresponding old node.
    // used for determining longest stable subsequence
    const newIndexToOldIndexMap = new Array(toBePatched);
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i];
      if (patched >= toBePatched) {
        // all new children have been patched so this can only be a removal
        unmount(prevChild, parentComponent, parentSuspense, true);
        continue;
      }
      let newIndex;
      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key);
      } else {
        // key-less node, try to locate a key-less node of the same type
        for (j = s2; j <= e2; j++) {
          if (
            newIndexToOldIndexMap[j - s2] === 0 &&
            isSameVNodeType(prevChild, c2[j] as VNode)
          ) {
            newIndex = j;
            break;
          }
        }
      }
      if (newIndex === undefined) {
        unmount(prevChild, parentComponent, parentSuspense, true);
      } else {
        newIndexToOldIndexMap[newIndex - s2] = i + 1;
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex;
        } else {
          moved = true;
        }
        patch(
          prevChild,
          c2[newIndex] as VNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        patched++;
      }
    }

    // 5.3 move and mount
    // generate longest stable subsequence only when nodes have moved
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : EMPTY_ARR;
    j = increasingNewIndexSequence.length - 1;
    // looping backwards so that we can use last patched node as anchor
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i;
      const nextChild = c2[nextIndex] as VNode;
      const anchor =
        nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor;
      if (newIndexToOldIndexMap[i] === 0) {
        // mount new
        patch(
          null,
          nextChild,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else if (moved) {
        // move if:
        // There is no stable subsequence (e.g. a reverse)
        // OR current node is not among the stable sequence
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          move(nextChild, container, anchor, MoveType.REORDER);
        } else {
          j--;
        }
      }
    }
  }
};
```
