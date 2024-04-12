## 什么是 BFC

`BFC(块级格式上下文)` 拥有一个自己布局规则的容器，其内部的布局不受外部的影响。

## 创建 BFC 的条件

- 元素设置浮动 `float`
- 元素设置定位 position: `absolute、fixed`
- 元素设置 display : `inline-block、flex`
- 元素设置 overflow : `hidden、auto、scroll`

## BFC 容器特点

- 垂直方向上，自上而下排列
- 相邻两个容器的 margin
- 计算 BFC 高度时，会把浮动元素也计算
- 容器不会和浮动容器发生重叠
- 内部元素不会影响到外部元素
- 每个元素左 margin 与容器的左 border 相接触
