### computed 方法实现

```js
const obj = {
  a: 1,
  b: 2
}
const state = reactive(obj)
const sum = computed(() => {
  console.log('computed')
  return state.a + state.b
})
```

- **缓存机制**
  - 使用 \_dirty 标志控制是否需要重新计算
  - 只有当依赖发生变化时才会触发重新计算

```js
function computed(getterOrOptions) {
  // 标准化参数，统一返回包含get和set方法的对象
  const { get, set } = normalizeParam(getterOrOptions)

  // 存储计算属性的内部状态
  const obj = {
    _value: undefined, // 结果
    _dirty: true, // 是否发生了变化 要不要重新计算
    effect: effect(get, {
      lazy: true,
      scheduler: () => {
        if (!obj._dirty) {
          obj._dirty = true
          // 触发value的setter，通知订阅者数据发生变化
          trigger(obj, TriggerOpTypes.SET, 'value') // [!code ++]
        }
      }
    })
  }

  const getter = () => {
    if (obj._dirty) {
      obj._value = obj.effect()
      obj._dirty = false
    }
  }
  return {
    get value() {
      getter() // 获取最新值
      // 如果在一个函数中使用 计算属性，手动收集依赖
      track(obj, TrackOpTypes.GET, 'value') // 收集依赖 // [!code ++]
      return obj._value
    },
    set value(newValue) {
      set(newValue)
    }
  }
}
function normalizeParam(options) {
  if (typeof options === 'function') {
    return {
      get: options,
      set: () => {}
    }
  } else {
    return {
      get: options.get,
      set: options.set
    }
  }
}
```
