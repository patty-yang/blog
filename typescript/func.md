## 函数

#### 签名调用

```ts
type Sum = (a: number, b: number) => number

const fn: Sum = (a, b) => a + b
```

#### 函数重载

```ts
// 重载签名
function combine(a: number, b: number): number
function combine(a: string, b: string): string

// 函数签名
function combine(a: number | string, b: number | string): string | number {
  if (typeof a === "number" && typeof b === "number") {
    return a + b
  }

  if (typeof a === "string" && typeof b === "string") {
    return a + b
  }
  throw new Error("错误")
}
```
