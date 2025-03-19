import { reactive } from './reactive.js'

const obj = {
  a: 1,
  b: 2,
  c: {
    name: 'sum-one',
    age: 18
  }
}

const proxyObj = reactive(obj)
// proxyObj.c.name
// proxyObj.a = 2
// proxyObj.d = 4
// delete proxyObj.d
// 'a' in proxyObj
// for (let key in proxyObj) {}

const arr = [1, obj, 3]

const proxyArr = reactive(arr)
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
proxyArr[7] = 100 // ❌
/**
 * 如果隐式的长度改变，不会触发拦截
 */

// proxyArr.length =1

// proxyArr.push(999) // 当调用 pup push shift 会自动对收集依赖，不需要去进行依赖收集，所以需要控制自定义收集依赖