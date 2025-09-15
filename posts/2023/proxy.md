---
title: Proxy
date: 2020-09-15
tags:
  - js
---

Proxy 是 ES6 中新增的一个特性，它可以用来定义对象的操作行为。通过 Proxy，可以对对象的访问进行拦截和自定义。

## 📝 基本语法

```js
const p = new Proxy(target, handler)

const obj = {
  name: '小明',
  age: 18
}

const proxy = new Proxy(obj, {
  get() {
  },
  set() {
  },
  has() {
  },
  deleteProperty() {
  },
  ownKeys() {
  },
  getOwnPropertyDescriptor() {
  },
  defineProperty() {
  }
})
```
