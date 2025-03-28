# React

## React 重要版本更新历程 🚀

### React 16 - Fiber 架构重构

- 🔄 全新的调度算法

- ⚡️ 更新过程可中断

- 🎯 任务分片执行

- ⭐️ 优先级调度机制

### React 16.8 - Hooks

- 🎣 全新的 Hooks API

- 🔄 类组件到函数式组件的转变

### React 17 - 平稳过渡

- 🌉 架构升级的过渡版本

### React 18 - 新特性集锦

- ⚡️ Transition

- 🎭 Suspense

- 🎣 新 Hooks

- 🎪 Offscreen 渲染

- ✨ ...

## JSX 核心规则 🎨

### 基础语法规则

- 📦 **单一根元素**: JSX 必须有且仅有一个根元素

- 🔄 **表达式语法**: 使用花括号 `{}` 嵌入 JavaScript 表达式

- 🎯 **类名定义**: HTML 的 `class` 属性需要写为 `className`

- 📝 **数组处理**: 支持数组自动展开，常用 `map` 方法渲染列表

## setState 状态管理 🔄

### 异步更新机制

- 🔄 **事件处理中的异步性**: 在 HTML 元素事件处理函数中，`setState` 表现为异步

- ⚠️ **状态可靠性原则**: 永远将 `setState` 视为异步操作，不要依赖调用后的立即状态

### 最佳实践

- 🎯 **获取更新后的状态**:

```js
setState(newState, () => {})
```

- 📊 **基于之前状态的更新**:

```js
setState((prevState) => ({
  counter: prevState.counter + 1
}))
```

### 批量更新策略

- 🔄 **合并机制**: React 会智能地将多个 `setState` 调用合并处理

- ⚡️ **性能优化**: 等待所有状态更新完成后，统一触发一次 render

- 🎨 **渲染效率**: 避免频繁重渲染，提升应用性能

## 生命周期

```text
// 只记得这么些了
constructor
render
componentDidMount
componentDidUpdate
componentWillUnMount
```

## Hooks 🎣

### 解决的核心问题 🎯

- 🌀 简化复杂的生命周期管理
- 🎭 消除 this 指向困扰
- 🔄 从类组件到函数组件的优雅转变

### 编程范式转换 🚀：从**面向对象**迈向**函数式编程**。

这次转变带来了一些重要的函数式编程概念：

- 🧪 **纯函数** - 相同输入永远返回相同输出
- 🔄 **副作用** - 与外部世界交互的操作
- 🎯 **柯里化** - 将多参数函数转换为单参数函数序列
- ⚡️ **高阶函数** - 以函数为参数或返回值的函数


#### 内置 hook
- useState 
- useEffect 

