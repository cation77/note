---
title: git 切换仓库
---

## 检查当前项目git

```shell

git config --list

# 1. 查看当前remote

git remote -v

# 2. 切换到http：

git remote set-url origin https://github.com/username/repository.git

# 3. 切换到ssh：

git remote set-url origin git@github.com:username/repository.git
```

## 相关命令

```shell
git remote rm origin

git remote add origin git@github.com:username/repository.git
```
