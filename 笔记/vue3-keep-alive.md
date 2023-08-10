---
title: vue3 KeepAlive
---

## keep-alive 和 router-view

`transition` 和 `keep-alive` 现在必须通过 `v-slot` API 在 `RouterView` 内部使用
注意：当同时使用 `KeepAlive` 和 `Transition`，需要先进行 `Transition` 然后再进行 `KeepAlive`

```vue
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

## 参考

1. [keep-alive 和 transition](https://router.vuejs.org/zh/guide/migration/#router-view-%E3%80%81-keep-alive-%E5%92%8C-transition)
