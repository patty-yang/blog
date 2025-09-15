---
title: fetch API
date: 2020-09-15
tags:
  - js
---

# 🌐 Fetch API

> 作为 HTML5 新增的现代化网络请求接口

## 📜 历史问题

在 XMLHttpRequest 时代存在以下问题:

- 🔸 功能高度集中在单一对象上，导致代码混乱且难以维护
- 🔸 事件处理器模型已显陈旧，不符合现代开发理念
- 🔸 传统事件驱动模式与 ES6 Promise 范式不兼容

## ⭐ 核心特性

### 1. 🔄 优化而非革命

- ✨ 对传统 AJAX 的全面改进与提升
- 🎯 保留原有优点，解决历史痛点

### 2. 📦 模块化设计

- 🔍 精细化的功能划分
- 🎨 独立处理请求头、请求体、响应等
- 💡 更适合处理复杂的网络请求场景

### 3. 🚀 现代化集成

- ⚡ 完美支持 Promise API
- 📝 使异步代码更清晰优雅
- 🛡️ 提供更好的错误处理机制

## 🌟 基本使用配置

### 1. 🔒 请求模式 (mode)

- 🌐 `cors` - 默认值，自动添加 origin 和 referer 请求头
- 🚫 `no-cors` - 不添加 origin 和 referer 请求头
- 🏠 `same-origin` - 仅同源请求时添加 origin 和 referer

### 2. 🔑 请求凭证 (credentials)

- ❌ `omit` - 默认值，不发送凭证
- 🏠 `same-origin` - 仅同源请求发送凭证
- ✅ `include` - 始终发送凭证

### 3. 📦 缓存模式 (cache)

- 🔄 `default` - 默认值，遵循浏览器缓存机制
- 🚫 `no-store` - 禁用缓存
- 🔄 `reload` - 强制使用缓存
- 🔍 `no-cache` - 使用缓存但需服务器验证
- 💾 `force-cache` - 强制使用缓存
- 📌 `only-if-cached` - 仅使用缓存

## 📡 response 对象

### 1. 状态信息

- ✅ `ok: boolean` - 状态码在 200-299 之间返回 true
- 🔢 `status: number` - 响应状态码
- 📝 `statusText: string` - 状态描述文本

### 2. 消息信息

- 📋 `headers: Headers` - 响应头部信息
- 🔗 `url: string` - 响应 URL
- 📊 `type: ResponseType` - 响应类型

### 3. 数据处理

- 📦 `body: ReadableStream` - 响应主体内容
- 🔍 `bodyUsed: boolean` - 主体内容读取状态
- 🔄 `clone(): Response` - 克隆响应对象

### 4. 数据转换方法

- 📊 `arrayBuffer(): Promise` - 转换为 ArrayBuffer
- 📁 `blob(): Promise` - 转换为 Blob
- 📝 `formData(): Promise` - 转换为 FormData
- 📋 `json(): Promise` - 转换为 JSON
  [//]: # (一般来说，服务器会检查请求头中有没有 origin )

## 📡 Request 对象

### 🎯 基本概念

- 🔄 fetch API 在内部会自动创建并发送 Request 对象
- 🆕 每次请求都需要一个全新的 Request 实例
- ⚠️ 重用 Request 对象可能导致流式传输问题

## 🔧 Headers 对象方法集

#### 基础操作方法

- 📝 `append(name, value)` - 追加新的请求头
- 🗑️ `delete(name)` - 移除指定请求头
- 🔍 `get(name)` - 获取指定请求头的值
- ✨ `has(name)` - 检查请求头是否存在
- ⚡ `set(name, value)` - 设置或更新请求头

#### 迭代器相关方法

- 🔄 `entries()` - 获取所有请求头的键值对迭代器
- 🔑 `keys()` - 获取所有请求头名称的迭代器
- 📊 `values()` - 获取所有请求头值的迭代器
- 🔁 `forEach(callback)` - 遍历所有请求头
- 🎯 `[Symbol.iterator]()` - 获取默认迭代器

#### 其他方法

- 🏷️ `[Symbol.toStringTag]` - 获取对象的字符串标识
- 📏 `length` - 获取请求头总数
- 📦 `raw()` - 获取原始请求头数据
