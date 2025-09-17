# 🔐 JWT (JSON Web Token)

JSON Web Token (JWT) 是一种开放标准 (RFC 7519)，它定义了一种紧凑且自包含的方式，用于在各方之间以 JSON 对象的形式安全地传输信息。

## 🔨 令牌结构

JWT 令牌由三个部分组成，使用点号（.）分隔：

header 部分是 JSON 对象，通常是这个下面的样子

```json
{
  "alg": "HS256",
  "type": "JWT"
}
```

### Payload

Payload 部分是一个 JSON 对象，用于存放实际需要传递的数据。该对象需要通过 Base64URL 算法转换成字符串。

JWT 规范定义了以下 7 个标准字段（注册声明）：

| 字段  | 全称            | 描述           |
| ----- | --------------- | -------------- |
| `iss` | Issuer          | 签发人/发行者  |
| `exp` | Expiration Time | 令牌过期时间   |
| `sub` | Subject         | 主题           |
| `aud` | Audience        | 受众           |
| `nbf` | Not Before      | 生效时间       |
| `iat` | Issued At       | 签发时间       |
| `jti` | JWT ID          | 令牌唯一标识符 |

> 💡 **提示：** 除了标准字段外，你还可以添加自定义的私有字段来传递额外信息。

⚠️ 由于 JWT 默认不加密，payload 中的信息对任何人都是可读的，因此不要在其中存放敏感信息。

### Signature (签名)

Signature 部分是对前两部分（Header 和 Payload）的数字签名，用于验证消息的完整性，防止数据被篡改。
