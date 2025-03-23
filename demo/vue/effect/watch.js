import { effect, cleanup } from './effect.js'
// 当传递的响应式数据发生变化，重写执行回掉函数。回掉函数传入新的值和旧值
// immediate once flush -> Post(在watch回掉中能访问呗 vue 更新之后的所属主见的dom)、sync(在 vue 运行任何更新之前触发)
// 返回一个函数，用来停止更新

/**
 *
 * @param {*} source 响应式数据、或者getter函数 （数组的情况暂时不考虑）
 * @param {*} cb 执行的回掉函数
 * @param {*} options
 */
function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source // () => state.a
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue // 旧值和新值

  const job = () => {
    newValue = effectFn()
    cb(newValue, oldValue)
    oldValue = newValue
  }
  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: job
  })

  if (options.immediate) {
    job()
  } else {
    effectFn()
  }

  return () => {
    cleanup(effectFn)
  }
}

/**
 *
 * 遍历对象的所有属性，包括嵌套对象的属性, 为了触发这些属性的依赖收集
 *
 * @param {*} value
 * @param {*} seen
 * @returns
 */
function traverse(value, seen = new Set()) {
  // 检查值是否为对象，且未被访问过
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    return value
  }
  seen.add(value)

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen)
    }
  } else {
    for (const key in value) {
      traverse(value[key], seen)
    }
  }
  return value
}

export { watch }
