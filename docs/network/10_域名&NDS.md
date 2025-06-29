域名 🫱（如 www.google.com）作用是将难以记忆的 IP 地址转换为更友好的文本形式，便于记忆

## 🌳 域名的层次结构

| 层级           | 说明               | 示例                      |
| -------------- | ------------------ | ------------------------- |
| 顶级域名 (TLD) | 最高层级的域名分类 | .com, .org, .cn           |
| 二级域名       | 用户注册的主要标识 | google.com 中的 google    |
| 三级域名       | 用于细分服务或功能 | mail.google.com 中的 mail |

> 💡 每一层级都通过点号(.)分隔，共同构成完整的域名标识符

## 🌐 DNS (域名系统)

虽然域名便于记忆和使用，但在网络通信中并不直接参与数据传输。网络设备之间的通信必须依赖于 IP 地址.
DNS 就是将域名转为 IP 地址，这个转换过程被称为 "域名解析"。

### 🔍 DNS 解析流程

当你在浏览器中输入一个网址时，DNS 解析会按照以下步骤进行：

1. 📱 浏览器首先查看自己的 DNS 缓存库
2. 📝 如果缓存中没有，会查看本地的 hosts 文件
3. 🚀 向本地 DNS 服务器发起递归查询请求
4. 🌳 本地 DNS 服务器开始进行迭代查询：
   - 👑 从根域名服务器开始查询
   - 🏢 继续查询顶级域名服务器
   - 🎯 最后查询权威域名服务器
5. ✨ 找到对应的 IP 地址后，返回给客户端

> 💡 整个过程就像是在一个巨大的电话簿中查找号码，层层递进，最终找到目标地址。
