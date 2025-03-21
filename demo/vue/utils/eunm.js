/**
 * 依赖收集的操作类型
 * @type {{GET: string}}
 */
export const TrackOpTypes = {
  GET: 'get',
  HAS: 'has',
  ITERATE: 'iterate'
}

export const TriggerOpTypes = {
  SET: 'set',
  ADD: 'add',
  DELETE: 'delete'
}

/**
 *
 * @type {symbol} 特殊标识，表明是否需要原始对象
 */
export const RAW = Symbol('raw')

export const ITERATE_KEY = Symbol('iterate')

// 根据获取的行为建立对应的映射关系
/**
 * GET
 * HAS
 * ITERATE
 */

export const triggerTypeMap = {
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
}
