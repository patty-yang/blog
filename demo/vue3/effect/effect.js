/**
 * 对象的映射关系
 * @type {WeakMap<object, Map<string | symbol, Set<Function>>>}
 */
export const targetMap = new WeakMap()

export let activeEffect = undefined

/**
 * 副作用函数栈，用于处理嵌套effect的情况
 * @type {Function[]}
 */
const effectStack = []

export function effect(fn, options = {}) {
  const { lazy } = options
  const environment = () => {
    try {
      activeEffect = environment
      effectStack.push(environment)
      cleanup(environment)
      return fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  environment.deps = [] // 记录该环境函数在哪些集合中使用
  environment.options = options

  if (!lazy) {
    environment()
  }
  return environment
}

export function cleanup(environment) {
  //   之前已经将 environment.deps = [] 记录了这个环境函数在哪些集合中使用
  let deps = environment.deps // 当前环境函数的依赖数组
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment)
    })
    deps.length = 0
  }
}
