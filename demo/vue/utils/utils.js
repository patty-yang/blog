// export const isObject = (target) => {
//   return typeof target === 'object' && target !== null
// }
//
// /**
//  * 对比两个值是否发生改变
//  */
// export const hasChanged = (oldV, newV) => {
//   return !Object.is(oldV, newV)
// }


// AI 优化 __
/**
 * 类型判断工具集
 */
export const TypeUtils = {
  /**
   * 判断是否为对象
   * @param {*} value - 要检查的值
   * @returns {boolean}
   */
  isObject(value) {
    return value !== null && typeof value === 'object'
  },

  /**
   * 判断是否为函数
   * @param {*} value - 要检查的值
   * @returns {boolean}
   */
  isFunction(value) {
    return typeof value === 'function'
  },

  /**
   * 判断是否为数组
   * @param {*} value - 要检查的值
   * @returns {boolean}
   */
  isArray(value) {
    return Array.isArray(value)
  }
}

/**
 * 值比较工具集
 */
export const CompareUtils = {
  /**
   * 检查值是否发生变化
   * @param {*} oldValue - 旧值
   * @param {*} newValue - 新值
   * @returns {boolean}
   */
  hasChanged(oldValue, newValue) {
    return !Object.is(oldValue, newValue)
  }
}

export const { isObject } = TypeUtils
export const { hasChanged } = CompareUtils

