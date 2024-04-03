---
title: AVL Tree
---

## AVL Tree

```javascript
class TreeNode {
  val; // 节点值
  left; // 左子节点指针
  right; // 右子节点指针
  height; //节点高度
  constructor(val, left, right, height) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.height = height === undefined ? 0 : height;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  /* 获取节点高度 */
  height(node) {
    // 空节点高度为 -1 ，叶节点高度为 0
    return node === null ? -1 : node.height;
  }

  #updeateHeight(node) {
    // 节点高度等于最高子树高度 + 1
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  /* 获取平衡因子 */
  balanceFactor(node) {
    // 空节点平衡因子为 0
    if (node === null) return 0;
    // 节点平衡因子 = 左子树高度 - 右子树高度
    return this.height(node.left) - this.height(node.right);
  }

  #rightRotate(node) {
    const child = node.left;
    const grandChild = child.right;
    // 以 child 为原点，将 node 向右旋转
    child.right = node;
    node.left = grandChild;
    // 更新节点高度
    this.#updeateHeight(node);
    this.#updeateHeight(child);
    // 返回旋转后子树的根节点
    return child;
  }

  #leftRotate(node) {
    const child = node.right;
    const grandChild = child.left;
    // 以 child 为原点，将 node 向左旋转
    child.left = node;
    node.right = grandChild;
    this.#updeateHeight(node);
    this.#updeateHeight(child);
    return child;
  }

  /* 执行旋转操作，使该子树重新恢复平衡 */
  #rotate(node) {
    // 获取节点 node 的平衡因子
    const balanceFactor = this.balanceFactor(node);
    if (balanceFactor > 1) {
      // 左偏树
      if (this.balanceFactor(node.left) >= 0) {
        // 右旋
        return this.#rightRotate(node);
      } else {
        // 先左旋后右旋
        node.left = this.#leftRotate(node.left);
        return this.#rightRotate(node);
      }
    }
    if (balanceFactor < -1) {
      // 右偏树
      if (this.balanceFactor(node.right) <= 0) {
        // 左旋
        return this.#leftRotate(node);
      } else {
        // 先右旋后左旋
        node.right = this.#rightRotate(node.right);
        return this.#leftRotate(node);
      }
    }
    // 平衡树，无须旋转，直接返回
    return node;
  }

  insert(val) {
    this.root = this.#insertHelper(this.root, val);
  }

  /* 递归插入节点（辅助方法） */
  #insertHelper(node, val) {
    if (node === null) {
      return new TreeNode(val);
    }
    if (node.val < val) {
      node.right = this.#insertHelper(node.right, val);
    } else if (node.val > val) {
      node.left = this.#insertHelper(node.left, val);
    } else {
      // 重复节点不插入，直接返回
      return node;
    }
    // 更新节点高度
    this.#updeateHeight(node);
    // 执行旋转操作，使该子树重新恢复平衡
    node = this.#rotate(node);
    return node;
  }

  remove(val) {
    this.root = this.#removeHelper(this.root, val);
  }

  /* 递归删除节点（辅助方法） */
  #removeHelper(node, val) {
    if (node === null) {
      return null;
    }
    // 查找节点并删除
    if (node.val < val) {
      node.right = this.#removeHelper(node.right, val);
    } else if (node.val > val) {
      node.left = this.#removeHelper(node.left, val);
    } else {
      if (node.left === null || node.right === null) {
        const child = node.left !== null ? node.left : node.right;

        if (child === null) {
          // 子节点数量 = 0 ，直接删除 node 并返回
          return null;
        } else {
          // 子节点数量 = 1 ，直接删除 node
          node = child;
        }
      } else {
        // 子节点数量 = 2 ，则将中序遍历的下个节点删除，并用该节点替换当前节点
        let temp = node.right;
        while (temp.left !== null) {
          temp = temp.left;
        }
        node.right = this.#removeHelper(node.right, temp.val);
        node.val = temp.val;
      }
    }
    // 更新节点高度
    this.#updeateHeight(node);
    // 执行旋转操作，使该子树重新恢复平衡
    node = this.#rotate(node);
    return node;
  }

  /* 查找节点 */
  search(val) {
    let cur = this.root;
    // 循环查找
    while (cur !== null) {
      if (cur.val < val) {
        cur = cur.right;
      } else if (cur.val > val) {
        cur = cur.left;
      } else {
        // 找到目标节点，跳出循环
        break;
      }
    }
    return cur;
  }
}
```
