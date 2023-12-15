---
title: git fetch 和 git pull
---

## 执行 git pull

在执行了 `git pull` 后，代码会自动 merge 到本地分支中，而 `git fetch` 会忽略这个 merge 操作

```shell
git pull = git fetch & git merge
```

## git fetch 命令

`git fetch` 是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。
