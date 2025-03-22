import { reactive } from './reactive.js'

import { effect } from './effect/effect.js'
import { computed } from './effect/computed.js'
const obj = {
  a: 1,
  b: 2
  // c: {
  //   name: 'sum-one',
  //   age: 18
  // }
}
const state = reactive(obj)

const sum = computed(() => {
  console.log('computed')
  return state.a + state.b
})
effect(() => {
 console.log('render', sum.value)
})
state.a = 100
// state.b = 3
// console.log(sum.value)
// console.log(sum.value)
// console.log(sum.value)
// console.log(sum.value)
// console.log(sum.value)
// console.log(sum.value)
// console.log(sum.value)
// console.log(sum.value)
// console.log(sum.value)
// state.a = 20

// computed 还有中情况
// 函数依赖了计算属性的值




// effect test1
// function fn() {
//   console.log('fn')
//   state.a = state.a + 1
// }
//
// effect(fn)
// state.a = 100

// effect test2
// effect(() => {
//   if(state.a === 1) {
//     state.b
//   }else {
//     state.c
//   }
//   console.log(('执行 effect 1'))
// })
// effect(() => {
//   console.log(state.c)
//   console.log(('执行 effect 2'))
// })
//
// state.a = 2
// state.c = 2
// state.b = 2

// effect test3
// let isRun = false
// const effectFn = effect(fn, {
//   lazy: true,
//   scheduler: (eff) => {
//       // console.log(eff)
//     Promise.resolve().then(() => {
//       if(!isRun) {
//         isRun = true
//         eff()
//       }
//     })
//   }
// })

// effectFn()
// state.a++
// state.a++
// state.a++
// state.a++
// state.a++
// state.a++
// state.a++
// state.a++

// let isRun = false
// const effectFn = effect(fn, {
//   lazy: true,
//   scheduler: (eff) => {
//     Promise.resolve().then(() => {
//       if(!isRun) {
//         isRun = true
//         eff()
//       }
//     })
//   }
// })
// effectFn()
// state.a++
// state.a++
// state.a++
// state.a++
// const proxyObj = reactive(obj)
// proxyObj.c.name
// proxyObj.a = 2
// proxyObj.d = 4
// delete proxyObj.d
// 'a' in proxyObj
// for (let key in proxyObj) {}

// const arr = [1, obj, 3]
//
// const proxyArr = reactive(arr)
// proxyArr[0]
// proxyArr.length
// for (let key in proxyArr) {
//   proxyArr[key]
// }
// for (let i = 0; i < proxyArr.length; i++) {
//   proxyArr[i]
// }
// console.log(proxyArr.includes(3))
// console.log(proxyArr.indexOf(4))

// console.log(proxyArr.includes(obj)) // 成 false 了 ❌
// console.log(proxyArr.indexOf(obj)) // ❌
/**
 * 数组中查找对象
 *
 *
 在代理的时候进行了递归代理,导致数组中有对象的话找不到。原因就是原始对象和代理对象在比较
 解决方案: 先正常找，找不到的话在原始对象中再找一次
 */

// 写
// proxyArr[7] = 100 // ❌
/**
 * 如果隐式的长度改变，不会触发拦截
 */

// proxyArr.length =1

// proxyArr.push(999) // 当调用 pup push shift 会自动对收集依赖，不需要去进行依赖收集，所以需要控制自定义收集依赖
