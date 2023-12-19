---
title: HTTP 基础
---

## 简单请求和非简单请求

同时满足以下两个条件，属于`简单请求`：

1. 请求方法是 `HEAD`、`GET`、`POST` 三种之一;
2. `HTTP` 头信息不超过右边着几个字段：`Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`;`Content-Type` 只限于三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

不同时满足这两个条件的，都属于`非简单请求`

### 简单请求

对于简单请求，浏览器会在头信息中增加 `Origin` 字段后直接发出，`Origin` 字段用来说明，本次请求来自的哪个源（协议+域名+端口）。
如果服务器发现 `Origin` 指定的源不在许可范围内，服务器会返回一个正常的 `HTTP` 回应，浏览器取到回应之后发现回应的头信息中没有包含 `Access-Control-Allow-Origin` 字段，就抛出一个错误给 `XHR` 的 error 事件；
如果服务器发现 `Origin` 指定的域名在许可范围内，服务器返回的响应会多出几个 `Access-Control-` 开头的头信息字段。

### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 `PUT` 或 `DELETE`，或 `Content-Type` 值为 `application/json`。浏览器会在正式通信之前，发送一次 `HTTP` 预检 `OPTIONS` 请求，先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 `HTTP` 请求方法和头信息字段。只有得到肯定答复，浏览器才会发出正式的 `XHR` 请求，否则报错。

## 跨域

跨域是浏览器的[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)决定的，是一个重要的`浏览器安全策略`，用于限制一个 origin 的文档或者它加载的脚本与另一个源的资源进行交互，它能够帮助阻隔恶意文档，减少可能被攻击的媒介，可以使用 `CORS` 配置解除这个限制。

```shell
# 同源的例子
http://example.com/app1/index.html  # 只是路径不同
http://example.com/app2/index.html

http://Example.com:80  # 只是大小写差异
http://example.com

# 不同源的例子
http://example.com/app1   # 协议不同
https://example.com/app2

http://example.com        # host 不同
http://www.example.com
http://myapp.example.com

http://example.com        # 端口不同
http://example.com:8080
```
