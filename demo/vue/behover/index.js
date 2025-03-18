import { reactive } from '../reactive.js'
import { track } from '../effect/track.js'
import { trigger } from '../effect/trigger.js'
import { TrackOpTypes, TriggerOpTypes } from '../utils/eunm.js'
import { hasChanged, isObject } from '../utils/utils.js'

function has(target, key) {
  track(target, TrackOpTypes.HAS, key)
  return Reflect.has(target, key)
}

function get(target, key, receiver) {
  track(target, TrackOpTypes.GET, key)
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
  const result = Reflect.set(target, key, newValue)
  if (hasChanged(oldValue, newValue)) {
    trigger(target, type, key)
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
