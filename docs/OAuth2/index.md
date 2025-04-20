# OAuth2 协议 🔐

:::tip OAuth
是一个关于授权(authorization)的开放网络标准协议,就是一种授权机制。核心目的是在保护用户数据的同时，实现安全的第三方授权访问。

是在客户端和资源所有者之间建立了一个授权层，通过令牌机制实现两个角色之间的安全交互。当资源所有者授权后，客户端可以使用获得的令牌安全地访问资源。

⚠️ OAuth2.0 是 OAuth 协议的一个版本，但 <font color=red>与 1.0 版本不兼容</font>
:::

> 🌟 典型授权场景

1. 📱 移动应用请求使用微信账号登录
2. 🔑 应用向微信申请必要的访问权限
3. 💬 微信向用户展示授权确认弹窗
4. ✨ 用户同意后，系统生成授权码(code)和访问令牌(access_token)
5. 🎯 应用使用 access_token 获取授权的用户信息

:::tip 当数据所有者同意第三方应用访问系统时，系统会生成一个临时的令牌(token)。用来代替密码，给第三方使用
:::

## 获取令牌的方式
- 授权码(authorization-code)
- 密码式(password)
- 客户端凭证(client credentials)
不管哪种授权方式,第三方应用申请令牌前,<font color=red>必须先到系统备案</font> ,拿到身份识别码: <font color=red>clientID clientSecret(客户端ID、密钥)</font>
