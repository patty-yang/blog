---
title: WeakSet 弱引用集合
date: 2022-09-15
tags:
   - js
---

WeakSet 是一种特殊的集合类型，具有以下特点：

- 💫 **仅支持对象类型**：只能存储对象引用，不支持原始数据类型
- 🔒 **不可遍历**：WeakSet 不是可迭代对象，无法使用 for...of 循环
- 📊 **功能受限**：不提供 size 属性和 forEach 方法
- 🗑️ **弱引用特性**：不会阻止垃圾回收机制回收已存储的对象
  - 当对象的其他引用被清除后，WeakSet 中的引用不会阻止对象被回收

### 示例代码

```js
let obj = {
  name: 'hello'
}

const set = new WeakSet()
set.add(obj)

obj = null
console.log(set)
```

## WeakMap 弱引用映射

WeakMap 是一种特殊的映射类型，具有以下特点：

- 🔑 **键必须是对象**：WeakMap 只接受对象作为键，不支持原始数据类型
- 🗑️ **弱引用特性**：键的存储不会影响垃圾回收机制
  - 当键对象的其他引用被清除后，WeakMap 中的键值对会被自动回收
  - 这使得 WeakMap 特别适合存储那些需要关联额外数据但不想影响对象生命周期的场景

### 示例代码

```js
const wm = new WeakMap()
let lis = document.querySelectorAll('li')
for (let li of lis) {
  wm.set(li, { id: li.innerHTML, name: `hello-${li.innerHTML}` })
}
console.log(wm)
lis[0].remove()
console.log(wm)
lis = null
console.log(wm)
```
