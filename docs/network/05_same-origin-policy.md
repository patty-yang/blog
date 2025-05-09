## 同源策略 (Same-Origin Policy)

同源策略是浏览器的一个安全机制，若页面中的源和页面运行过程中加载的源不一致时，出于安全考虑，浏览器会对跨域的资源访问进行一些限制

### 什么是同源？

当两个 URL 的协议、域名和端口都相同时，我们就称这两个 URL 同源。以下是一些示例：

| URL 1                      | URL 2                      | 是否同源 | 原因                   |
| -------------------------- | -------------------------- | -------- | ---------------------- |
| `http://example.com/page1` | `http://example.com/page2` | ✅ 是    | 协议、域名、端口都相同 |
| `http://example.com`       | `https://example.com`      | ❌ 否    | 协议不同               |
| `http://example.com`       | `http://sub.example.com`   | ❌ 否    | 域名不同               |
| `http://example.com`       | `http://example.com:8080`  | ❌ 否    | 端口不同               |

### 同源策略的限制范围

在浏览器环境下，同源策略主要限制以下几个方面：

1. Cookie、LocalStorage 和 IndexDB 的访问
2. DOM 元素的访问
3. AJAX 请求的发送

这些限制确保了网页的安全性，防止恶意网站通过脚本访问其他网站的敏感数据。

### 跨域解决方案

1️⃣ **CORS (Cross-Origin Resource Sharing)**

- 通过设置 HTTP 响应头来实现
- 服务端设置 `Access-Control-Allow-Origin` 响应头
- 支持各种 HTTP 请求方法 (GET、POST、PUT)

2️⃣ **代理服务器转发**

- 通过同源的服务器转发请求
- 前端请求发送到代理服务器
- 代理服务器转发到目标服务器

3️⃣ **JSONP**

- 利用 `<script>`标签不受同源策略的特点
- 但只支持 GET 请求
- 需要服务器配合返回特定格式的数据
