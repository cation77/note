---
title: git log 和 reflog 命令
---

## git log

> 不能察看已经删除了的commit记录

### 常用选项

|      选项      |                                                说明                                                 |
| :------------: | :-------------------------------------------------------------------------------------------------: |
|       -p       |                                  按补丁格式显示每个更新之间的差异                                   |
|     –stat      |                                   显示每次更新的文件修改统计信息                                    |
|   –shortstat   |                              只显示 –stat 中最后的行数修改添加移除统计                              |
|   –nameonly    |                                 仅在提交信息后显示已修改的文件清单                                  |
|  –namestatus   |                                   显示新增、修改、删除的文件清单                                    |
| –abbrev-commit |                           仅显示 SHA-1 的前几个字符，而非所有的 40 个字符                           |
| –relative-date |                            使用较短的相对时间显示（比如，“2 weeks ago”）                            |
|     –graph     |                                  显示 ASCII 图形表示的分支合并历史                                  |
|    –pretty     | 使用其他格式显示历史提交信息。可用的选项包括 oneline，short，full，fuller 和 format（后跟指定格式） |

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

## git reflog 和 git log 的区别

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
commit f6d27d9fbf8537351d944bcc71e28452710d0c1c (HEAD -> master) feat3
commit 2f476b9ae05265957f054df270c84700cb9285eb feat2
commit 366b90ab85a78e76637b546d5ae2b3a930557ec3 feat1
```

## 参考

1. [git-reflog](https://git-scm.com/docs/git-reflog)
