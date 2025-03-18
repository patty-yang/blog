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
for (let key in proxyObj) {
}
