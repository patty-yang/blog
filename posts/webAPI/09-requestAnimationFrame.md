---
title: requestAnimationFrame
date: 2021-09-15
tags:
  - js
---

## 💡 概述

requestAnimationFrame (rAF) 是浏览器提供的用于优化动画效果的 API，它会在浏览器下一次重绘之前调用指定的回调函数。这种方式可以确保动画流畅，并且能够自动优化性能。

## 🛠️ 基本用法

### 动画

```javascript
function animate() {
    element.style.transform = `translateX(${position}px)`
    position += 2

    // 继续下一帧
    if (animationId > 2000) {
        cancelAnimationFrame(animationId)
    }
    requestAnimationFrame(animate)
}

// 开始动画
const animationId = requestAnimationFrame(animate)
```

## 对比 setInterval

![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/requestAnimationFrame.gif)

可以看到 setInterval 有些抖动,相较于 requestAnimationFrame 有更平缓的过度
