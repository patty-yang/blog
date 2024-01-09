## 前端异步编码规范

- promise
- promise A+
- async/await
- generator

```js
const p1 = new Promise((res, rej) => {
  res('success')
  rej('error')
})
const p2 = new Promise((res, rej) => {
  rej('error')
  res('success')
})

const p3 = new Promise((res, rej) => {
  throw 'error'
})
console.log(p1, p2, p3)
// p1 Promise {<fulfilled>: 'success'}
// p2 Promise {<rejected>: 'error'}
// p3 Promise {<rejected>: 'error'}
```

## promise

1. resolve -> fuifilled
2. reject -> rejected
3. pending -> fulfilled/rejected 之后就不能变化到其他状态了
4. throw -> rejected

```js
// 2.
class MyPromise {
  constructor(executor) {
    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  // 1. 实现 promise 状态以及结果
  initValue = () => {
    this.PromiseStatus = 'pending'
    this.PromiseResult = null
  }
  // 2. 执行resolve函数时，需要将this指定到MyPromise实例上，更改this指向
  initBind = () => {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  resolve = (value) => {
    if (this.PromiseStatus !== 'pending') return // 状态不可逆
    this.PromiseStatus = 'fulfilled'
    this.PromiseResult = value
  }
  reject = (reason) => {
    if (this.PromiseStatus !== 'pending') return // 状态不可逆
    this.PromiseStatus = 'rejected'
    this.PromiseResult = reason
  }
}
```

```js
// then
// 1. 接受两个回调 onFulfilled onRejected
// 2. 能接受链式调用
// 3. then 触发时机是调用 res rej

// 所以需要保存回调队列
then(onFulflled, onRejected) {
  onFulflled = typeof onFulfilled === 'function' ? onFulfilled : val => val
  onRejected = typeof onRejected === 'function' ? onFulfilled : reason => { throw reson}
   if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    } else if (this.state === 'rejected') {
      onRejected(this.value)
    }

}
```
