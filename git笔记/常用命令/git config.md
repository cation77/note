---
title: git config
---

## 项目 git 配置

```shell
git config -l
```

## 全局配置

```shell
git config --global -l
```

### 添加全局配置

```shell
git config --global user.name 'username'
git config --global user.email 'email'
```

### 删除全局配置

```shell
git config --global --unset user.name
git config --global --unset user.email
```

## 参考

1. [配置 Git](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)
2. [git-config](https://git-scm.com/docs/git-config)
