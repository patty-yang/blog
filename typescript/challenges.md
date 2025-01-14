[referer](https://github.com/type-challenges/type-åchallenges/tree/main)

## Hello, World!

这个简单的提问希望让你可以快速上手 Type Challenges。在这里，我们使用了一些神奇的技巧让 TypeScript 通过自身的类型系统来实现自动判题。

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。

```ts
// 期望是一个 string 类型
type HelloWorld = any
```

```ts
// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>
```

```ts
/* _____________ 你的代码 _____________ */
type HelloWorld = string // expected to be a string

/* _____________ 测试用例 _____________ */
import type { Equal, Expect, NotAny } from "@type-challenges/utils"

type cases = [Expect<NotAny<HelloWorld>>, Expect<Equal<HelloWorld, string>>]
```

## 4 - 实现 Pick

不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

**从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, "title" | "completed">

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
}
```

```ts
/* _____________ 你的代码 _____________ */
// 提取属性 首先要提取 T 上的属性
// type MyPick<T, K extends keyof T> = {
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}
```

## 7 - 对象属性只读

不要使用内置的`Readonly<T>`，自己实现一个。

泛型 `Readonly<T>` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会是只读 (readonly) 的。

也就是不可以再对该对象的属性赋值。

例如：

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

```ts
/* _____________ 你的代码 _____________ */

type MyReadonly<T> = {
  readonly [key in keyof T]: T[key]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
```

## 11 - 元组转换为对象

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

例如：

```ts
const tuple = ["tesla", "model 3", "model X", "model Y"] as const

type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

```ts
/* _____________ 你的代码 _____________ */
// T[number] 是 T 的元素的联合类型
// 所以 T[number] 是 T 的元素的联合类型

type TupleToObject<T extends readonly any[]> = {
  [key in T[number]]: key
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

const tuple = ["tesla", "model 3", "model X", "model Y"] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, "2", 3, "4", sym1] as const

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla"
        "model 3": "model 3"
        "model X": "model X"
        "model Y": "model Y"
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<
      TupleToObject<typeof tupleSymbol>,
      { [sym1]: typeof sym1; [sym2]: typeof sym2 }
    >
  >,
  Expect<
    Equal<
      TupleToObject<typeof tupleMix>,
      { 1: 1; "2": "2"; 3: 3; "4": "4"; [sym1]: typeof sym1 }
    >
  >
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>
```

## 14 - 第一个元素

实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ["a", "b", "c"]
type arr2 = [3, 2, 1]

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
```

```ts
/* _____________ 你的代码 _____________ */

// 如果 T 是空数组的话返回 never
type First<T extends any[]> = T extends [] ? never : T[0]

// 如果传递的数组长度是 0 的话 返回 never
type First<T extends any[]> = T["length"] extends 0 ? never : T[0]

// infer
type First<T extends any[]> = T extends (infer R, ...infer O)[] ? R : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
]

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
]
```

## 18 - 获取元组长度

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

例如：

```ts
type tesla = ["tesla", "model 3", "model X", "model Y"]
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
]

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

```ts
/* _____________ 你的代码 _____________ */
// 这个泛型接受一个只读的元组
// type Length<T extends readonly any[]>

type Length<T extends readonly any[]> = T["length"]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

const tesla = ["tesla", "model 3", "model X", "model Y"] as const
const spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<"hello world">
]
```

## 43 - 实现 Exclude

实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

> 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

例如：

```ts
type Result = MyExclude<"a" | "b" | "c", "a"> // 'b' | 'c'
```

```ts
/* _____________ 你的代码 _____________ */
// 如果 T 是 U 的子集 返回 never 剔除
type MyExclude<T, U> = T extends U ? never : T

type A = "a" | "b" | "c"
type B = "a"
type C = MyExclude<A, B> // "b" | "c"
// 也就相当于
// "a" extends "a" ? never : "a"
// "b" extends "a" ? never : "b"
// "c" extends "a" ? never : "c"

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<
    Equal<MyExclude<string | number | (() => void), Function>, string | number>
  >
]
```

## 189 - Awaited

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise<T> 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

```ts
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

```ts
// promiseLike promise的then/catch/finally
// 在ES6 之前没有标准的 promise 内置对象，但是社区已经有  future/Promise 异步的相关实践，
// 按照PromiseA+规范来描述Promise

// 是否是个Promise对象
// 通过 infer 获取对应的类型
// 如果是个 promise 递归 否则返回对应的类型
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer V>
  ? V extends PromiseLike<any>
    ? MyAwaited<V>
    : V
  : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
]
```

## 268 - If

实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

例如：

```ts
type A = If<true, "a", "b"> // expected to be 'a'
type B = If<false, "a", "b"> // expected to be 'b'
```

```ts
// C 为真时，返回 T, C 为假时，返回 F,说明 C 是 boolean
type If<C extends boolean, T, F> = C extends true ? T : F
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<If<true, "a", "b">, "a">>,
  Expect<Equal<If<false, "a", 2>, 2>>,
  Expect<Equal<If<boolean, "a", 2>, "a" | 2>>
]

// @ts-expect-error
type error = If<null, "a", "b">
```

## 533 - Concat

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

例如：

```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

```ts
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

const tuple = [1] as const

// const T1 = typeof tuple
/*
const T1: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
所以需要加 readonly
 */

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<
    Equal<
      Concat<["1", 2, "3"], [false, boolean, "4"]>,
      ["1", 2, "3", false, boolean, "4"]
    >
  >
]

// @ts-expect-error
type error = Concat<null, undefined>
```

## 898 - Includes

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。

例如：

```ts
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio"> // expected to be `false`
```

```ts
/* _____________ 你的代码 _____________ */

type Includes<T extends readonly any[], U> = T extends U ? true : false

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
]
```

## push

在类型系统里实现通用的 `Array.push` 。

例如：

```typescript
type Result = Push<[1, 2], "3"> // [1, 2, '3']
```

```ts
/* _____________ 你的代码 _____________ */

type Push<T extends any[], U> = [...T, U]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
]
```
