# 🛡️ XSS (Cross-Site Scripting) 跨站脚本攻击

攻击者通过在网页中注入恶意脚本，当用户浏览这些页面时，脚本会在用户的浏览器中执行，从而达到窃取用户数据、会话劫持等攻击目的。

## 💾 存储型 XSS

1. 🦹‍♂️ 恶意用户提交了含有恶意 JavaScript 代码的内容到服务器
2. 🗄️ 服务器未经过滤就将恶意内容存储到数据库中
3. 👤 其他正常用户访问包含这些恶意内容的页面
4. ⚠️ 服务器返回包含恶意代码的页面内容
5. 💥 恶意脚本在用户浏览器中执行，可能导致：
   - 窃取用户 Cookie
   - 劫持用户会话
   - 修改页面内容
   - 记录用户键盘输入
   - 其他安全隐患

## 🔄 反射型 XSS

也称为非持久型 XSS，需要诱导用户点击特制的恶意链接：

1. 🔗 攻击者构造带有恶意代码的 URL 链接
2. 📧 通过社交媒体、邮件等方式诱导用户点击链接
3. 🌐 用户访问该 URL 时，服务器将恶意代码从 URL 中取出并返回
4. 💻 恶意代码在用户浏览器中执行

## 🛠️ 防范措施

1. 输入验证和过滤
2. 输出编码（HTML 实体编码）
3. 设置 CSP (Content Security Policy)

   > CSP 是一个额外的安全层，通过告诉浏览器哪些外部资源可以加载和执行来创建白名单机制，从而防止 XSS 攻击。

   ```http
   Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com;
   ```

   ```html
   <meta
     http-equiv="Content-Security-Policy"
     content="default-src 'self'; script-src 'self' https://apis.google.com;"
   />
   ```

4. 使用 HttpOnly Cookie
5. 使用现代前端框架的 XSS 防护机制
