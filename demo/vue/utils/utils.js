export const isObject = (target) => {
  return typeof target === 'object' && target !== null
}

/**
 * 对比两个值是否发生改变
 */
export const hasChanged = (oldV, newV) => {
  return !Object.is(oldV, newV)
}
