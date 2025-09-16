---
title: 迭代器
date: 2022-09-15
tags:
  - js
---

## 📚 基本概念

### 🤔 什么是迭代？

迭代是一个优雅的数据处理过程，它按照预定的顺序，从数据集合中逐个获取元素的操作。

## ⚖️ 迭代 vs 遍历

两者有着本质的区别：

- **迭代**：按需获取数据，更加灵活
    - 🎯 不必遍历完整个集合
    - ⏸️ 可以按需停止
    - 📊 更适合处理大数据集合
- **遍历**：完整处理数据，更加严谨
    - ✅ 必须处理集合中的所有元素
    - 📝 通常按固定顺序进行
    - 💯 适合需要全量处理的场景

## 🎨 迭代模式

作为一种经典的设计模式，迭代器模式定义了标准的迭代规范：

- ✨ 提供获取下一个元素的能力
- 🔍 具备判断是否存在下一个元素的能力

## 💻 JavaScript 中的迭代器

在 JavaScript 中，迭代器是一个具有特定接口的对象。一个标准的迭代器需要满足以下条件：

- 🔧 必须实现 `next()` 方法
- 📦 `next()` 方法返回一个包含以下属性的对象：

## 🔄 可迭代协议

✨ ES6 规定，如果一个对象具有 `Symbol.iterator` 属性，并且属性值是一个迭代器创建函数，则该对象是可迭代的(iterable)。

### 示例代码

```js
// 可迭代对象
const obj = {
  [Symbol.iterator]() {
    return {
      next() {
        return {
          value: 1,
          done: true
        }
      }
    }
  }
}

const arr = [1, 2, 3]
const iterator = arr[Symbol.iterator]()
iterator.next()
```

## 迭代器循环 for-of

```js
const iterator = arr[Symbol.iterator]()
let result = iterator.next()
while (!result.done) {
  const item = result.value
  result = iterator.next()
}
// 相当于
for (const item of array) {

}
```