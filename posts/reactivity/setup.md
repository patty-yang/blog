---
title: vue setup
date: 2024-05-04
tags:
  - vue
---


## setup 语法糖

<!--
减少了 return {}
更好的类型推断
 -->

`<script setup>` 语法糖，通过简化组件编写方式来提升开发效率。在编译阶段，这些代码会被自动转换为标准的 Composition API 形式。

不仅让代码更加简洁优雅，还有以下优势：

- 更少的样板代码
- 更完善的 TypeScript 类型推导
- 更直观的代码组织方式
- ...

> 虽然 `<script setup>` 是一种语法糖，但它与普通的 Composition API 在某些特性上仍有差异，比如 `expose`

- ![image](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503232106789.png)
  传统的 composition api 默认会抛出所有的变量，而 `<script setup>` 不会。只有手动 expose 才会抛出。
