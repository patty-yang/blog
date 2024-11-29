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

## 防抖 节流

```js
// 避免高频事件多次触发
function _debounce(fn, delay = 200) {
  let timer = null;
  return function () {
    const _this = this;
    const args = arguments;
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, deploy);
  };
}
```

```js
// 在规定时间内，高频事件只触发一次

function _throttle(fn, delay = 200) {
  let time = 0;
  return function () {
    let _this = this;
    let nowTime = new Date();
    if (nowTime - time > delay) {
      fn.call(_this, arguments);
      time = nowTime;
    }
  };
}

function _throttle2(fn, delay = 200) {
  let timer;
  return function () {
    const _this = this;
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      fn.call(_this, arguments);
    }, delay);
  };
}
```

## 箭头函数和普通函数

- 没有自己的 this，只能通过作用域链来向上查找离自己最近的那个函数的 this。
- 不能作为 constructor，因此不能通过 new 来调用，所以它并没有 new.target 这个属性。
- 没有 argument 属性，可以通过 ...rest 可以获取。
- 不能直接使用 call 和 apply，bind 来改变 this。
- 不能使用 yield，不能作为 generator 函数。
- 语法比普通函数更加简洁。

## call apply bind

### call

> call() ：在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

```javascript
// 实现思路
1. 将函数设为对象的属性
2. 执行该函数，并传递参数
3. 删除该函数
```

```js
// 第一版本
Function.prototype.call2 = function (context) {
  // 1. 首先通过this获取调用call的函数
  context.fn = this;
  // 2. 获取到传递的参数
  const args = [...arguments].slice(1);
  context.fn(...args);
  delete context.fn;
};

const obj = {
  value: 1,
};

function testFn(text) {
  console.log(this.value);
  console.log(text, 'text');
}

testFn.call2(obj, 'test');
```

```js
// 第二版
// this 参数可以不传，在不传的时候 指向window。  例如:
var value = 1;
function testFn() {
  console.log(value);
}
testFn.call(null); // 1

// 针对函数，实现返回值
const obj = {
  value: 1,
};
function testFn(text) {
  return {
    text,
    value: this.value,
  };
}
Function.prototype.call2 = function (context, ...args) {
  // 将context 为空时，指向window
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }
  // 创建唯一值作为属性名
  const symbolFn = Symbol();
  context[symbolFn] = this;
  const result = context[symbolFn](...args);
  delete context[symbolFn];
  return result;
};
const obj = {
  value: 1,
};
function testFn(text) {
  return {
    value: this.value,
    text,
  };
}
console.log(testFn.call2(obj, '文本内容'));
```

### apply

> apply 实现类似于 call，指示入参是一个数组

```js
Function.prototype.apply2 = function (context, args) {
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }
  const symbolFn = Symbol();
  context[symbolFn] = this;
  const result = context[symbolFn](...args);
  delete context[symbolFn];
  return result;
};

const obj = {
  value: 1,
};
function testFn(text) {
  return {
    value: this.value,
    text,
  };
}
console.log(testFn.apply2(obj, '文本内容'));
```

### bind

> bind 函数会创建一个新函数，当这个新函数呗调用时， 它的第一个参数将作为它运行时的 this 提后的一序列参数将会在传递的实参前传入作为它的参数

```js
Function.prototype.myBind = function (context) {
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }
  self = this;
  return function (...args) {
    return self.apply(context, args);
  };
};
```

## Map WeakMap WeakSet Set

#### Map 和 object 的区别

- Map 中的 key 是有序的，object 是无序的
- Map 默认情况下没有任何 key 除非 set，Object 有一个原型，有可能和自己设置的 key 有冲突
- Map 中 key 的类型可以是任意值，而 Object 的 key 只能是 string 或者 symbol
- Size object 其他方法获取长度

### Map WeakMap

1. WeakMap 只能接受对象作为 key，Map 中 key 的类型可以是任意值
2. WeakMap 不支持 Map 的部分方法，不可以使用循环
3. WeakMap 更有利于垃圾回收

<!-- ## 作用域和作用域链
作用域: 独立的地盘，让变量不会被外泄和暴露 -->

## 闭包

- 函数执行时，使用了外部的数据，通过作用域链，就创建了闭包



## 事件循环
- js是一门单线程语言，也就是在同一时间内执行一件任务，如果任务是异步操作，那么在执行时，js引擎会将异步任务放入事件队列中，等待主线程空闲时，再从事件队列中取出来执行。
- 事件循环机制就是：主线程不断检查事件队列中是否有任务，如果有，则取出并执行。
  - 同步任务： 任务立即执行，通常会进入主执行栈进行处理
  - 异步任务： 不会立即执行，而是放在事件队列中，待主线程空闲时再执行。
- 异步任务可以进一步划分为宏任务和微任务：
  - 微任务：Promise、Object.observe、MutationObserver，Nodejs中的process.nextTick、
  - 宏任务：setTimeout、setInterval、UI渲染、postMessage、MessageChannel、rendering，Nodejs中的setImmediate
- 在一个宏任务执行完成后，会查看是否存在微任务队列，如果有的话，则会一次执行这些微任务，然后再执行下一个宏任务。

## async与await的理解
- async 标记的函数总是会返回一个 promise，如果函数并不是一个 promise 的值，那这个值会被包装在一个 resolved 状态的 promise中
- await 可以暂停 async 函数的执行，等待 promise 处理完成， 如果不是一个 promise 的值，它会被转为一个立即 resolve 的 promise
- await 命令后面的代码会被暂停执行，知道前面的 promise 状态变为 fulfilled｜ rejected，从而实现异步到同步的一个转换
##### 执行流程
- 1. 解析同步代码，将微任务和宏任务分别加入对应队列中
- 2. 当 当前的宏任务执行完成后，检查微任务队列是否为空，如果为空则执行下一个宏任务；如果微任务队列不为空，则执行微任务队列中的所有任务，直到微任务队列为空。

<Gitalk />