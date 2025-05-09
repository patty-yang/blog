> referer: <https://github.com/chenqf/frontEndBlog/issues/18>

# 缓存

对之前请求过的文件进行缓存，以便于下次访问时重复使用，提高访问速度，降低服务器压力

## 常见的缓存响应头

| 响应头字段    | 值                            | 说明                    |
| ------------- | ----------------------------- | ----------------------- |
| Cache-Control | max-age=300                   | 缓存的有效时间为 300 秒 |
| Date          | Fri, 09 May 2025 05:23:09 GMT | 响应生成的时间          |
| ETag          | "680d9f3c-7494"               | 资源的唯一标识符        |
| Last-Modified | Sun, 27 Apr 2025 03:06:36 GMT | 资源最后修改时间        |

## 强缓存 (Strong Cache)

强缓存机制通过响应头的两个重要字段来控制缓存的失效规则：Expires 和 Cache-Control。

#### 1. Expires

> **HTTP 1.0 时代的产物**  
> 由于存在以下问题，现代浏览器已较少使用：
>
> - 大多数浏览器默认使用 HTTP 1.1
> - 服务器时间与客户端时间可能存在偏差，导致缓存控制不准确
>
> 因此，HTTP 1.1 引入了 Cache-Control 来替代它。

#### 2. Cache-Control

> **HTTP 1.1 的缓存控制机制**  
> 提供了多种缓存策略选项：

| 指令        | 说明                    | 使用场景                   |
| ----------- | ----------------------- | -------------------------- |
| private     | 仅允许客户端缓存        | 默认值，适用于用户个人数据 |
| public      | 允许所有中间节点缓存    | 适用于公共资源             |
| max-age=xxx | 缓存内容在 xxx 秒后失效 | 精确控制缓存时间           |
| no-cache    | 强制使用协商缓存验证    | 需要验证资源是否变化       |
| no-store    | 完全禁止缓存            | 敏感数据，实时性要求高     |

## 协商缓存 (Negotiation Cache)

协商缓存是一种服务器与客户端合作的缓存机制，需要双方进行缓存有效性的确认。

**特点：**

- 当缓存生效时返回 304 状态码
- 显著减少响应体积（仅返回 header）
- 大幅降低请求处理时间
- 服务器通过状态码告知客户端可继续使用本地缓存

> 💡 **性能提示**：协商缓存虽然需要与服务器通信，但通过只传输 header 信息，仍然可以大幅提升访问效率。
