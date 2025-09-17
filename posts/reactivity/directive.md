---
title: vue 指令
date: 2024-05-05
tags:
  - vue
---

<!-- (packages/runtime-core/helpers/renderList) -->

# Vue 内置指令

> 借助 `vite-plugin-inspect` 工具分析 Vue 的内置指令实现原理

## v-if

Vue 中最基础的条件渲染指令,底层实现对应三元运算符的不同分支处理:

![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503231944642.png)

## v-show

通过切换元素的 CSS display 属性来控制显示和隐藏:

![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503231951251.png)

## v-for

Vue 内部使用 `renderList` 函数来实现列表的循环渲染:

![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503231953143.png)

## v-model

![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503232034344.png)

### v-model 的不同使用场景

1. **输入框绑定**

   - 自动转换为 `onUpdate:modelValue` 事件处理
   - 实现双向绑定:
     - 输入框的 `value` 与 `$setup.inputValue` 建立关联
     - 当 `$setup.inputValue` 发生变化时触发重新渲染

2. **组件绑定**

   - 自动向子组件注入两属性:
     - `modelValue`: 数据属性
     - `onUpdate:modelValue`: 更新事件处理器

3. **具名 v-model 绑定**
   - 使用语法: `v-model:title`
   - 自动注入的属性:
     - `title`: 自定义数据属性
     - `onUpdate:title`: 对应的更新事件

## v-bind

将响应式数据动态绑定到元素属性上,当数据变化时会触发重新渲染:

![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503231959034.png)

## v-on

![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503232002063.png)
