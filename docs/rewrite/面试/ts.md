## typeof

- 获取变量的类型

```ts
const obj = {
  a: 1,
  b: 2,
};

type ObjType = typeof obj; // { a: number, b: number }

const types = ['a', 'b'] as const;
type Types = typeof types; // 'a' | 'b'
```

## keyof

- 生成 string 或 number 组成的联合字面量的类型

```ts
type Test = {
  name: string;
  age: number;
};

const TestKeys = typeof Test;

const key1: TestKeys = 'name';
const key2: TestKeys = 'age';
const key3: TestKeys = 'age2'; ///  报错 TestKeys 上不存在age2类型

// 约束key只能是obj上存在的类型
const fn = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};
```

## enum 枚举

```js
// 默认从0开始
  enum Status {
    OFFLINE, // 0
    ONLINE, // 1
    DELETED // 2
  }

```

## extends 继承

```ts
interface A {
  a: string;
}

interface B extends A {
  b: number;
}
```

## infer

```ts
// 提取参数的类型
type ParamType<T> = T extends (args: infer P) => any ? P : T;

type Params = ParamsType<(name: string) => void>; // string
type Params = ParamsType<string>; // string
```

## 类型体操

```ts
// Partial
    将类型 T 中所有的属性都变为可选的
    type Partial<T> = {
        [P in keyof T]?: T[P];
    }

// required
    将类型 T 中所有属性都变为必选的
    type Required<T> = {
        [P in keyof T]?: T[P];
    }

// readonly
  将类型 T 中所有属性都变为只读
  type Readonly<T> = {
      readonly [P in keyof T]: T[P];
  }

// record
type Record <K extends keyof any, T> = {
    [P in K]: T;
}

// pick
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

// omit
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

## const 和 readonly 的区别

- const 可以方式变量的值被修改
- readonly 可以防止变量的属性被修改

## type 和 interface 的区别

- 相同点
  - 都可以描述对象或者函数
  - 都可以使用 extends
- 不同点
  - type 可以声明基本类型，联合类型
  - type 可以使用 typeof 获取实例的类型进行赋值
  - 多个 interface 声明可以自动合并

## 工具类型

- Exclude<T, U> 从  T  中排除出可分配给  U 的元素。
- Omit<T, K> 的作用是忽略 T 中的某些属性。
- Merge<O1, O2> 是将两个对象的属性合并。
- Compute<A & B> 是将交叉类型合并
- Intersection<T, U>的作用是取 T 的属性,此属性同样也存在与 U。
- Overwrite<T, U> 是用 U 的属性覆盖 T 的相同属性。

<Gitalk />