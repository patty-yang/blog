/**
 *
 * @param target 原始对象
 * @param type 操作类型
 * @param key 操作的属性
 */
function trigger(target, type, key) {
  console.log(
    '需要更新 依赖 ',
    `原始对象为:${target},操作是:${type},属性值为:${key}`
  )
}

export { trigger }
