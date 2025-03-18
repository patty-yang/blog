import handle from './behover/index.js'

/**
 * 将原始对象转换为 proxy 对象
 * @param target 原始对象
 */
function reactive(target) {
  return new Proxy(target, handle)
}

export { reactive }
