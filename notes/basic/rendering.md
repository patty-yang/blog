---
title: 浏览器渲染机制
date: 2022-09-15
tags:
  - js
---

## 🎨 渲染过程概述

浏览器将 HTML、CSS 和 JavaScript 转换为用户可见的页面，这个过程被称为渲染。渲染引擎会逐个像素地绘制页面内容，形成最终的可视化界面。

## 🔄 渲染流程

### 1. HTML 解析

- 浏览器从服务器获取 HTML 文档
- 自上而下解析 HTML 源代码
- 遇到外部资源（CSS/JS）时会暂停解析
    - CSS：转而解析样式表
    - JavaScript：执行脚本代码

### 2. 资源位置的最佳实践

#### CSS 放在 `<head>` 中的原因

- 确保样式表优先加载
- 防止页面闪烁（FOUC）
- 提供更好的首次渲染体验

#### JavaScript 放在 `</body>` 前的原因

- 优先展示页面内容
- 避免阻塞页面渲染
- DOM 完全加载后再执行交互逻辑

## 🌳 文档对象模型（DOM）

### DOM 树构建

- HTML 解析过程中同步构建 DOM 树
- 重要事件节点：
    1. `DOMContentLoaded`：DOM 树构建完成
    2. `load`：所有外部资源加载完毕

## 🎯 渲染树（Render Tree）

渲染树是 DOM 树和 CSSOM 树合并的结果，它包含：

- 元素的样式计算
- 样式优先级处理
- 继承关系解析
- 默认样式应用

## 📐 布局（Layout）与重排（Reflow）

### 布局过程

浏览器计算每个可见元素的：

- 精确位置
- 具体尺寸

### 触发重排的常见操作

- 读取元素几何属性（offsetWidth、clientHeight 等）
- 修改元素尺寸（width、height、padding 等）
- 改变元素位置（position、float 等）
- 改变浏览器窗口大小
- 添加/删除可见的 DOM 元素

## 🎨 重绘（Repaint）

重绘发生在元素外观改变但不影响布局时。

### 触发重绘的常见操作

- 修改背景相关属性
    - background-color
    - background-image
- 更改边框样式
    - border-radius
    - border-style
- 调整透明度
    - opacity
- 改变颜色
    - color
    - text-decoration

> 💡 **性能优化提示**：重排一定会导致重绘，但重绘不一定会导致重排。为提升性能，应尽量减少重排操作。
