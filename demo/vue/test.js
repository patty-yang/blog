// mini ref reactive

// 1.0
function isObject(val) {
  return val !== null && typeof val === 'object'
}

class RefImpl {
  constructor(value) {
    this._value = isObject(value) ? reactive(value) : value
  }
  get value() {
    console.log('get value')
    return this._value
  }
  set value(newVal) {
    console.log('set value')
    this._value = newVal
  }
}

function ref(value) {
  return new RefImpl(value)
}

function deepProxy(obj) {
  if (!isObject(obj)) {
    return obj
  }
    return new Proxy(obj, {
      get(target, key) {
          console.log('get', key)
          if (isObject(target[key])) {
              return deepProxy(target[key])
          }
          return Reflect.get(target, key)
      },
      set(target, key, value) {
          console.log('set', key)
          return Reflect.set(target, key, value)
      },
      deleteProperty(target, key) {
          console.log('delete', key)
          return Reflect.deleteProperty(target, key)
      }
  })
}

function reactive(obj) {
  return deepProxy(obj)
}

// const state = ref('123')
// state // 不拦截 get 操作
// state.value // 触发拦截
// state.a // 不拦截
// state.a = 2 // 不拦截
// state.value = 123 // 触发拦截
// delete state // 不拦截
// state = 2 // 不拦截

// const state = ref({
//   a: 1
// })

// state // 不拦截 get 操作
// state.a // 不拦截
// state.value // 触发拦截
// state.a = 3 // 不拦截
// state.value.a // 触发拦截 拦截 value 访问 a 的访问
// delete state // 不拦截

// const state = reactive({})

// state.a = {
//   b: {
//     c: 3
//   }
// }
// console.log(state.a.b.c)
// delete state.a
