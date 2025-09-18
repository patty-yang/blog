## promise

1. resolve -> fuifilled
2. reject -> rejected
3. pending -> fulfilled/rejected 之后就不能变化到其他状态了
4. throw -> rejected

### 1.实现简易版本的 promise

```js
class MyPromise {
  constructor(executor) {
    // 初始化promise的状态、promiseResult保存 reslove/reject 接受的值
    this.status = 'pending'
    this.value = undefined

    // 只有当Promise的状态为pending时，才能将其状态
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
      }
    }
    const reject = (value) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = value
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
}
```

### 2. then

```js
class MyPromise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.shift()(value)
      }
    }

    const reject = (value) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = value
        this.onRejectedCallbacks.shift()(value)
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // then
  // 1. 接受两个回调 onFulfilled onRejected
  // 2. 可以链式调用 -> 返回一个promise
  // 3. 触发时机 -> resolve | reject

  // 所以需要数组来存储res rej的结果
  then(onFulfilled, onRejected) {
    // 参数校验，如果回调函数不是函数类型，则将其设置为一个返回原值的函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (val) => {
            throw Error(val)
          }
    return new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        try {
          const result = cb(this.value)
          if (result instanceof MyPromise) {
            // 如果回调函数返回的是一个Promise对象，则调用其then方法，并传入resolve和reject作为参数
            result.then(resolve, reject)
          } else {
            // 否则，将回调函数的返回值传递给resolve函数
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }

      if (this.status === 'fulfilled') {
        resolvePromise(onFulfilled)
      } else if (this.status === 'rejected') {
        resolvePromise(onRejected)
      } else if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => resolvePromise(onFulfilled))
        this.onRejectedCallbacks.push(() => resolvePromise(onRejected))
      }
    })
  }

  all(promiseList) {
    const result = []
    let count = 0

    return new MyPromise((resolve, reject) => {
      const addData = (value, index) => {
        result[index] = value
        count++
        if (count === promiseList.length) {
          resolve(result)
        }
      }
      promiseList.forEach((promise, index) => {
        promise.then(
          (res) => {
            addData(res, index)
          },
          (err) => reject(err)
        )
      })
    })
  }

  race(promiseList) {
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise) => {
        promise.then((res) => {
          resolve(res)
        })
      })
    })
  }
}
```

## async/await

```js
// 使用同步的方法表达异步的操作
async fn(value) {
  const res = await x(value)
  const res1= await x(res)
}
```

## generaor

```js
async function* count() {
  let i = 0
  // 每秒产生1个新的数字
  while (true) {
    // 等待1秒钟
    await new Promise((resolve) => setTimeout(resolve, 1000))
    yield i
    i++
  }
}

;(async () => {
  let countGenerator = count()
  console.log(await countGenerator.next().value) // 1s 后打印 0
  console.log(await countGenerator.next().value) // 1s 后打印 1
  console.log(await countGenerator.next().value) // 1s 后打印 2
})()
```
