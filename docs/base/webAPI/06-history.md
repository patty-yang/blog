# 🔄 Web History API

## 📝 基本概念

History API 提供了操作浏览器会话历史的接口，可以我们可以在不刷新页面的情况下修改浏览器的历史记录和 URL。

## 🛠️ 核心方法

- `history.back()`: 后退一步
- `history.forward()`: 前进一步
- `history.go(n)`: 前进或后退指定步数
- `history.pushState(state, title, url)`: 添加新的历史记录
- `history.replaceState(state, title, url)`: 替换当前历史记录
- `window.onpopstate`: 监听历史记录变化
- `window.history.length`: 获取历史记录长度
- `window.history.state`: 获取当前历史记录的状态
- `window.history.scrollRestoration`: 控制滚动行为

## ⚠️ 注意事项

存在安全限制的问题

- 跨域限制
- 协议限制（必须相同协议）
