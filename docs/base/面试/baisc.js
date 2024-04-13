class MyPromise {
  constructor(cb) {
    this.status = 'pending'
    this.value = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallback = []
    // 状态不可逆
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'resolved'
        this.value = value

        while (this.onFulfilledCallbacks.length) {
          this.onFulfilledCallbacks.shift()(value)
        }
      }
    }
    const reject = (value) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = value
      }
    }

    try {
      cb(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    typeof onFulfilled === 'function' ? onFulfilled : (val) => val
    typeof onRejected === 'function' ? onRejected : (val) => val

    // 还能then的话说明还是个promise

    const resolvePromise = () => {
      return new MyPromise((resolve, reject) => {
        const fn = (cb) => {
          const v = cb(this.value)
          if (v instanceof MyPromise) {
            v.then(resolve, reject)
          } else {
            resolve(v)
          }
        }

        if (this.status === 'resolved') {
          fn(onFulfilled)
        } else if (this.status === 'rejected') {
          fn(onRejected)
        } else if (this.status === 'pending') {
          // 定时器处理
          this.onFulfilledCallbacks.push(() => fn(onFulfilled))
          this.onRejectedCallback.push(() => fn(onRejected))
        }
      })
    }

    return resolvePromise
    // if (this.status === 'resolved') {
    //   onFulfilled(this.value)
    // } else if (this.status === 'rejected') {
    //   onRejected(this.value)
    // } else if (this.status === 'pending') {
    //   // 定时器处理
    //   this.onFulfilledCallbacks.push(onFulfilled)
    //   this.onRejectedCallback.push(onRejected)
    // }
  }
}

const test2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success') // 1秒后输出 success
  }, 1000)
}).then(
  (res) => console.log(res),
  (err) => console.log(err)
)

// 链式调用 输出 200
const p3 = new Promise((resolve, reject) => {
  resolve(100)
})
  .then(
    (res) => 2 * res,
    (err) => console.log(err)
  )
  .then(
    (res) => console.log(res),
    (err) => console.log(err)
  )

// 链式调用 输出300
const p4 = new Promise((resolve, reject) => {
  resolve(100)
})
  .then(
    (res) => new Promise((resolve, reject) => resolve(3 * res)),
    (err) => console.log(err)
  )
  .then(
    (res) => console.log(res),
    (err) => console.log(err)
  )
