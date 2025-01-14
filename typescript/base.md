# 常见类型

## 字符串

```ts
const str: string = "123"
```

## 数字

```ts
const num: number = 123
```

## 布尔

```ts
const bool: boolean = true
```

## 数组

```ts
const arr: number[] = [1, 2, 3]
const arr2: Array<number> = [1, 2, 3]
```

## 元组

```ts
const tuple: [number, string] = [1, "2"]
```

## []

```ts
const buttonTypes = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning"
] as const
type ButtonType = (typeof buttonTypes)[number] // 'primary' | 'secondary' | 'success' | 'error' | 'warning'

const arr: string[] = ["1", "2", "3"]
type ArrayValueType = (typeof arr)[number] // string
```

## 联合类型 (|)

```ts
type A = {
  a: string
}

type B = {
  b: number
}

type C = A | B
const value: C = { a: "123" }
```

## 交叉类型 (&)

```ts
type A = {
  a: string
}

type B = {
  b: number
}

type C = A & B
const value: C = { a: "123", b: 123 }
```

```ts
// 不能直接使用字面量和基础类型，得到的是 never
type D = "123" & 123 // never
type E = number & string // never.
```

```ts
type F = string | number | boolean
type G = F & string // string
```

## typeof

类型查询

```ts
let str = "hello"
const str2 = "hello"
const obj = {
  a: 1,
  b: 2
}

type Str = typeof str // string
type Str2 = typeof str2 // hello
type Test = typeof obj // { a: number; b: number }
```

## never

没有一点含义 会被无视掉 表示从来不会出现的值

```ts

```

## keyof

## instanceof

```ts
class A {
  eat() {
    console.log("a eat")
  }
}

class B extends A {
  run() {
    console.log("run")
  }
  eat() {
    console.log("b eat")
  }
}

class C extends A {
  test() {
    console.log("test")
  }
}

function fn(v: A) {
  if (v instanceof B) {
    v.run()
  } else if (v instanceof C) {
    v.test()
  }
  v.eat()
}
```

## 可选类型 (?)

可选参数可以不需要传递，但是可选参数必须得放在最后

```ts
function fn2(a: number, b?: number): void {
  console.log("🚀 ~ fn2 ~ a: number, b:", a, b)
}

fn2(1)
```

默认参数

```ts
function fn3(a: number, b = 10): number {
  return a + b
}

fn3(1)
```

剩余参数

```ts
function fn4(a: number, ...rest: number[]): void {
  console.log("🚀 ~ fn4 ~ a: number, rest:", a, rest)
}

fn4(1, 2, 3, 4, 5, 6)

function fn5() {} // 默认为 void
```

## 枚举 (enum)

既是类型也是值，可以参加逻辑表达

```ts
// 默认从 0 开始, 0 1 2
enum Color {
  Red,
  Green,
  Blue
}

// 编译后的枚举
var Color
;(function (Color) {
  Color[(Color["Red"] = 0)] = "Red"
  Color[(Color["Green"] = 1)] = "Green"
  Color[(Color["Blue"] = 2)] = "Blue"
})(Color || (Color = {}))
const value = Color.Blue
console.log(value) // 2
const key = Color[1]
console.log(key) // green

enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}
// 编译后的
var Color
;(function (Color) {
  Color["Red"] = "red"
  Color["Green"] = "green"
  Color["Blue"] = "blue"
})(Color || (Color = {}))
const value = Color.Blue
console.log(value)
const key = Color["Red"]
console.log(key)
```

### 枚举的一些问题

- 会编译成一个 IIFE 函数，所以可能不会被 tree shaking 优化掉，可能对一些第三方库不太友好

```ts
console.log(Color[99]) // 这样还不会报错

const test: Color = 1123 // 这样会报错 Type '1123' is not assignable to type 'Color'.(2322)
//  ->
// 但是
const n: number = 123123
const test2: Color = n // 这样不会报错
```

## 泛型

```ts
function fn6<T>(arg: T): T {
  return arg
}

const res = fn6<number>(123)

function fn7<T, U>(arg1: T, arg2: U): [T, U] {
  return [arg1, arg2]
}

const res2 = fn7<number, string>(123, "123")

// 泛型约束
function fn8<T extends number>(arg: T): T {
  return arg
}

const res3 = fn8(123)
```

```ts
type User = {
  id: string
  name: string
  age: number
}

type Result<T = any> = {
  message: string
  data: T
  code: number
}

const res: Result<User> = {
  message: "success",
  data: { id: "1", name: "2", age: 3 },
  code: 200
}

const res2: Result<User[]> = {
  message: "success",
  data: [{ id: "1", name: "2", age: 3 }],
  code: 200
}
```

## 对象的类型

```ts
const obj: { name: string; age: number } = { name: "123", age: 123 }
// 可选类型
const obj2: { name: string; age?: number } = { name: "123" }
// 只读属性
const obj3: { readonly name: string } = { name: "123" }
// 自定义类型的方式
// 1. 接口
interface Person {
  name: string
  age: number
}

const obj2: Person = { name: "123", age: 123 }

// 2. 类型别名
type Person2 = { name: string; age: number }

const obj3: Person2 = { name: "123", age: 123 }
```

## 交叉类型

将多个类型合并为一个类型

```ts
type A = {
  id: number
}

type B = {
  name: string
}

type C = A & B

const obj: C = { id: 1, name: "123" }
```

## 类型断言

相当于告诉编辑器 我知道我在干什么 没有类型上的问题

```


```

## 非空断言 (!)

当确定某个值不是 null 或者 undefined 时

```ts
function getRandom(length?: number) {
  if (!length || length <= 0) return undefined
  return Math.random().toString().slice(-length)
}

const n = getRandom(6)
n!.charAt(0)
```

## type 与 interface

type 与 interface 都可以用来定义类型，但是 type 可以定义基本类型、联合类型、交叉类型，而 interface 只能定义对象类型

```ts
type A = number | string

interface B {
  name: string
}
```

## ``

```ts
type Hello = "hello"
type Greet = `${Hello} world`

type Direction = "left" | "right" | "top" | "bottom"
type StyleName = "padding" | "margin" | "border"
type Model = `${StyleName}-${Direction}` // type Model = "padding-left" | "padding-right" | "padding-top" | "padding-bottom" | "margin-left" | "margin-right" | "margin-top" | "margin-bottom" | "border-left" | "border-right" | "border-top" | "border-bottom"
```
