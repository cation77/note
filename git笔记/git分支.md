---
title: git分支操作
---

## 新建分支

```shell
git branch -b branchName
```

### 从远程拉新分支

```shell
git checkout branchName
```

## 删除分支

```shell
git branch -d branchName
```

> 还在当前分支上，Git 是不允许你删除这个分支的

### 删除远程分支

```shell
git push origin --delete branchName
```

## 修改分支名

### 当前分支

```shell
git branch -m newBranchName
```

### 不在当前分支

```shell
git branch -m lodBranchName newBranchName
```

## 参考

1. [Git 小册- git 分支](https://www.yuque.com/yuhangziyue/git/ssumtc)
