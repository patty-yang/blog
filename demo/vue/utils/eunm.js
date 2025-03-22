/**
 * 依赖收集的操作类型
 * @type {{GET: string}}
 */
export const TrackOpTypes = Object.freeze({
  GET: 'get',
  HAS: 'has',
  ITERATE: 'iterate'
})

export const TriggerOpTypes = Object.freeze({
  SET: 'set',
  ADD: 'add',
  DELETE: 'delete'
})

/**
 *
 * @type {Readonly<{RAW: symbol, ITERATE_KEY: symbol}>}
 */
const Symbols = Object.freeze({
  // 特殊标识，表明是否需要原始对象
  RAW: Symbol('raw'),
  ITERATE_KEY: Symbol('iterate')
})
// export const RAW = Symbol('raw')

// export const ITERATE_KEY = Symbol('iterate')

export const { RAW, ITERATE_KEY } = Symbols
// 根据获取的行为建立对应的映射关系
/**
 * GET
 * HAS
 * ITERATE
 */

export const triggerTypeMap = Object.freeze({
  [TriggerOpTypes.SET]: [TrackOpTypes.GET],
  [TriggerOpTypes.ADD]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS
  ],
  [TriggerOpTypes.DELETE]: [
    TrackOpTypes.GET,
    TrackOpTypes.ITERATE,
    TrackOpTypes.HAS
  ]
})
