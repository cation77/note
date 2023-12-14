---
title: git 远程分支
---

## 检查当前项目git

`git config --list`

1. 查看当前远程信息
`git remote -v`

2. 切换到http：
`git remote set-url origin https://github.com/username/repository.git`

3. 切换到ssh：
`git remote set-url origin git@github.com:username/repository.git`

## 删除远程从新替换新远程地址

1. `git remote rm origin`
2. `git remote add origin https://github.com/username/repository.git`
3. `git fetch`

## 参考

1. [remote 命令](https://www.jianshu.com/p/09bb9a6a13e6)
