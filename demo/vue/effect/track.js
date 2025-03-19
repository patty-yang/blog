import { TrackOpTypes } from '../utils/eunm.js'

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
function track(target, type, key) {
  if(!shouldTrack) return;
  // 如果是遍历操作 key不存在
  if (type === TrackOpTypes.ITERATE) {
    return
  }
  // console.log(
  //   '需要收集依赖 ',
  //   `原始对象为:${target},操作是:${type},属性值为:${key}`
  // )
}

export { track }
