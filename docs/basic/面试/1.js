// function Person() {}

// // Person.prototype.name = 'John1'
// const person1 = new Person()
// const person2 = new Person()
// // console.log('🚀 ~ person1:', person1.name)
// // console.log('🚀 ~ person2:', person2.name)

// // console.log(person1.__proto__ === Person.prototype)
// // console.log(Person.prototype.constructor === Person)
// // console.log(Object.getPrototypeOf(person1) === person1.__proto__)

// // prototype 构造函数的属性
// // __proto__ 实例上的属性 最终都会指向原型 prototype

// Person.prototype.name = 'person-name'

// person1.name = 'person1-name'

// console.log('🚀 ~ person1:', person1.name)

// delete person1.name
// console.log('🚀 ~ person1:', person1.name)

// const obj = {
//   value: 1
// }
// function bar(a, b) {
//   console.log(a, b, this.value)
// }
// Function.prototype.call2 = function (context) {
//   const args = [...arguments].slice(1)
//   if (typeof context === 'undefined') {
//     context = window
//   }
//   const symbol = new Symbol()
//   context[symbol] = this
//   const result = context[symbol](...args)
//   delete context[symbol]
//   return result
// }
// bar.call2(obj, 12, 3, '12')

// 1. basic
// class MyPromise {
//   constructor(executor) {
//     this.status = 'pending'
//     this.value = undefined

//     const resolve = (value) => {
//       if (this.status === 'pending') {
//         this.status = 'resolved'
//         this.value = value
//       }
//     }
//     const reject = (error) => {
//       if (this.status === 'pending') {
//         this.status = 'rejected'
//         this.value = error
//       }
//     }
//     try {
//       executor(resolve, reject)
//     } catch (error) {
//       reject(error)
//     }
//   }
// }

// 2. then
// 接受两个回调 onFulfilled 和 onRejected
// 可以链式调用
// 触发时机 resolve reject
class MyPromise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined

    this.onFulfilled = []
    this.onRejected = []
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'resolved'
        this.value = value

        while (this.onFulfilled.length) {
          const onFulfilled = this.onFulfilled.shift()
          return onFulfilled && onFulfilled(value)
        }
      }
    }
    const reject = (error) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = error
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
    onRejected = typeof onRejected === 'function' ? onRejected : (val) => val

    const promise2 = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        try {
          if (cb(this.value) instanceof MyPromise) {
            cb(this.value).then(resolve, reject)
          } else {
            resolve(cb(this.value))
          }
        } catch (error) {
          reject(error)
        }
      }
      if (this.status === 'resolved') {
        // 确保是函数
        resolvePromise(onFulfilled)
        // onFulfilled(this.value)
      } else if (this.status === 'rejected') {
        resolvePromise(onRejected)
        // onRejected(this.value)
      } else if (this.status === 'pending') {
        this.onFulfilled.push(() => resolvePromise(onFulfilled))
        this.onFulfilled.push(() => resolvePromise(onRejected))
      }
    })
    return promise2
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
  .then((res) => {
    console.log(res)
    return new Promise((res) => res(11))
  })
  .then((v) => {
    console.log(v)
  })

// console.log('🚀 ~ p1 ~ p1:', p1)
