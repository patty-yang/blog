---
title: Intersection Observer API
date: 2020-09-15
tags:
  - js
---

## 💡 概述

Intersection Observer API 提供了一种异步观察目标元素与祖先元素或视口相交状态的方法，常用于实现懒加载、无限滚动等功能。

## 🛠️ 基本用法

### 创建观察者

```javascript
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('元素进入视口')
      } else {
        console.log('元素离开视口')
      }
    })
  },
  {
    root: null, // 视口
    rootMargin: '0px', // 视口边距
    threshold: 0.5 // 交叉比例阈值
  }
)

// 开始观察
observer.observe(targetElement)

// 停止观察
observer.unobserve(targetElement)

// 停止所有观察
observer.disconnect()
```

## 🎯 实际应用

### 1. 图片懒加载

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <style>
    body {
      margin: 0;
    }

    .container {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 200px);
      grid-gap: 10px;
    }
  </style>
  <body>
    <div class="container"></div>
    <script>
      const container = document.querySelector('.container')

      for (let i = 0; i < 100; i++) {
        const div = document.createElement('div')
        div.classList.add('item')

        const img = document.createElement('img')
        img.src = 'https://picsum.photos/id/237/200/300'
        img.dataset.src = `https://picsum.photos/200/300?a=${i}`
        div.appendChild(img)
        container.appendChild(div)
      }

      const ob = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const img = entry.target
              img.src = img.dataset.src
              ob.unobserve(img)
            } else {
            }
          }
        },
        {
          root: null,
          threshold: 0.5
        }
      )
      const imgs = document.querySelectorAll('img[data-src]')
      imgs.forEach((img) => {
        ob.observe(img)
      })
    </script>
  </body>
</html>
```
