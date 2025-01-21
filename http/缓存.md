## 什么是缓存

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
