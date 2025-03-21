import { targetMap, activeEffect } from './effect.js'

import { TrackOpTypes, ITERATE_KEY } from '../utils/eunm.js'

/**
 * @type {boolean} 控制是否需要进行依赖收集
 */
let shouldTrack = true
export function pauseTracking() {
  shouldTrack = false
}
export function enableTracking() {
  shouldTrack = true
}

/**
 *  依赖收集器
 * @param target 原始对象
 * @param type 操作类型
 * @param key 操作的属性
 */

// ![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503211308033.png)
function track(target, type, key) {
  if (!shouldTrack) {
    return false
  }
  //   一层一层的查找，查找到后存储
  let propMap = targetMap.get(target)
  if (!propMap) {
    targetMap.set(target, (propMap = new Map()))
  }

  // 如果是遍历的话，key 是 undefined
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY
  }

  let typeMap = propMap.get(key)
  if (!typeMap) {
    propMap.set(key, (typeMap = new Map()))
  }

  // 根据 type 值查找对应的 set
  let depSet = typeMap.get(type)
  if (!depSet) {
    depSet = new Set()
    typeMap.set(type, depSet)
  }

  //   set 集合找到的话 就可以存储依赖了
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect)
    activeEffect.deps.push(depSet)
  }
}

export { track }
