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