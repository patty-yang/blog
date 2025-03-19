import { reactive } from '../reactive.js'
import { track, pauseTracking, enableTracking } from '../effect/track.js'
import { trigger } from '../effect/trigger.js'
import { TrackOpTypes, TriggerOpTypes, RAW } from '../utils/eunm.js'
import { hasChanged, isObject } from '../utils/utils.js'

const arrayInstrumentations = {}

;['includes', 'indexOf', 'lastIndexOf'].forEach((method) => {
  arrayInstrumentations[method] = function (...args) {
    // 1. 正常查找，从代理对象中查找
    const res = Array.prototype[method].apply(this, args)
    // 如果找不到的话
    if (res < 0 || res === false) {
      // 从原始对象找
      return Array.prototype[method].apply(this[RAW], args)
    }
    return res
  }
})

// 当调用 pup push shift 会自动对收集依赖，不需要去进行依赖收集，所以需要控制自定义收集依赖 等操作完再恢复
;['push', 'pop', 'shift', 'unshift', 'splice'].forEach((method) => {
  arrayInstrumentations[method] = function (...args) {
    pauseTracking()
    const res = Array.prototype[method].apply(this, args)
    enableTracking()
    return res
  }
})

function has(target, key) {
  track(target, TrackOpTypes.HAS, key)
  return Reflect.has(target, key)
}

function get(target, key, receiver) {
  // RAW 标识： 是否需要原始对象
  if (key === RAW) {
    return target
  }
  track(target, TrackOpTypes.GET, key)
  // 如果是数组的某些方法，需要对数组的方法进行重写
  if (arrayInstrumentations.hasOwnProperty(key) && Array.isArray(target)) {
    return arrayInstrumentations[key]
  }
  const result = Reflect.get(target, key)
  // 如果获取到的是一个对象的话说明是这样子访问的 a.b.c
  if (isObject(result)) {
    return reactive(result)
  }
  return result
}

function set(target, key, newValue, receiver) {
  const type = target.hasOwnProperty(key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD

  const oldValue = target[key]
  const oldLength = Array.isArray(target) ? target.length : undefined
  const result = Reflect.set(target, key, newValue)
  if (hasChanged(oldValue, newValue)) {
    trigger(target, type, key)
    // 如果 length 有变化，对 length 进行派发更新
    if (Array.isArray(target) && oldLength !== target.length) {
      if (key !== 'length') {
        // 说明数组发生了隐式的变化 -> arr[999999] = 100
        trigger(target, TriggerOpTypes.SET, 'length')
      } else {
        for (let i = target.length; i < oldLength; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString())
        }
      }
    }
  }
  return result
}

function deleteProperty(target, key) {
  const result = Reflect.deleteProperty(target, key)
  if (target.hasOwnProperty(key) && result) {
    trigger(target, TriggerOpTypes.DELETE, key)
  }
  return result
}

function ownKeys(target) {
  track(target, TrackOpTypes.ITERATE)
  return Reflect.ownKeys(target)
}
export default {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}
