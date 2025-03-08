## computed

```js
const state = reactive({
  a: 1,
  b: 2
})

const sum = computed(() => {
  return state.a + state.b
})
```

```js
const sum = computed({
  get() {
    return state.a + state.b
  },
  set(value) {
    state.a = value
  }
})
```

当数据发生改变后,callback 函数重新执行

1. 处理 computed 传递的参数

```js
// computed.js
const computed = (getterOrOptions) => {
  const { get, set } = normalizeGetterOrOptions(getterOrOptions)
}

const normalizeGetterOrOptions = (getterOrOptions) => {
  let getter
  let setter
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions
    setter = () => {}
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  return {
    getter,
    setter
  }
}
```

2. 使用 computed 的时候 通过 .value 属性去访问的，所以去返回一个对象 包含 value 属性

```js
import { effect } from './effect/effect.js'
const computed = (getterOrOptions) => {
  const { getter, setter } = normalizeGetterOrOptions(getterOrOptions)
  effect(getter, {
    lazy: true
  })
  const obj = {
    get value() {
      // 在数据发生变化的时候重新执行 callback，所以依赖的也是 effect
      return
    },
    set value(value) {
      setter(value)
    }
  }

  return obj
}
```
