---
title: npmmirror 镜像
---

由于众所周知的网络原因，在使用 npm 安装依赖包时，可能会因网络原因导致下载失败。
此时切换到国内提供的镜像站点，可以帮助我们下载安装对应依赖包。

## npm 设置

### 修改 npm 全局配置

```shell
# 查看 npm 全局配置
npm config list

# 查看源
npm get registry

# 临时修改
npm install axios --registry https://registry.npmmirror.com 

# 配置 registry
npm config set registry https://registry.npmmirror.com

# 还原
npm config set registry https://registry.npmjs.org/
```

### 使用定制的cnpm命令行工具

```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```

## pnpm 设置

```shell
# 查看 npm 全局配置
pnpm config list

# 临时修改
pnpm install axios --registry https://registry.npmmirror.com

# 配置 registry
pnpm config set registry https://registry.npmmirror.com

# 还原
pnpm config set registry https://registry.npmjs.org/
```

## 异常

在配置阿里镜像源之后，可能有一些包的某个版本在安装的过程提示不存在，但是在 [npm 官网](https://www.npmjs.com/) 官网查询是存在的。
出现这个问题，可能是因为这个包阿里镜像源还没有同步过来，这个时候可以到 [npmmirror 镜像站](https://npmmirror.com/) 手动同步一下。

## 网站链接

1. [npm](https://www.npmjs.com/)
2. [npmmirror 镜像站](https://npmmirror.com/)
