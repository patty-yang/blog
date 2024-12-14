## es6 新特性

- let、const
- promise
- 箭头函数
- class
- 模版字符串
- generator
- async/await
- Reflect + Proxy

## var

> 1. 变量提示(发生在作用域中)
> 2. 重复生命
> 3. 全局变量

```js
//  程序运行时，首先会有一个 Global 上下文
const globalExecuteContext = {
  a: 1,
  testExecuteContext: {
    b: undefined
  }
}

var a = 1
function test() {
  console.log(b)
  var b = 2
}
```

## let/const

> 如何解决: 词法环境（块级作用域）

> 解决:

> var 变量提示的问题

> 块级作用域 暂时性死区 (循环中使用 var，全剧作用域重复修改的问题)

> 重复声明、常量的问题

<!-- 变量作用域，执行上下文，暂时性死去 -->
<!-- 变量提示，变量污染，常量 -->

## class

- 出现之前都用原型继承

  ```js
  function Person(name) {
   this.name = name

   say() {}
  }
  // prototype 和 __proto__ 的关系
  // 指向问题
  Person.prototype.hello = function () {}
  const person = new Person('zfpx')
  person.say()
  ```

## 构造函数

```js
function Person(name) {
  this.name = name
}

// 生成实例
const p = new Person('zhangsan')

// 通过构造函数来生成实例
// 但构造函数中的this赋值的属性或方法是每个实例的 实例属性和方法 无法共享个公共属性
// 所以设计出原型对象 来存储构造函数的公共属性和方法
```

## 构造函数创建一个实例的过程

```js
// 1. 创建一个新对象
// 2. 将构造函数的作用域赋值给新对象（这样 this 就指向了新对象）
// 3. 执行构造函数中的代码（为新对象添加实例属性和实例方法）
// 4. 返回新对象
```

## 原型对象

```js
// js 在每个函数创建的时候，都会生成一个属性 prototype 这个属性指向一个对象，这个对象就是此函数的原型对象。
// 该原型对象中有个属性为 constructor，指向该函数 这样原型对象和该函数之间就产生了联系
```

## 原型链

```js
// 每个通过构造函数创建出来的实例对象，其本身有个属性 __proto__, 这个属性会指向该实例对象的构造函数的原型对象
// 当访问一个对象的某个属性的时候，先会在这个对象本身属性上进行查找，如果没有找到，则会通过它的__proto__属性去查找，找到它的构造函数的原型对象，如果还没有找到就是在其构造函数的prototype的__proto__中查找，这样一层一层向上查找就会形成一个链式结构，成为原型链
```

## 模版字符串

- tagged templates

  ```js
  const color = 'red'
  styled`
    background: ${color};
    color: "red";
    `

  const styled = (styles, args) => {
    let result = ''
    for (const style of args) {
      result += style(args.unshift() || '')
      console.log(result)
    }
    return result
  }
  ```

## 箭头函数

- 函数的 this 对象，是在定义时所在的对象，而不是使用时所在的对象，且无法更改 this 指向，call、apply、bind
- 不能被 new 也就是当作构造函数
- 不能使用 arguments

## 可选链运算符 `?.`）

`?.` 操作符，可以嵌套获取对象的属性值。
若获取的值可能是 `undefined` 或 `null` 时，不会引起错误
与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`

[可选链运算符 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

## 解构赋值

```js
const [a, b, c] = ['value1', 'value2', 'value3']

const obj = {
  name: 'name',
  age: 'age'
}
const { name, age = 10 } = obj
const { name: myName } = obj
```

## Proxy Reflect

[阮一峰](https://www.bookstack.cn/read/es6-3rd/docs-reflect.md)

## babel

@babel/core
@babel/types

```js
const test = () => 123

// 转化后
function test() {
  return 123
}
```

```js
const bable = require('@babel/core')

const code = `const test = () => 123`

const result = bable.transform(code, {
  presets: ['@babel/preset-env']
})
console.log(result.code)
```
