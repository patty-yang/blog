import { effect } from './effect.js'
import { track } from './track.js'
import { trigger } from './trigger.js'
import { TrackOpTypes, TriggerOpTypes } from '../utils/eunm.js'

function computed(getterOrOptions) {
  const { get, set } = normalizeParam(getterOrOptions)

  let value = undefined
  let dirty = true
  const effectFn = effect(get, {
    lazy: true,
    scheduler: () => {
      dirty = true
      trigger(obj, TriggerOpTypes.SET, 'value')
    }
  })
  const obj = {
    get value() {
      track(obj, TrackOpTypes.GET, 'value')
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      return value
    },
    set value(newValue) {
      set(newValue)
    }
  }

  return obj
}

function normalizeParam(getterOrOptions) {
  if (typeof getterOrOptions === 'function') {
    return {
      get: getterOrOptions,
      set: () => {
        console.warn('computed value must be readonly')
      }
    }
  }

  return {
    get: getterOrOptions.get,
    set: getterOrOptions.set
  }
}

export { computed }
