import { TrackOpTypes } from '../utils/eunm.js'

/**
 *  依赖收集器
 * @param target 原始对象
 * @param type 操作类型
 * @param key 操作的属性
 */
function track(target, type, key) {
  // 如果是遍历操作 key不存在
  if (type === TrackOpTypes.ITERATE) {
    return
  }
  console.log(
    '需要收集依赖 ',
    `原始对象为:${target},操作是:${type},属性值为:${key}`
  )
}

export { track }
