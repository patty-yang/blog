/**
 * 对象的映射关系
 * @type {WeakMap<WeakKey, any>}
 */
export const targetMap = new WeakMap()

export let activeEffect = undefined

const effectStack = []

export function effect(fn) {
  const environment = () => {
    try {
      activeEffect = environment
      // 模拟真实的函数栈
      effectStack.push(environment)
      cleanup(environment)
      return fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  environment.deps = [] // 记录该环境函数在哪些集合中使用
  environment()
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
