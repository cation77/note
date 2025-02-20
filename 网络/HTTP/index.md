---
title: HTTP 基础
---

## HTTP/0.9

HTTP 0.9 版本的协议简单到极点，请求时不支持请求头，只支持 GET 方法

## HTTP/1.0

- 在请求中加入了 HTTP 版本号，比如：`GET /coolshell/index.html HTTP/1.0`
- HTTP 有了 header，不管是 request 还是 response 都有了 header
- 增加了 HTTP status Code 标识相关的状态码
- 还有 `Content-Type` 可以传输其它文件

缺陷：HTTP/1.0 性能上有很大的问题，每请求一个资源都要新建一个 TCP 链接，而且是串行请求，所以，就算网络变快了，打开网页的速度也还是很慢。

## HTTP/1.1

- 可以设置 `keepalive` 让 HTTP 重用 TCP 链接，这就是 HTTP 长链接
- 支持 pepeline 网络传输，只要第一个请求发出了，不必等其回来，就可以发第二个请求出去，减少整体响应时间
- 支持 Chunked Response，在 Response 时候，不必说明 `Content-Lenght`。这样客户端不会断开连接，知道收到服务端的 EOF 标识。这种技术叫 服务端 Push 模型
- 增加了 cache-control 机制
- 协议头增加了 Language、Encoding、Type等等头，让客户端可以跟服务端进行更多的协商
- 加入了重要的头—— HOST
- 加入了 `OPTIONS` 方法，其主要用于 CORS – Cross Origin Resource Sharing 应用

缺陷：

- 还是有性能问题，虽然 HTTP/1.1 可以重用 TCP 链接，但是请求还是一个一个串行发的，需要保证其顺序
- HTTP/1.1 传输数据时，是以文本的方式，借助消耗 CPU 的 zip 压缩的方式减少网络带宽，但是消耗了前端和后端的 CPU 资源

## HTTP/2

- HTTP/2 是一个二进制协议，增加了数据传输的效率
- HTTP/2 是可以在一个 TCP 链接中并发请求多个 HTTP 请求，移除了 HTTP/1.1 中的串行请求
- HTTP/2 压缩请求头，同时发送出个请求，请求头是一样或相似的，那么协议会消除重复的部分，这就是所谓的 HPACK 算法
- HTTP/2 允许服务端在客户端放 cache，又叫服务端push，也就是说，你没有请求的东西，我服务端可以先送给你放在你的本地缓存中。比如，你请求X，我服务端知道X依赖于Y，虽然你没有的请求Y，但我把把Y跟着X的请求一起返回客户端

缺陷：若干个HTTP的请求在复用一个TCP的连接，底层的TCP协议是不知道上层有多少个HTTP的请求的，所以，一旦发生丢包，造成的问题就是所有的HTTP请求都必需等待这个丢了的包被重传回来，哪怕丢的那个包不是我这个HTTP请求的。因为TCP底层是没有这个知识了。这个问题又叫 Head-of-Line Blocking 问题，也是一个比较经典的流量调度的问题

## HTTP/3

HTTP/3 破天荒地把 HTTP 底层的 TCP 协议改成了 UDP ！

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

## 参考

1. [](https://coolshell.cn/articles/19840.html)
