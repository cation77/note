---
tilte: vue3组件透传
---

# 组件透传

组件透传分为：属性透传、事件透传、以及插槽透传

## 属性透传

### 自动透传

当一个组件以单个元素为根作渲染时，透传的 `attribute` 会自动被添加到根元素上
属性、class、style、事件等会自动透传绑定到组件根元素标签上

```html
<!-- 子组件中 -->
<template>
   <button>click me</button>
</template>
```

```html
<!-- 父组件 -->
<MyButton class="large" />
```

```html
<!-- 最终渲染 -->
<button class="large">click me</button>
```

### 手动

当组件有多个根元素节点时，没有自动透传绑定属性行为，此时需要我们手动绑定透传属性

```html
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>

<!-- 可以绑定多个 -->
<template>
  <header v-bind="$attrs">...</header>
  <main v-bind="$attrs">...</main>
  <footer v-bind="$attrs">...</footer>
</template>
```

### 禁用 Attributes 透传

当不想要一个组件自动地继承 attribute，可以在组件中设置 `inheritAttrs: false`

```js
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>

```

### $attrs 和 props 区别

`$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute
因此如果组件事先定义了 `defineEmits` 或 `defineProps`，那么就是 `props属性` 或自定义事件，不再是透传属性

摘抄官网描述区别：

- 和 props 有所不同，透传 attributes 在 JavaScript 中保留了它们原始的大小写，所以像 foo-bar 这样的一个 attribute 需要通过 $attrs['foo-bar'] 来访问。
- 像 @click 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 $attrs.onClick。

```html
<!-- 子组件 -->
<template>
  <div></div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
```

```html
<!-- 父组件 -->
<child name="cat" class="item" title="标题"></child>
```

```html
<!-- 最终渲染 -->
<div name="cat" class="item"></div>
```

`defineProps` 定义的属性会被 `props` 消费，不再作为透传属性传递

## 事件透传

> vue3 已弃用 `$listeners` 对象，将事件监听器并入 `$attrs`

### vue2.4+ 透传

在 vue3 事件透传只需要组件绑定 `v-bind="$attrs"`，但在 vue2* 版本透传事件需要增加 `v-on="$listeners"`

```html
<template>
  <BaseInput v-bind="$attrs" v-on="$listeners"></BaseInput>
</template>
```

## 插槽透传

在 `template` 模板中通过使用 `v-for` 遍历 `$slots` 对象并填充 `<slot/>` 组件

```html
<template>
  <BaseInput v-bind="$attrs">
    <template v-for="(_, name) in $slots" v-slot:[name] :key="name">
      <slot :name="name"></slot>
    </template>
  </BaseInput>
</template>

<!-- slot 数据 -->
<template>
  <BaseInput v-bind="$attrs">
    <template v-for="(_, name) in $slots" v-slot:[name]="data" :key="name">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </BaseInput>
</template>
```

## 参考

1. [透传 Attributes](https://cn.vuejs.org/guide/components/attrs.html#fallthrough-attributes)
2. [搞懂 Vue3 中的透传属性](https://juejin.cn/post/7086724982486597668)
3. [如何在 vue3 正确透传插槽](https://juejin.cn/post/7094858996103774245)
