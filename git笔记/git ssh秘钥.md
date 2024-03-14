---
title: git ssh 秘钥
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
