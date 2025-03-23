import handle from './behover/index.js'
import { isObject } from './utils/utils.js'

const proxyMap = new WeakMap()
/**
 * 将原始对象转换为 proxy 对象
 * @param target 原始对象
 */
function reactive(target) {
  // 如果不是对象的话 直接返回
  if (!isObject(target)) return target
  // 如果已经代理过了，返回代理对象，所以增加一个map存储原始对象和代理对象的映射关系
  if (proxyMap.has(target)) {
    return proxyMap.get(target)
  }
  const proxy = new Proxy(target, handle)
  proxyMap.set(target, proxy)
  return proxy
}

export { reactive }
