# 🔄 生成器(Generator)

## 📝 概述

生成器是一个通过构造函数 Generator 创建的对象，生成器既是一个迭代器，同时又是一个可迭代对象。
也就是包含`next`和`Symbol.iterator`方法

## ⚙️ 创建方式

创建器的创建必须使用 Generator Function 语法，即在函数名前面加上一个 `*` 符号：

### 📝 使用示例

```js
function* generator() {
  yield 1
  yield 2
  yield 3
}
```

### 🔄 执行机制

生成器的内部是为了给生成器的每次迭代提供数据。当我们调用生成器的 `next()` 方法时，生成器会执行到下一个 `yield` 语句，并返回一个包含 `value` 和 `done` 属性的对象。

```js
const gen = generator()

gen.next() // { value:1, done: false}
gen.next() // { value:2, done: false}
gen.next() // { value:3, done: false}
gen.next() // { value:undefined, done: true}
```

## 🚨 重要注意事项

### 1. 📦 返回值处理

- ✨ 生成器函数支持设置返回值
- 🎯 返回值会在迭代完成时（`done: true`）出现在 `value` 属性中
- 📝 示例：
  ```js
  function* gen() {
    yield 1
    return 'done'
  }
  ```

### 2. 🔄 参数传递机制

- 📤 通过 `next(param)` 可向生成器传递参数
- 📥 传入的参数会成为上一个 `yield` 表达式的返回值
- ⚠️ 首次调用 `next()` 时传递的参数是没有作用的，因为尚未执行任何 `yield` 表达式

### 3. 🛠️ 核心 API

- 🔚 `return(value)`：立即终止生成器并返回指定值
- ❌ `throw(error)`：向生成器内部抛出异常
- 🔗 `yield*`：在生成器内部调用其他生成器函数时使用
- 📝 示例：

```js
function* test() {
  yield 'a'
  yield 'b'
}

const t = test()
console.log(t.return('123'))
console.log(t.throw('this is error'))

function* test2() {
  yield* test()
  yield 1
  yield 2
  yield 3
}
```

> 💡 生成器函数内部如需调用其他生成器，记得使用 `yield*` 语法！
