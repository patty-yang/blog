import { effect } from './effect.js'
import { track } from './track.js'
import { trigger } from './trigger.js'
import { TrackOpTypes, TriggerOpTypes } from '../utils/eunm.js'

// function computed(getterOrOptions) {
//   const { get, set } = normalizeParam(getterOrOptions)
//
//   let value = undefined
//   let dirty = true
//   const effectFn = effect(get, {
//     lazy: true,
//     scheduler: () => {
//       dirty = true
//       trigger(obj, TriggerOpTypes.SET, 'value')
//     }
//   })
//   const obj = {
//     get value() {
//       track(obj, TrackOpTypes.GET, 'value')
//       if (dirty) {
//         value = effectFn()
//         dirty = false
//       }
//       return value
//     },
//     set value(newValue) {
//       set(newValue)
//     }
//   }
//
//   return obj
// }
//
// function normalizeParam(getterOrOptions) {
//   if (typeof getterOrOptions === 'function') {
//     return {
//       get: getterOrOptions,
//       set: () => {
//         console.warn('computed value must be readonly')
//       }
//     }
//   }
//
//   return {
//     get: getterOrOptions.get,
//     set: getterOrOptions.set
//   }
// }

// AI 扩展
/**
 *
 * 实现计算属性功能
 * @param {Function|Object} getterOrOptions - 可以是一个getter函数或包含get/set的配置对象
 * @returns {Object} 返回一个带有value属性的对象
 */
function computed(getterOrOptions) {
  // 标准化参数，统一返回包含get和set方法的对象
  const { get, set } = normalizeParam(getterOrOptions)

  // 创建一个对象存储计算属性的内部状态
  const obj = {
    _value: undefined, // 缓存计算结果
    _dirty: true, // 标记是否需要重新计算，true表示需要重新计算
    effect: effect(get, {
      // 创建响应式效果
      lazy: true, // 懒执行，首次不立即执行
      scheduler: () => {
        // 调度器，当依赖发生变化时触发
        if (!obj._dirty) {
          // 如果当前不是脏的，才需要设置为脏
          obj._dirty = true
          // 触发value的setter，通知订阅者数据发生变化
          trigger(obj, TriggerOpTypes.SET, 'value')
        }
      }
    })
  }

  // 获取计算结果的函数
  const getter = () => {
    if (obj._dirty) {
      // 只有脏的时候才重新计算
      obj._value = obj.effect() // 执行effect函数获取新值
      obj._dirty = false // 计算完成后标记为干净
    }
  }

  // 返回一个带有getter和setter的对象
  return {
    get value() {
      getter() // 获取最新值
      // 如果在一个函数中使用 计算属性，手动收集依赖
      track(obj, TrackOpTypes.GET, 'value') // 收集依赖
      return obj._value // 返回计算结果
    },
    set value(newValue) {
      set(newValue) // 调用用户提供的setter
    }
  }
}

/**
 * 标准化参数处理函数
 * @param {Function|Object} options - 输入参数
 * @returns {Object} 返回标准化后的get和set方法
 */
function normalizeParam(options) {
  if (typeof options === 'function') {
    // 如果是函数，将其作为getter，提供空的setter
    return {
      get: options,
      set: () => {}
    }
  } else {
    // 如果是对象，直接返回其get和set方法
    return {
      get: options.get,
      set: options.set
    }
  }
}
export { computed }
