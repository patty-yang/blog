# 🚀 ES6+ 特性指南

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
