## 类型检查

- 静态
- 动态

## 类型定义

```ts
// 基础类型
const name: string = 'name'
const age: number = 18
const bool: boolean = false
// 引用类型
const obj: {
  name: string
  age: number
} = {
  name: 'name',
  age: 18
}
const arr: number[] = [1, 2, 3, 4]
const arr: Array<number> = [1, 2, 3, 4]

const fn = (): number => {
  return 18
}
```

## 类型注解和类型推断

```ts
// 注解
const color: string = '#ccc'
// 推断
const num = 2 // -> number
```

## 数组、元祖

```ts
const arr: number[] = [1, 2, 3, 4]
const arr: Array<number> = [1, 2, 3, 4]

const info: [string, number] = ['name', 18]
```

## 联合类型、交叉类型、类型保护

```ts
// 联合类型
interface A {
  boo: boolean
  fn1: () => void
}

interface B {
  boo: boolean
  fn2: () => void
}

let S: Bord | Dog
// 交叉类型
// type A = { name: string }
// type B = {
//   age: number
//   asy: () => void
// }

// type S = A & B

// 类型保护
function fn(value: S) {
  // 类型断言
  // if (value.fn1) {
  //   value.fn1()
  // } else {
  //   value.fn2()
  // }
  //

  // in 运算符
  if ('fn1' in value) {
    value.fn1()
  } else {
    value.fn2()
  }
}
// typeof 运算符
function add(first: number | string, second: number ｜ string) {
  if(typeof first === 'string' || typeof second === 'string'){
    return `${first}${second}`
  }
  return  first + second
}
```

## typeof

```ts
// typeof操作符用于获取变量的类型，因此操作符后面接的始终是一个变量。
const obj = {
  name: 'CJ',
  age: 18
}

type Test = typeof obj
 ↓↓↓↓↓↓↓↓↓
type Test = {
  name: string
  age: number
}

const types = ['A', 'B', 'C'] as const
type TestType = typeof types // => "A" | "B" | "C"
```

## keyof

```ts
// keyof操作符后面接一个类型，生成由string或者number组成的联合字面量类型。
type Test = {
  name: string
  gae: number
}

type TestKeys = keyof Test
const k1: TestKeys = 'name'
const k2: TestKeys = 'age'
// Type '"other"' is not assignable to type 'keyof Test'.(2322)
const k3: TestKeys = 'other'
```

```ts
// 约束 key 只能是obj上存在的属性
const fn = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key]
}
```

## 枚举

```ts
// 默认从 0 开始
enum Status {
  OFFLINE, // 0
  ONLINE, // 1
  DELETED // 2
}

enum Status {
  OFFLINE = 3,
  ONLINE = 8,
  DELETED = 24
}

enum Status {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  DELETED = 'DELETED'
}
```

## interface

```ts
// ? 可选参数
// readonly: 只读属性
interface IProps {
  name?: string
  readonly age: number
  fn: () => void
  fn1: (value: string) => string
  // [key: string]:
}
```

## extends 继承

```ts
interface IProps {
  name?: string
  readonly age: number
  fn: () => void
  fn1: (value: string) => string
}

interface X extends IProps {
  fn2: () => void
}
```

## 范型

```ts
interface Response<T> {
  code: number
  data: T
  msg: string
}
```

## infer

```ts
// 提取参数的类型
type ParamType<T> = T extends (args: infer p) => any ? p : T

type Params = ParamType<(value: string) => void> // -> string
type Params = ParamType<(value: number) => void> // -> number

type ParamType<T> = T extends Array<infer K> ? K : T

type S = ParamType<number[]> // -> number
type S = ParamType<string> // -> string
```

**日常开发常用的 done**

---

## 类型体操工具

- Awaited
  ```ts
  // Awaited 是 TypeScript 4.5 版本中引入的一个新的类型操作工具，用于获取 Promise 的返回值类型。
  Awaited<Promise<string>> // ->  string
  ```
- Partial

  ```ts
   //  Partial<T> 将类型 T 中的所有属性都变为可选。
    interface ToDo {
      title: string
      desc: string
    }
    Partial<ToDo>
     ↓↓↓↓↓↓↓↓↓
    {
      title?: string
      desc?: string
    }
  ```

- Required

  ```ts
  // Required<T> 将类型 T 中的所有属性都变为可选。
    interface ToDo {
      title?: string
      desc?: string
    }
    Required<ToDo>
     ↓↓↓↓↓↓↓↓↓
     {
      title: string
      desc: string
    }
  ```

- Readonly

  ```ts
    // Readonly<T>：将类型 T 中的所有属性都变为只读。
    interface ToDo {
      title: string
      desc: string
    }
    Readonly<ToDo>
     ↓↓↓↓↓↓↓↓↓
    {
        readonly title: string;
        readonly desc: string;
    }
  ```

- Record

  ```ts
  // Record<K, T>：构造一个类型，其属性名的类型为 K，属性值的类型为 T。
  enum Keys {
    Key1 = 'key1',
    Key2 = 'key2'
  }

  type MyRecord = Record<Keys, number> //-> { key1: number key2: number;}

  type MyRecord2 = Record<string, number> // -> { [key: string]: number;}
  ```

- Pick

  ```ts
  // Pick<T, K>：从类型 T 中挑选出一些属性，构造一个新的类型。
  Pick<ToDo, 'title'>
   ↓↓↓↓↓↓↓↓↓
   {
      title: string
    }
  ```

- Omit

```ts
 // Omit<T, K>：从类型 T 中剔除一些属性，构造一个新的类型。
 Omit<ToDo, 'title'>
  ↓↓↓↓↓↓↓↓↓
  {
     desc: string
   }
```

<!-- 不知道有什么用 -->

- Exclude
- Extract
- NonNullable
- ReturnType

<!-- ## 运行时类型检查

- Zod

  ```js
  import { z } from 'zod'
  const myschema = z.string()
  myschema.parse(value)
  ```

- Yup-
- Joi -->
