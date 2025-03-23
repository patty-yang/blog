# 🌟 HTML5 新增内容

## 🏗️ 语义化标签

- `<header>` 📑: 定义文档或节的页眉
- `<nav>` 🧭: 定义导航链接
- `<section>` 📄: 定义文档中的节
- `<article>` 📰: 定义独立的自包含内容
- `<aside>` 📎: 定义侧边内容
- `<footer>` 📋: 定义文档或节的页脚
- `<main>` 📌: 定义文档的主要内容

## 🎥 多媒体标签

- `<audio>` 🔊: 音频播放
- `<video>` 📹: 视频播放
- `<source>` 📂: 为媒体元素定义媒体资源
- `<track>` 📝: 为媒体元素定义文本轨道

## 🎨 图形和图表

- `<canvas>` 🖼️: 画布,用于绘制图形
- `<svg>` ⭐: 可缩放矢量图形

## 📝 表单增强

- 新增输入类型 ⌨️：date、time、email、url、search 等
- 新增表单元素 📋：`<datalist>`、`<output>`
- 新增属性 🔧：placeholder、required、pattern 等

## ⚡ 渲染帧 (Frame Rendering)

在现代浏览器中，页面渲染是一个持续不断的过程。浏览器会周期性地对网页内容进行重新渲染，这个过程通常以每秒 60 次（60 FPS）的频率进行。每一次完整的渲染过程被称为一帧（Frame）。

### 🎯 帧率与性能

虽然 60 FPS 是理想的渲染速率，但实际运行中会受到诸多因素的影响：

- 💻 设备性能
- 📊 页面复杂度
- ⚙️ 系统负载
- 🌐 网络状况

这些因素会导致实际帧率产生波动，影响页面的流畅度。

### 🎬 动画实现的演进

传统上，开发者常用 `setInterval` 来实现动画效果。然而，这种方式存在明显的缺陷：

- ❌ 可能出现丢帧现象
- ❌ 无法与浏览器的渲染周期同步
- ❌ 动画效果不够流畅

为了解决这些问题，HTML5 引入了 `requestAnimationFrame` API。这个强大的工具可以：

- ✅ 确保动画与浏览器的渲染周期完美同步
- ✅ 在每一帧渲染前精确执行相关代码
- ✅ 提供更流畅、更高效的动画体验

## 🛠️ API

- 💾 localStorage/sessionStorage
- 🔌 WebSocket
- 👷 Web Workers
- 🖱️ Drag & Drop
- 📜 History API
<!-- - Geolocation -->

## 🎁 其他新特性

- 🎮 WebGL: 3D 图形
- 📡 Web Socket: 服务器推送技术
- 🤖 Web Worker: 后台 javascript
- 📍 地理位置
- 📱 设备访问接口
- 💾 离线存储
