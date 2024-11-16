---
title: 免费cloudflare部署
---

## 单一

## BPB面板

### 准备材料

1. github 项目地址: <https://github.com/ansoncloud8/BPB-Worker-Panel>
2. 登录 [CF](https://cloudflare.com/)，邮箱可以免费注册
3. 申请注册免费域名帐号(邮箱可以免费注册)，[dynv6](https://dynv6.com/)
4. [UUID](https://1024tools.com/uuid)，生成UUID

### 部署

1. 打开 Cloudflare 的 `workers-and-pages` 选项栏，选择 `KV`，在 `KV` 模块，创建一个命名空间
2. 回到 `workers-and-pages` 的概览模块，点击 `创建` 按钮，选择 `Pages` 模块，选择 `使用直接上传创建`，上传文件是，github 项目的 `_worker.js.zip` 压缩文件
3. 配置环境变量 `UUID`，回到概览模块，选择 `设置` 模块，添加 `变量和机密`，变量名称必须是 `UUID`, 打开 UUID 生成器网页，复制粘贴
4. 配置自定义域，回到概览模块，选择 `自定义域` 模块，添加申请的域名，需要添加自定义次级域名：`[SECOND-URL].[YOUR-dynv6-URL]`，添加 该自定义域的 CNAME 记录
5. 配置 `KV 命名空间`，回到概览模块，选择 `设置` 模块，添加 `绑定`，选择 `KV 命名空间`，变量名称必须是 `bpb`，选择刚刚创建的 `KV 名称`
6. 配置完后，需要重新部署 pages，点击页面右侧的 `创建部署`，点击 `上传压缩文件`， 选择 `_worker.js.zip` 压缩文件
7. 访问 `https://[YOUR-PAGES-URL]/panel`，初次部署需要修改密码
8. 访问 `https://[YOUR-PAGES-URL]/login`，访问部署服务

> 防止别人扫描你的节点等信息,一定要同时修改BPB面板登录密码和设置UUID变量

## 参考

1. [免费cloudflare部署BPB面板](https://am.809098.xyz/bpb/)
