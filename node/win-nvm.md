---
title: win 使用 nvm 管理 node版本
---

>当我们做项目开发时，需要切换不同 `node` 版本，对于 `window` 平台管理 `node` 版本，可以使用 `[nvm-windows](https://github.com/coreybutler/nvm-windows)` 管理。
> 注意 `nvm-windows` 与 `[nvm](https://github.com/nvm-sh/nvm)` 不同。尽管双方存在差异，但在具体使用上，基本差不多

## 安装 nvm-windows

从[发布列表](https://github.com/coreybutler/nvm-windows/releases)下载最新 `nvm-setup.zip`，解压后安装，配置选择默认也可以自定义

打开 `cmd` 命令行窗口，输入 `nvm` 或 `nvm version` 查看 `nvm-windows` 是否安装成功

1. 安装失败，重新执行`nvm-setup.exe`安装
2. 配置环境变量（建议系统默认）
|  系统变量   |                               值                               |
| :---------: | :------------------------------------------------------------: |
|  NVM_HOME   | C:\\Users\\Administrator\\AppData\\Roaming\\nvm（nvm安装位置） |
| NVM_SYMLINK |           C:\\Program Files\\nodejs（node链接位置）            |

|  用户变量   |                       值                        |
| :---------: | :---------------------------------------------: |
|  NVM_HOME   | C:\\Users\\Administrator\\AppData\\Roaming\\nvm |
| NVM_SYMLINK |            C:\\Program Files\\nodejs            |

注意在使用 `nvm` 安装时，需要卸载掉之前已安装的 `node`（并把已全局安装的包也删除）

1. 需要全局安装的包，在安装对应 `node` 版本后 `npm i -g *`
2. 通过 `nvm use version` 切换版本，可以使用对应版本下的全局包

```shell
nvm list available # 获取可以下载版本列表
nvm install version # 选中需要下载的版本
nvm use version # 切换到指定版本
node -v # 查看node是否安装成功及版本号
npm -v # 查看npm是否安装成功及版本号
npm ls -g --depth -0 # 查看npm全局安装包列表
npm i -g * # npm安装全局包
```
