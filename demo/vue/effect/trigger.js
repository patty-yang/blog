
import { activeEffect, targetMap } from './effect.js'
import { triggerTypeMap, TriggerOpTypes, ITERATE_KEY } from '../utils/eunm.js'
/**
 *
 * @param target 原始对象
 * @param type 操作类型
 * @param key 操作的属性
 */
// ![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503211308033.png)
function trigger(target, type, key) {
  //   从设计好的数据结构里，一层一层的去找，找到对应的函数集合，然后全部执行一次
  const effectFns = getEffectFn(target, type, key)
  if (!effectFns) return
  for (const effectFn of effectFns) {
    if (effectFn === activeEffect) continue
    effectFn()
  }
}

/**
 * 根据 target type key 信息找到对应的依赖集合
 * @param target
 * @param type
 * @param key
 */
function getEffectFn(target, type, key) {
  const propMap = targetMap.get(target)
  if (!propMap) return
  //   如果是新增或者删除，会涉及到触发额外的迭代
  const keys = [key]
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_KEY)
  }

  const effectFns = new Set() // 存储依赖的函数

  for (const key of keys) {
    const typeMap = propMap.get(key)
    if (!typeMap) continue

    const trackTypes = triggerTypeMap[type]
    for (const trackType of trackTypes) {
      const dep = typeMap.get(trackType)
      if (!dep) continue
      for (const effectFn of dep) {
        effectFns.add(effectFn)
      }
    }
  }
  return effectFns
}
export { trigger }
