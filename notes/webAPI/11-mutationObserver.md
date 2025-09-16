---
title: MutationObserver - 监听 DOM 变化的利器
date: 2021-09-15
tags:
  - js
---

MutationObserver 是一个强大的 Web API，它允许我们监听 DOM 树的变化，包括节点的添加、删除、属性的修改等。

```js
const observer = new MutationObserver((mutationsList) => {
  console.log(mutationsList)
})

observer.observer(document.body, {
  // attributes: true, // 目标属性的变化 如: id class
  // characterData: true, // 目标数据的变化 改变前的值
  // childList: true, // 值观察目标子节点的变化，不包含子节点后代的元素
  // subtree: true, // 目标及其后代元素都会观察
  // attributeOldValue: true, // 需要记录改变前的目标属性值
})
```

<!-- ### 主要特点 ✨

- 异步执行，性能更好
- 批量处理 DOM 变化
- 可以监听多种 DOM 变化类型
- 支持子树观察

### 使用场景 🎯

- 编辑器实时预览
- 表单自动保存
- 动态内容加载监控
- 第三方内容注入检测

这个强大的观察者模式让我们能够更优雅地处理 DOM 变化，是现代 Web 开发中不可或缺的工具。 -->
