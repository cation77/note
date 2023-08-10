---
title: npm link
---

## link

在项目 `project` 中使用 `package` 包

### 建立链接

1. 使用 `npm link` 将 `package` 创建本地依赖包，在 `package` 项目目录下执行： `npm link`

2. 项目 `project` 中添加 `package` 的软链接，在  `project` 项目目录下执行： `npm link [packageName]`。 `packageName` 是 `package` 中 `package.json` 的 `name` 属性值

### 解除连接

1. 解除项目的依赖直接在项目目录下执行：`npm unlink [packageName]`

2. 解除本地 `package` 包，在 `package` 项目目录下执行： `npm unlink [packageName]`。这样本地的包解除链接，其他项目的软链接也失效了。

## 参考

1. [npm-link基本使用](https://zhuanlan.zhihu.com/p/361856970)
