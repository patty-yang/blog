## call

> call() ：在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

```javascript
// 实现思路
1. 将函数设为对象的属性
2. 执行该函数，并传递参数
3. 删除该函数
```

```js
// 第一版本
Function.prototype.call2 = function (context) {
  // 1. 首先通过this获取调用call的函数
  context.fn = this
  // 2. 获取到传递的参数
  const args = [...arguments].slice(1)
  context.fn(...args)
  delete context.fn
}

const obj = {
  value: 1
}

function testFn(text) {
  console.log(this.value)
  console.log(text, 'text')
}

testFn.call2(obj, 'test')
```

```js
// 第二版
// this 参数可以不传，在不传的时候 指向window。  例如:
var value = 1
function testFn() {
  console.log(value)
}
testFn.call(null) // 1

// 针对函数，实现返回值
const obj = {
  value: 1
}
function testFn(text) {
  return {
    text,
    value: this.value
  }
}
Function.prototype.call2 = function (context, ...args) {
  // 将context 为空时，指向window
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  // 创建唯一值作为属性名
  const symbolFn = Symbol()
  context[symbolFn] = this
  const result = context[symbolFn](...args)
  delete context[symbolFn]
  return result
}
const obj = {
  value: 1
}
function testFn(text) {
  return {
    value: this.value,
    text
  }
}
console.log(testFn.call2(obj, '文本内容'))
```

## apply

> apply 实现类似于 call，指示入参是一个数组

```js
Function.prototype.apply2 = function (context, args) {
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  const symbolFn = Symbol()
  context[symbolFn] = this
  const result = context[symbolFn](...args)
  delete context[symbolFn]
  return result
}

const obj = {
  value: 1
}
function testFn(text) {
  return {
    value: this.value,
    text
  }
}
console.log(testFn.apply2(obj, '文本内容'))
```

## bind

> bind 函数会创建一个新函数，当这个新函数呗调用时， 它的第一个参数将作为它运行时的 this 提后的一序列参数将会在传递的实参前传入作为它的参数

```js
Function.prototype.myBind = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window
  }
  self = this
  return function (...args) {
    return self.apply(context, args)
  }
}
```
