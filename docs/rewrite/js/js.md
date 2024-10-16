## let const var 的区别

### var

- 没有块级作用域的概念
- 有全局作用域、函数作用域的概念
- 不定义初始化值时默认为 undefined
- 存在变量提升
- 全局作用域下 var 声明的变量会挂载到 windows 对象下
- 在同一作用域中允许重复声明

### let

- 有块级作用域的概念
- 不存在变量提升，有暂时性死区，解决了在循环中使用 var 全局作用域重复修改的问题
- 不存在全局作用域的概念
- 在同一个作用域中不允许重复声明

### const

- 拥有 let 的特性
  区别:

1. 必须初始化赋值，不能留到以后赋值
2. 值不能被修改，因为是一个常量

```js
var a = {
  n: 1,
};
var b = a;
a.x = a = { n: 2 };

// 1. 定义个变量 a，之后在堆内存中开辟一个地址存储 {n:1}，并将引用链接到 a 变量
// 2. 定义变量 b，之后将 { n: 1 } 的地址引用链接到 b 变量
// 3. a.x = a = { n: 2 };
//   3.1  从左到右运算，将堆内存中的 {n: 1} 增加一个x {n:1, x: }
//    3.2 执行 a = {n:2} 所以 又开辟了一个地址存储{n:2}，并将引用链接到 a 变量
//    3.3 a.x -> 所以a.x 链接到新开辟的内存地址 {n:2}
//4. a.x = undefined
// 5. b.x = { n:2 }
console.log(a.x);
console.log(b.x);
```

## js 中的数据类型

- 基本类型（这些类型的值无法往下拆分）

  - number
  - string
  - boolean
  - undefined
  - null
  - symbol 创建唯一的标识符，且是唯一不可变的
  - bigint 安全处理非常大的整数的方法

- 引用类型
  object
  function

```js
function fn() {}
fn.a = 1;
fn.test = function () {
  console.log('this is a test function');
};
// 在函数内部有个 `[[call]]` 属性，表示这个对象是可被调用的,
// 正因为函数是可调用的对象，所以为了区分普通对象和函数对象，因此使用typeof 操作符检测一个函数时，是一个function
```

### 两者的本质区别

- 存储区域的问题

  - 栈内存： 栈内存因为数据大小和声明周期的可预测性而易于管理和快速访问，栈内存支持快速的数据分配和销毁过程，但不适合复杂的大规模的数据结构
  - 堆内存： 堆内存更加灵活，可以动态分配和释放空间，适合存储生命周期长或大小不确定的数据。使用堆内存可以有效的管理大量的数据，但相对于栈内存来说，管理成本更高，访问速度也比较慢

```js
const obj = {};
function fn(obj) {
  obj.a = 1;
}
console.log(obj); // {}
fn(obj);
console.log(obj); // { a:1 }
// js 在函数调用的时候，统统都是值传递 并非是引用传递
```

### null undefined

```js
  typeof undefined -> undefined
  typeof null -> object
```

typeof object 是设计之初就存在的问题

`null:`

从语义上来讲就是 表示对象的 无

转为数值会被转换为 0

原型链的终点

`undefined:`

转为数值为 NAN

变量声明了但是没有赋值，所以默认值为 undefined

函数没有返回值的时候，默认返回 undefined

## 原型和原型链

```js
// 函数二义性的由来
function Person(name) {
  // 1. 创建一个普通的对象
  // const obj = {}
  // 2. 设置改对象的原型对象
  // obj.__proto__ = Person.prototype
  // 3. 设置this的指向 指向obj
  // this -> obj
  // 4. 如果代码里面没有返回对象 则返回this
  // return this
  this.name = name;
}

const p = new Person('张三');

// es6的 class
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

## 执行栈和执行上下文
