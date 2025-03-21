<!-- ## 顺序


[实现响应式](响应式_01)


[响应式中的 effect](响应式_02). reference: [antfu](https://antfu.me/posts/binfe-2020-zh)


[最终版](响应式_03)


[computed](computed) -->

## 实现响应式

Referer: [antfu](https://antfu.me/posts/binfe-2020-zh)

Referer: [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy#%E6%96%B9%E6%B3%95)

- 第一步需要监测对象的读写
  - 读
    - 属性获取
    - 遍历
    - 是否存在某属性
  - 写
    - 属性设置
    - 新增
    - 删除
- 第二步需要建立数据与函数之间的映射关系



