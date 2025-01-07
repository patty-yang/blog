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

## keyof

## 函数

```ts
function fn(a: number, b: number): number {
  return a + b
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

```ts
enum Color {
  Red,
  Green,
  Blue
}
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
