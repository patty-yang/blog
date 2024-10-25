## http1 http2 的区别

http1 报文是文本 http2 报文是二进制
按照报文大小分成了不同的帧
引入了 帧(frame)和流(stream)的概念

帧是按照报文段分割，分割成每一小块，每一小块呗成为一个帧
流是通过帧的首部来标识的
有了帧和流的引入就可以实现多路复用

可以在传输中有很多流的产生，可任意发送请求和响应 不限制数量

因为不限制数量就不会产生对头阻塞问题

serverPush 服务端推送，服务端可以向客户端主动推送一些资源

优先级

永久链接

## code

<!-- - <font color="red">10x</font> -->

- # 10x

  - `100 Continue` 收到了请求，表示目前请求正常，客户端应该继续请求，如果请求完成就忽略
  - `101 Switching Protocols` 使用`Websocket` 会有此状态码，表示从 HTTP 协议切换为 websocket 协议

    与其相关的 headers

    ```js
      Request Headers
        Connection: Upgrade
        Upgrade: websocket

      Response Headers
        Connection: Upgrade
        Upgrade: websocket
    ```

- 20xs 成功状态码

  - `200 OK`
  - `201 Created` 一般为 post 请求，表示资源创建成功
  - `204 No Content` 为数不多的没有返回值的状态码

    - put 修改某资源的状态成功 <https://httpwg.org/specs/rfc7231.html#status.204>
    - 埋点 API
    - OPTIONS/DELETE 请求

  - `206 Partial Content` 当指定 `Range`请求头时，服务端会返回部分资源

    与之对应的 headers

```js
  Request Headers
     Range: bytes=66996-146150
  Response Headers
    Content-Range: bytes 66996-146150/98238371
```

- 30x
  - `301` 永久重定向，表示资源被永久移动到某个地址,但会在过程中改变`method post => get` 于是有了 308
  - `302` 临时重定向，资源暂时移动，但会在过程中改变`method post => get` 于是有了 307
  - `307` 临时重定向，在重定向时不会改变 method
  - `308` 永久重定向，在重定向时不会改变 method
- 4xx
  - `400` 客户端错误
  - `401` 权限校验失败
  - `403` 服务端拒绝授权
  - `404` 资源未找到
  - `405` 请求方式错误
  - `413` 发送参数过大
  - `429` 限流（chatGPT、github）
- 50x
  - `500` 服务器异常
  - `502` 服务端某个服务挂了 ｜ 在升级
  - `504` 服务能连上，但一直没有响应，在超过时间限制后，会有 504（超过 nginx 的默认超时时间、大文件上传、某个接口很慢）

## 浏览输入 URL 地址会进过那些流程

1. URL 解析：浏览器会解析输入的 URL，提取出协议（如 HTTP、HTTPS）、主机名（例如www.example.com）和路径（如/page）等信息。
2. DNS 解析：浏览器将主机名发送给域名系统（DNS）服务器，以获取与主机名对应的 IP 地址。这个过程涉及到查询 DNS 缓存、本地主机文件和递归查询等步骤，最终得到主机的 IP 地址。
3. 建立 TCP 连接：使用获取到的 IP 地址，浏览器会与服务器建立 TCP 连接。这个过程涉及到 TCP 的三次握手，确保浏览器和服务器之间建立可靠的连接。
4. 发起 HTTP 请求：建立 TCP 连接后，浏览器会向服务器发送 HTTP 请求。这个请求包括请求方法（如 GET、POST）、请求头（包含一些额外的信息，如用户代理、Cookie 等）以及可能的请求体（对于 POST 请求）。
5. 服务器处理请求：服务器接收到浏览器发送的请求后，根据请求的路径和其他信息，处理请求并生成响应。
6. 接收响应：浏览器接收到服务器发送的响应，响应包括状态码（表示请求成功、失败或其他状态）、响应头（包含一些元数据，如内容类型、缓存控制等）和响应体（实际的响应数据）。
7. 渲染页面：如果响应的内容是 HTML，浏览器会解析 HTML、构建 DOM 树和 CSSDOM 树，然后将它们合并为渲染树，最终绘制到屏幕上。
8. 关闭连接：页面渲染完成后，浏览器会关闭与服务器的 TCP 连接，释放资源。

## cache

> 对之前请求过的文件进行缓存，便于下次访问时重复使用，提高访问速度，降低服务器压力

> http 缓存机制主要在 http 响应头中设定，响应头中相关字段为 ` Expires` `Cache-Control ` ` Last-Modified` `Etag `

## 浏览器是如何判定是否使用缓存

> Referer: <https://github.com/chenqf/frontEndBlog/issues/18>

## 缓存规则

<details>
  <summary><b>强缓存：</b></summary>

`Expires` 到期时间由服务端产生，可能会与客户端时间产生误差

`Cache-Control` max-age=240 在 4 分钟内再次访问该资源就会命中强缓存

```
max-age=xx：
    每次都会像服务器校验资源新鲜度
    没过期返回 304 从缓存读取资源
    过期返回 200 和新资源
no-cache：每次都返回 200 和新资源
no-store：不被缓存
```

<table>
<tr>
  <td bgcolor=#eee>
  不过 Expires 是 HTTP 1.0 的东西，现在默认浏览器均默认使用 HTTP 1.1，所以它的作用基本忽略。
  </td>
</tr>
<tr>
  <td bgcolor=#eee>
 另一个问题是，到期时间是由服务端生成的，但是客户端时间可能跟服务端时间有误差，这就会导致缓存命中的误差。
  </td>
</tr>
<tr>
  <td bgcolor=#eee>
 所以 HTTP 1.1 的版本，使用 Cache-Control 替代。
  </td>
</tr>
</table>

</details>

<details>
  <summary><b>协商缓存：</b></summary>

`Last-Modifed/If-Modified-Since` 和 `Etag/If-None-Match` 是分别成对出现的，呈一一对应关系

<!--
`Last-Modified/If-Modified-Since` - `Last-Modified` ：服务器在响应请求时，告诉浏览器资源的最后修改时间。 - `If-Modified-Since` - 再次请求服务器时，通过此字段通知服务器上次请求时，服务器返回资源的最后修改时间 - 服务器收到请求后发现有头 `If-Modified-Since` 则与被请求资源的最后修改时间进行比对。 - 若资源的最后修改时间大于 `If-Modified-Since`，说明资源又被改动过，则响应整片资源内容，返回状态码 200； - 若资源的最后修改时间小于或等于 `If-Modified-Since`，说明资源无新修改，则响应 HTTP 304，告知浏览器继续使用所保存的缓存

- `Etag / If-None-Match` - 优先级高于 Last-Modified / If-Modified-Since - -->
</details>

<Gitalk />