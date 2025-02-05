---
title: git ssh
---
## 检查是否生成了 ssh 秘钥

```shell
ssh -T git@github.com
```

## 生成秘钥

```shell
# 生成密钥
ssh-keygen -t rsa -C "your email"
# 连续3个回车。如果不需要密码的话。

# 查看该文件下的文件，看是否存在 id_isa 和 id_isa.pub 文件（也可能是别的文件名）
cd ~/.ssh
ls

# 添加公钥到 github、gitlab
cat ~/.ssh/id_rsa.pub

# 查看 ssh文件是否配置成功
ssh -T git@github.com
```

## ssh 连接失败

```shell
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository

# 通常表示系统无法通过 SSH 连接到 GitHub
```

1. 检查网络连接
2. 检查防火墙设置
3. 使用不同的 SSH 端口

### 配置 Git 使用端口 443 进行 SSH 连接到 GitHub

在主目录下找到或创建一个 SSH 配置文件 `~/.ssh/config`

```text
Host github.com
    HostName ssh.github.com
    User git
    Port 443
```
