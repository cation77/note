---
title: git 命令操作
---

## git reset

## git commit

```shell
git commit -m ""
```

```shell
git commit --amend ""
```

## git reflog

1. git reflog 并不是 git 仓库的一部分，它单独存储，纯属于本地
2. `git reflog` 命令中保留了从 `clone` 仓库开始，用户所有在本地库中的操作
3. 所有引起 HEAD 指针变动的操作，都会被记录在 `git reflog` 命令中

### 概要

```shell
git reflog <subcommand> <options>
```

```shell
git reflog [show] [log-options] [<ref>]
git reflog expire [--expire=<time>] [--expire-unreachable=<time>]
        [--rewrite] [--updateref] [--stale-fix]
        [--dry-run] [--verbose] [--all | <refs>…​]
git reflog delete [--rewrite] [--updateref]
        [--dry-run] [--verbose] ref@{specifier}…​
git reflog exists <ref>
```

### reflog 信息

```shell
git reflog
f6d27d9 HEAD@{0}: commit: feat3
2f476b9 HEAD@{1}: commit: feat2
366b90a HEAD@{2}: reset: moving to HEAD
366b90a HEAD@{3}: reset: moving to HEAD
366b90a HEAD@{4}: commit: feat1
```

```shell
git log
commit f6d27d9fbf8537351d944bcc71e28452710d0c1c (HEAD -> master)
    feat3

commit 2f476b9ae05265957f054df270c84700cb9285eb
    feat2

commit 366b90ab85a78e76637b546d5ae2b3a930557ec3
    feat1
```

## 参考

1. [git-reflog](https://git-scm.com/docs/git-reflog)
