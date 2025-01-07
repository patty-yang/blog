## any

any 类型是 ts 的一个兜底功能，默认为 any 类型

```ts
let a: any = ["1"]

let b: any = "123"

let c: any = a + b
```

## unknown

unknown
any 是放弃了所有的类型检查，unknown 保留了一丝丝类型检查

在类型未知时，更推荐使用 unknown

```ts
let anyFn: any
let unknownFn: unknown

anyFn.test()
unknownFn.test() //'unknownFn' is of type 'unknown'.(18046)
```

## bigInt

```js
const n = 1234n // 只能在 es2020 及以上版本使用
```

## symbol

symbol 是 es2015(es6) 新增的一种数据类型，用于创建唯一的标识符

```ts
const s1 = Symbol("s1")
const s2 = Symbol("s2")

console.log(s1 === s2) // false
```

## null 与 undefined

null 与 undefined 都分别是对应的类型，值只能是 null 、undefined

但是可以配置 `strictNullChecks` 为 false 来允许 null 与 undefined 的赋值

```ts
let a: number | null = null
let b: number | undefined = undefined
```

## 大小写的问题

ts 都提示尽可能的使用小写，so you know

```ts
let str: string = ""

let str2: String = new String("hello")

str2 = str

str = str2 // Type 'String' is not assignable to type 'string'. 'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.(2322)
```

## 装箱类型、拆箱类型、字面量类型

```txt
在 js 中，原型链最顶层的是 Object，在 ts 中 Object 是所有类型的父类型

     Object                         // 装箱类型
Boolean String Number Symbol        // Object 的子类型（装箱类型）

boolean string number symbol        // 拆箱类型()
false   ''      123   Symbol()      // 字面量类型

// 拆箱类型赋值给装箱类型，就会出现类型不兼容的问题
```

## 结构化类型

为什么记录这个东西呢，后端同事看到我写的类型标注后，就很疑惑

```ts
type A = {
  name: string
  age: number
}

type B = {
  name: string
  age: number
}
```

ts 的对象类型表示`对象的结构`，js 采用的是结构化类型，ts 直接沿用，没有使用名义话类型

结构化类型: 是根据结构来确定的，如果两个对象的结构相同（有相同的属性和方法），那么就可以认为是相同的类型或者是兼容的类型

名义化类型: 是根据类型的名称和标识符来判断类型是否相同
