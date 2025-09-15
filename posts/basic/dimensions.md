---
title: js 尺寸获取
date: 2022-09-15
tags:
  - js
---

## 🖥️ 屏幕尺寸

- 获取屏幕高度: `window.screen.height`
- 获取屏幕宽度: `window.screen.width`

## 🪟 浏览器窗口尺寸

- 获取浏览器窗口高度: `window.outerHeight`
- 获取浏览器窗口宽度: `window.outerWidth`

## 📱 浏览器内部窗口尺寸（包含滚动条）

- 获取内部窗口高度: `window.innerHeight`
- 获取内部窗口宽度: `window.innerWidth`

## 👁️ 浏览器视口尺寸

- 获取视口高度: `document.documentElement.clientHeight`
- 获取视口宽度: `document.documentElement.clientWidth`

## 📐 元素尺寸说明

### 📦 clientWidth

- 包含: padding
- 不包含: border, margin, 滚动条

### 📏 offsetWidth

- 包含: border, 滚动条

### 📜 scrollWidth

- 包含: border, 滚动条
