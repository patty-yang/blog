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
