# 🚀 ES6+ 特性指南

> 💡 ES6（ECMAScript 2015） 解决了 js 无法开发大型应用的语言层面的问题

## 📌 let 和 const 声明

> 💡 最佳实践：优先使用 const 定义变量，只在需要修改值时使用 let，以确保代码的可维护性。

### ⭐️ 核心特点

| 特性          | 说明                                     |
| ------------- | ---------------------------------------- |
| 🌍 全局作用域 | 全局定义的常量不再作为属性添加到全局对象 |
| ⚠️ 暂时性死区 | 在变量声明前使用会触发 ReferenceError    |
| 🚫 重复声明   | 同一作用域内不可重复声明同名变量         |
| ✨ 初始化要求 | const 声明的常量必须同时进行初始化       |
| 📦 块级作用域 | 变量仅在声明的代码块内有效               |

### 📝 使用示例

```javascript
// 推荐写法
const MAX_COUNT = 100
const config = {
  theme: 'dark',
  language: 'zh'
}

// 需要修改时使用 let
let currentCount = 0
```

## 📊 幂运算符

> 💡 ES6+ 引入了幂运算符 `**`，提供了一种更简洁的计算方式。

### 基本用法

```js
2 ** 3 // 8
2 ** 4 // 16
2 ^ 3 // 1
```

## 🔍 字符串新增 API

### 🛠 实用方法

| 方法名       | 描述                       | 示例                               |
| ------------ | -------------------------- | ---------------------------------- |
| ✨ includes  | 判断字符串是否包含指定内容 | `'Hello'.includes('el') // true`   |
| 🧹 trim      | 去除字符串两端的空白字符   | `'  abc  '.trim() // 'abc'`        |
| ⬅️ trimStart | 去除字符串开头的空白字符   | `'  abc  '.trimStart() // 'abc  '` |
| ➡️ trimEnd   | 去除字符串末尾的空白字符   | `'  abc  '.trimEnd() // '  abc'`   |

## 🎨 模板字符串

> 💡 模板字符串（Template Literals）是 ES6 引入的重要特性，使用反引号（`）包裹，支持多行文本和变量插值。

### ✨ 核心特性

- 支持多行字符串
- 支持变量插值 `${expression}`
- 支持标签模板（Tagged Templates）
- 可以包含表达式和函数调用

### 📝 基础示例

```javascript
// 1. 基本使用
const name = 'ES6'
const greeting = `Hello, ${name}!` // 变量插值

// 2. 多行字符串
const multiLine = `
  第一行
  第二行
  第三行
`

// 自定义 CSS-in-JS 风格的标签模板函数
const styled = (strings, ...values) => {
  let result = ''

  // 交替合并字符串片段和插值
  strings.forEach((string, i) => {
    result += string
    if (i < values.length) {
      result += values[i]
    }
  })

  return result
}

// 使用示例
const color = 'red'
const styles = styled`
  background: ${color};    
  color: "red";
`

console.log(styles)
//   background: red;
//   color: "red";
```

## 🔄 数组方法与遍历

### 🔍 数组检测

| 方法             | 描述           | 示例                        |
| ---------------- | -------------- | --------------------------- |
| ✨ Array.isArray | 判断是否为数组 | `Array.isArray([]) // true` |

### 🛠 数组转换与处理

| 方法 📝     | 描述                           | 返回值           |
| ----------- | ------------------------------ | ---------------- |
| ➰ for...of | 遍历数组和类数组对象的值       | 无返回值         |
| 🔄 forEach  | 执行回掉函数                   | 无返回值         |
| 🗺 map       | 映射数组元素                   | 新数组           |
| 🔍 filter   | 过滤数组元素                   | 符合条件的新数组 |
| 🎯 find     | 查找满足条件的第一个元素       | 元素或 undefined |
| ✅ some     | 检查是否至少有一个元素满足条件 | 布尔值           |
| ☑️ every    | 检查是否所有元素都满足条件     | 布尔值           |
| 🔄 reduce   | 将数组归约为单个值             | 累积结果         |

## 🎯 对象扩展特性

### 📦 基础特性

| 特性          | 描述           | 示例                      |
| ------------- | -------------- | ------------------------- |
| 🔄 扩展运算符 | 展开对象属性   | `const newObj = {...obj}` |
| 📝 解构赋值   | 从对象中提取值 | `const {name, age} = obj` |
| 🔒 属性描述符 | 定义属性特性   | 见下方示例                |

### ⚙️ 属性描述符示例

```js
const obj = {
  name: 'es6',
  age: 20
}

Object.defineProperty(obj, 'name', {
  value: 'es6',
  writable: false, // 是否可以被重新定义
  enumerable: true, // 是否可以被遍历，会影响到 for in
  configurable: true // 是否可以被更改
})
```

## 🎯 函数特性与扩展

### ⚡️ 箭头函数

> 💡 箭头函数是 ES6 引入的一种更简洁的函数写法，具有独特的特性。

#### 核心特点

| 特性         | 说明                                     |
| ------------ | ---------------------------------------- |
| 🚫 构造器    | 不能作为构造函数使用（不能被 new）       |
| 📌 this 绑定 | 没有自己的 this，继承定义时上下文的 this |
| ❌ arguments | 不绑定 arguments 对象                    |
| 🔒 原型      | 没有 prototype 属性                      |

### 🎨 函数新特性

| 特性        | 描述                     | 示例                            |
| ----------- | ------------------------ | ------------------------------- |
| 📦 剩余参数 | 收集剩余参数为数组       | `function sum(...args) {}`      |
| 🏗 类语法    | 使用 static 定义静态成员 | `static method() {}`            |
| 🔄 继承机制 | 通过 extends 实现类继承  | `class Child extends Parent {}` |

### 🛠 函数方法

| 方法     | 作用                   | 特点             |
| -------- | ---------------------- | ---------------- |
| 📞 call  | 指定 this 调用函数     | 参数列表展开传入 |
| 🎯 apply | 指定 this 调用函数     | 参数以数组传入   |
| 🔒 bind  | 创建绑定 this 的新函数 | 返回新函数实例   |
