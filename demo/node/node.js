setImmediate(() => {
  console.log(1)
})

process.nextTick(() => {
  console.log(2)
  process.nextTick(() => {
    console.log(6)
  })
})

console.log(3)

Promise.resolve().then(() => {
  console.log(4)
  process.nextTick(() => {
    console.log(5)
  })
})

// timers  poll check

/**
 * 数据库
 *
 *
 * 关系型数据库
  特点: 表和表的关联构成的数据结构
  优点: 能够表达复杂的数据关系、能精确查找到想要的数据
  缺点: 读写性能较差，尤其是海量数据的读写
        数据结构比较死板

  * 非关系型数据库
 */
