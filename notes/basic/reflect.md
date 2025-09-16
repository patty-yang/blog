---
title: Reflect
date: 2022-09-15
tags:
  - js
---


# 🔍 Reflect

📚 参考文档: [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

## ⭐️ 定义

- Reflect 是内置的 JS 对象，提供了一系列的方法，通过调用这些方法，访问一些 JS 底层功能

## 🎯 功能概述

- 📝 属性的赋值、取值
- 🔄 调用普通函数、构造函数
- 🔍 判断属性是否在对象中
- ✨ 更多功能...

## 💡 为什么使用 Reflect

有一种理念，在 ES5 就被提出：减少魔法、让代码更纯粹 ✨ ，这种理念很大程度上是受到了函数式编程的影响 🎯

它认为，对属性内存的控制、原型链的修改、函数的调用等，这些都属于底层实现，属于一种魔法，因此需要将它们提取出来，形成一个正常的 API，并高度聚合在一个对象上，这个对象就是 Reflect。

## 🛠 核心 API

- 📥 Reflect.set(target, key, value)
- 📤 Reflect.get(target, key)
- 🔍 Reflect.has(target, key)
- 🗑 Reflect.deleteProperty(target, key)
- ⚡️ Reflect.apply(fn, thisArg, args)
