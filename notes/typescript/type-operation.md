## keyof

获取对象类型的属性的联合类型

```ts
type A = {
  a: string
  b: number
}

type B = keyof A // 只能看到 B 的类型为为 keyof A
type C = keyof A & {} // a | b

const user = {
  name: "张三",
  age: 18
}
// 获取对象 key 的联合类型
type User = keyof typeof user // "name" | "age"
```

## in

```ts
type A = {
  [key in "a" | "b"]: string
}
```

------- 知道了 keyof 和 in 之后就可以看下 ts 提供的类型体操了

## Partial

将类型修改为可选类型，并返回新的类型

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

## Required

将类型修改为必选类型，并返回新的类型

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

## readonly

```ts
type MyReadonly<T> = {
  readonly [p in keyof T]: T[p]
}
```

## Record

将一个类型映射到另一个类型

```ts
type MyRecord<T, U> = {
  [p in T]: U
}
// input.tsx(43, 15): This type parameter might need an `extends string | number | symbol` constraint.

// keyof any -> string | number | symbol
type MyRecord<T extends keyof any, U> = {
  [p in T]: U
}
```

## Pick

类型提取

```ts
type MyPick<T, K extends keyof T> = {
  [p in K]: T[p]
}
```

## Extract

```ts
type MyExtract<T, U> = T extends U ? T : never
```

## Omit

类型剔除

```ts
interface Todo {
  title: string
  desc: string
  completed: boolean
}
type MyOmit<T, K extends keyof any> = MyPick<T, Exclude<keyof T, K>>

type T1 = MyOmit<Todo, "title" | "desc">
type T2 = MyPick<Todo, "title" | "desc">

// 健名映射 as
type MyOmit<T, K extends keyof any> = {
  [p in keyof T as p extends K ? never : p]: T[p]
}

type TodoOmit<Todo, 'title'|'decs'> // completed

/**
 p in keyof T -> "title" | "desc" | 'completed'

  "title" extends 'title'|'decs' ? never : "title"
  "desc" extends 'title'|'decs' ? never : "desc"
  "completed" extends 'title'|'decs' ? never : "completed"
 */
```

##

```ts
// 选取类型上的某些属性为 可选
type User = {
  name: string
  age: number
  id: string
  address: string
  desc: string
}

type OptionalPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type PickUser = OptionalPick<User, "address" | "desc">
```

## 条件类型

```ts
type A1 = "1" extends number ? true : false // true
type A2 = number extends object ? true : false // false
type A4 = {} extends object ? true : false // true
type A3 = number extends Object ? true : false // true
type A5 = { a: 1; b: 2 } extends { a: 1 } ? true : false // true  结构化类型
type A6 = { a: 1 } extends { a: 1; b: 2 } ? true : false // false

type A7 = 1 extends 1 ? true : false // true
```

<!--
// 不明白的 ts 操作
// type A9 = object extends {} ? true : false
// type A10 = Object extends {} ? true : false
// type A11 = {} extends Object ? true : false
// type A12 = object extends Object ? true : false
// type A13 = Object extends object ? true : false

// // 原始类型的字面量类型 < 原始类型 < 原始类型对应的装箱类型 < Object
// type A15 = any extends Object ? true : false // boolean
// type A16 = any extends Object ? 1 : 2 // 1 | 2
// type A17 = any extends "hello" ? 1 : 2 // 1 | 2

// type A18 = unknown extends any ? 1 : 2 // 1
// type A19 = any extends unknown ? 1 : 2 // 1
 -->

```ts
const obj = {
  a: 1
}

type HasB<T> = T extends { b: unknown } ? T["b"] : never
type Test = HasB<typeof obj> // never
```

```ts
type A = {
  name: string
  age: string
  id: string
}

type B = {
  name: string
  age: number
  id: number
}

type Merge<T, U> = {
  // 便利所有的 key 联合类型会自动去重
  [P in keyof T | keyof U]: P extends keyof T
    ? T[P]
    : P extends keyof U
    ? // 类型覆盖
      U[P]
    : never
}

type Test = Merge<A, B>
```

<!-- ## 分发式条件特性

得需要联合类型 + 泛型触发

```ts
string extends T ? A : B  // -> string extends T ? A : B
(number | string)  T ? A : B // -> number extends T ? A : B | string extends T ? A : B
``` -->

## infer

在`条件类型`中的类型进行类型推断

基本语法是 `A extends B ? C : D`

A 和 B 是类型 C D 是返回的类型

```ts
// 从数组类型中推断其元素的类型
type ElementType<T> = T extends (infer R)[] ? R : never
type E1 = ElementType<number[]> // number
```

```ts
// 推断函数的返回值类型
type ParametersType<T> = T extends (arg: infer R) => any ? R : never
type Func = (v: number) => void
type E2 = ParametersType<Func>
```

```ts
// 第一个和最后一个的类型
type First<T> = T extends [infer R, ...infer O] ? R : never
type Last<T> = T extends [...infer R, infer L] ? L : never

type arr1 = ["1", "2", "3"]
type arr2 = [1, 2, 3]

type F1 = First<arr1>
type F2 = Last<arr2>
```

```ts
// 元祖两个位置上的类型交换
type Swap<T extends any[]> = T extends [infer A, ...infer O, infer B]
  ? [B, A]
  : T
```
