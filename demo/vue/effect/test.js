const data = {
  a: 1,
  b: 2,
  c: 3
}

const depsMap = new Map()
let activeEffect = null
const effectStack = []
const state = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    const result = Reflect.set(target, key, value)
    trigger(target, key, value) // 然后触发依赖
    return result
  }
})

function track(target, key) {
  if (activeEffect) {
    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, (deps = new Set()))
    }
    activeEffect.deps.push(deps)
    deps.add(activeEffect)
  }
}

function trigger(target, key, value) {
  const deps = depsMap.get(key)
  if (deps) {
    const effectsTorun = new Set(deps)
    effectsTorun.forEach((effect) => {
      effect()
    })
  }
}

function cleanup(environment) {
  //   之前已经将 environment.deps = [] 记录了这个环境函数在哪些集合中使用
  let deps = environment.deps // 当前环境函数的依赖数组
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment)
      if (dep.size === 0) {
        for (let [key, value] of depsMap) {
          if (value === dep) {
            depsMap.delete(key)
          }
        }
      }
    })
    deps.length = 0
  }
}

function effect(fn) {
  const environment = () => {
    activeEffect = environment
    // 模拟真实的函数栈
    effectStack.push(environment)
    cleanup(environment)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length-1]
    // activeEffect = null
  }
  environment.deps = [] // 记录该环境函数在哪些集合中使用
  environment()
}

// effect(() => {
//   console.log('effect1 函数执行了')
//   state.name
// })

// effect(() => {
//   console.log('effect2 函数执行了')
//   state.name
// })

// state.name = 100
// 1. 在 effect 执行的时候使用 activeEffect 记录下当前函数
// 2. 建立访问的数据与函数之间的依赖关系, let depsMap = new Map()
// 3. 一个数据可能有多个函数与之对应，所以使用 set 集合来存储

// 问题1. 修改后依赖错误
// 问题原因: 第一次建立依赖关系的时候，是将依赖函数存储为 activeEffect，最终是通过 activeEffect 将依赖函数添加到依赖列表中
// 在依赖函数执行完成后, activeEffect 就重置为 null，之后 a 属性发生变化，重新运行的是回掉函数，但是 activeEffect 的依然是null，导致 track中依赖收集的判断一直进不去
// 修改方式: 不仅仅收集回掉函数，而是收集这个环境函数
// 问题1.1 旧的依赖没有删除
// 修改方式: cleanup() 在环境函数上增加deps = [] 在读取依赖的时候将对应的依赖集合给添加，在更新时清理依赖然后重新运行

//
// effect(() => {
//   console.log('effect 函数执行了')
//   if (state.a === 1) {
//     return state.b
//   } else {
//     return state.c
//   }
// })
//
// state.a = 100

// ✅
// effect(() => {
//   if(state.a === 1 ) {
//     state.b
//   }else {
//     state.c
//   }
//   console.log('函数 1 执行')
// })
//
// effect(() => {
//   console.log(state.c)
//   console.log('函数 2 执行')
// })
// state.a =20
// console.log('depsMap', depsMap)

// 无限循环的问题
// 原因分析
// 在 track 函数中，每次访问 a 的时候，都会把当前的 activeEffect添加到依赖集合中。
// 在 trigger 函数中，当 state.a 被修改的时候，会触发所有依赖 state.a 的 effect 函数。这些 effect 函数又会重新访问 start.a 导致了无限循环

// 解决方式: 复制一份集合
// effect(() => {
//   if (state.a === 1) {
//     state.b
//   } else {
//     state.c
//   }
//   console.log('函数 1 执行')
// })
//
// effect(() => {
//   console.log(state.a)
//   console.log(state.c)
//   console.log('函数 2 执行')
// })
//
// state.a = 2

// 问题: 嵌套不能收集到的问题
// 一旦嵌套的函数执行完毕，之后的依赖都收集不到
// 原因分析，函数栈有问题，模拟一个栈
// 解决方式:
effect(() => {
  effect(() =>{
    effect(() => {
      state.c
    })
  })
  state.b
  state.a
})

console.log(depsMap)
