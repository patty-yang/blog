---
title: Promise 规范
date: 2020-09-15
tags:
- js
---

## 📝 概述

Promise 是一个用于处理异步操作的标准规范。它的 API 实现基于 Promise A+ 规范，为开发者提供了一种优雅的方式来处理异步编程。

通过 Promise，我们可以:

- ⛓️ 有效避免回调地狱
- 📖 使异步代码更加清晰易读
- 🎯 实现异步操作的标准化处理

## 📘 Promise 基础

<!-- ### ⭐ Promise A+ 核心规范 -->

#### 1. 🎁 异步任务的对象表示

在 JavaScript 中，每个异步场景都可以被抽象为一个异步任务，并通过 Promise 对象来表示。Promise 对象是对异步操作的封装，提供了统一的接口来处理异步结果。

#### 2. 🔄 Promise 的状态

每个 Promise 对象都具有以下特征：

**两个阶段**

- ✅ 完成
- ⏳ 挂起

**三个状态**

- 🔄 `pending`: 初始状态，表示进行中
- ✅ `fulfilled`: 操作成功完成
- ❌ `rejected`: 操作失败

#### 3. 🔄 状态转换规则

Promise 对象的状态转换遵循以下规则：

- 🔒 状态转换只能是单向的：从 `pending` 到 `fulfilled` 或 `rejected`
- 🚫 一旦状态发生改变，就不能再次变化
- ⚡ 状态转换时机：
  - ✅ `resolve`: 从 挂起 转换为 完成
  - ❌ `reject`: 从 挂起 转换为 失败

当 Promise 完成时，会携带相关的结果数据；当 Promise 失败时，会携带失败的原因信息。

## ⚡ then 方法的特性

1. 📦 **返回值特性**
   - then 方法必定返回一个全新的 Promise 对象
2. 🔄 **状态传递规则**

   - 若无后续处理，新 Promise 继承前一个 Promise 的状态和数据
   - 如果后续处理执行了，则根据后续处理的情况，数据为后续处理的返回值
     - 后续处理无错，那么这个任务完成，数据为后续处理的返回值
     - 后续处理有错，那么这个任务失败，数据为后续处理的错误信息
     - 后续执行后返回的是一个 Promise，那么这个任务的状态和数据由后续任务决定

## 🛠️ Promise 的静态方法

Promise 类提供了几个实用的静态方法，用于处理不同的异步场景：

### 1. Promise.resolve()

- 📦 创建一个立即完成的 Promise
- 🔄 如果传入的是 Promise，则直接返回该 Promise
- ✨ 常用于将普通值转换为 Promise

### 2. Promise.reject()

- 📦 创建一个立即失败的 Promise
- 🔄 常用于将错误信息转换为 Promise

### 3. Promise.all()

- 📦 等待所有 Promise 完成
- ✅ 当所有 Promise 都完成时，返回一个包含所有结果的数组
- ❌ 当任意一个 Promise 失败时，返回一个失败的 Promise

### 4. Promise.any()

- 📦 等待第一个成功的 Promise
- ✅ 当任意一个 Promise 成功时，返回该 Promise 的结果

### 5. Promise.race()

- 📦 等待第一个完成的 Promise
- ✅ 当任意一个 Promise 完成时，返回该 Promise 的结果

### 6. Promise.allSettled()

- 📦 等待所有 Promise 完成或失败
- ✅ 返回一个包含所有结果的数组，无论是否成功

### 7. Promise.finally()

- 📦 无论 Promise 是成功还是失败，都会执行指定的回调函数

## 🌟 async/await 语法糖

### 📝 背景介绍

Promise 的出现为异步编程带来了革命性的变化，让异步任务有了统一且优雅的处理方式。基于这个基础，ES7 further 推出了 `async/await` 语法糖，让异步编程更加直观和易于理解。

### 🎯 核心特性

#### async 关键字

- 🔄 用于声明异步函数
- 📦 被修饰的函数总是返回 Promise
- ✨ 让异步代码看起来像同步代码

#### await 关键字

- ⏳ 暂停异步函数的执行
- 🎁 等待 Promise 完成并返回结果
- 🔒 只能在 async 函数内部使用
- 🚀 使异步操作的流程控制更直观

### 💡 使用优势

- 📖 代码结构更清晰
- 🎯 错误处理更直观
- ⚡ 调试体验更友好
- 🔄 避免回调地狱
