---
title: git 基本配置
---

## 全局配置

### 查看全局配置

```shell
git config --list
```

### 修改全局配置

- 设置用户名、邮箱

```shell
git config --global user.name "myName"
git config --global user.email "myEmail"
```

- 设置编码

```shell
git config --global gui.encoding utf8
git config --global i18n.commitencoding utf8
git config --global i18n.logoutputencoding gbk
```

- 延长克隆的时间
  
 ```shell
git config --global http.postBuffer 600000
```

### 取消全局配置

```shell
# 取消指定的全局配置项
git config --global --unset user.name

# 编辑配置文件来取消全局配置
git config --global --edit
```
