---
title: git remote
---

## 切换 git 远程地址

```shell
# 检查当前项目git
git config --list

# 1. 查看当前远程信息
git remote -v

# 2. 切换到http：
git remote set-url origin https://github.com/username/repository.git

# 3. 或者切换到ssh：
git remote set-url origin git@github.com:username/repository.git
```

## 删除远程地址重新添加

```shell
# 删除远程地址
git remote rm origin

# 添加远程地址
git remote add origin https://github.com/username/repository.git

# 将远程内容拉到本地
git fetch
```

## remote 命令

- `git remote`：列出当前仓库中已配置的远程仓库。
- `git remote -v`：列出当前仓库中已配置的远程仓库，并显示它们的 URL。
- `git remote add <remote_name> <remote_url>`：添加一个新的远程仓库。指定一个远程仓库的名称和 URL，将其添加到当前仓库中。
- `git remote rename <old_name> <new_name>`：将已配置的远程仓库重命名。
- `git remote remove <remote_name>`：从当前仓库中删除指定的远程仓库。
- `git remote set-url <remote_name> <new_url>`：修改指定远程仓库的 URL。
- `git remote show <remote_name>`：显示指定远程仓库的详细信息，包括 URL 和跟踪分支。

## 参考

1. [remote 命令](https://www.jianshu.com/p/09bb9a6a13e6)
