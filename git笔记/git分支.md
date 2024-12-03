---
title: git分支操作
---

## branch 命令

```shell
# 列出本地分支
git branch

# 列出远程分支
git branch -r

# 列出本地和远程所有分支
git branch -a
```

## 新建分支

```shell
git branch -b branchName
```

## 切换分支

```shell
git checkout branchName

# 如果该分支本地不存在，你可以使用 -b 参数来创建并切换到新的分支
git checkout -b newBranchName
```

## 从远程拉新分支

```shell
# 拉取远程分支并在本地创建对应的分支
git checkout -b branchName origin/branchName
```

## 本地分支与远程分支关联

```shell
# 如果需要手动关联
git branch --set-upstream-to=origin/branchName branchName
```

## 删除分支

```shell
git branch -d branchName

# 使用 -D 强制删除
git branch -D branchName
```

> 还在当前分支上，Git 是不允许你删除这个分支的

### 删除远程分支

```shell
git push origin --delete branchName
```

## 修改、重命名分支名

### 当前分支

```shell
git branch -m newBranchName
```

### 不在当前分支

```shell
git branch -m oldBranchName newBranchName
```

## 参考

1. [Git 小册- git 分支](https://www.yuque.com/yuhangziyue/git/ssumtc)
