---
title: git 换行符
---

## git 中 CRLF 与 LF 的转换

> 文本文件所使用的换行符，在不同的系统平台上是不一样的

- `Windows`：使用的是0x0D0A（CRLF）
- `Linux/Unix`: 使用的是0x0A（LF）
- `Mac OS`: 使用的是0x0D（CR）
- `Mac OS X系统`：使用的是0x0A（LF），在更换内核后与 UNIX 保持一致

## 解决

### 设置 git 全局参数

```shell
# 统一换行符为 lf
git config --global core.eol lf

# 将自动转换关闭,避免转换失败不能不同进行提交
# true: 提交时转换为 LF，检出时转换为 CRLF
# false: 提交检出均不转换
# input: 提交时转换为LF，检出时不转换
git config --global core.autocrlf false

# 禁止混用 lf 和 crlf 两种换行符
# true: 拒绝提交包含混合换行符的文件
# false: 允许提交包含混合换行符的文件
# warn: 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf true
```

### 增加配置文件 .gitattributes

团队协作时，为了确保所有人统一换行符。git 提供了.gitattributes 文件解决这个问题，在项目根目录新建 .gitattributes 文件：

> .gitattributes 文件必须要提交之后才能生效。

```shell
# Set the default behavior, in case people don't have core.autocrlf set.

# text=auto 采用 git 认为最好的方式来处理文件；未在 .gitattributes 中设置的项默认按照这种方式处理；
# -text 表示让 git 在 checkin 以及 checkout 的时候，对 end-of-line 不做任何转换
# text 表示在 checkin 的时候会被转换为 LF；
# eol=crlf：对左边匹配的文件统一使用 CRLF 换行符格式，如果有文件中出现 LF 将会转换成 CRLF;
# eol=lf：对左边匹配的文件统一使用 LF 换行符格式，如果有文件中出现 CRLF 将会转换成 LF;
# binary: 告诉git该文件为二进制，防止 git 修改该文件。git 不会对对其中的换行符进行改变。
# 如果没有指定 text，git 会使用全局配置中的 core.autocrlf 来进行 eol 的转换

# text=auto和text的区别在于，text=auto由git来确定是不是文本文件，
# 从而进行转换；而text表示，你确定这个path就是文本文件，会直接对这个
# path进行转换，而不是有git来decides是否转换。

* text eol=lf
```

## 参考

1. [gitattributes](https://git-scm.com/docs/gitattributes)
2. [git 多平台统一换行符](https://juejin.cn/post/6844903591258357773)
