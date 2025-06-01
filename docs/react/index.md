# React

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

## HOC (Higher-Order Components) 🔄

- 🎯 早期 React 解决类组件代码复用的方式
- 🔄 接收一个组件作为参数并返回一个新的组件

### 错误处理

- 🚨 **getDerivedStateFromError**
  - 时机：子组件错误发生后，渲染前捕获
  - 作用：返回新状态用于降级 UI 展示
- ⚠️ **componentDidCatch**
  - 时机：子组件错误发生后，渲染后执行
  - 作用：记录错误信息，执行副作用

## react 中的虚拟 dom

- 在 react 中通过 jsx 来描述 UI，最终会被转为 createElement 方法的调用，调用后会得到虚拟 dom 对象

```js
/**
 *
 * @param {*} type 元素类型 h1
 * @param {*} config 属性对象 {id : "aa"}
 * @param {*} children 子元素 hello
 * @returns
 * <h1 id="aa">hello</h1>
 */
export function createElement(type, config, children) {
  let propName

  const props = {}

  let key = null
  let ref = null
  let self = null
  let source = null

  // 说明有属性
  if (config != null) {
    // ...
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName]
      }
    }
  }
  // 经历了上面的 if 之后，所有的属性都放到了 props 对象上面
  // props ==> {id : "aa"}

  // children 可以有多个参数，这些参数被转移到新分配的 props 对象上
  // 如果是多个子元素，对应的是一个数组
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    props.children = children
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    // ...
    props.children = childArray
  }

  // 添加默认的 props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }
  // ...
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  )
}

const ReactElement = function (type, key, ref, self, source, owner, props) {
  // 该对象就是最终向外部返回的 vdom（也就是用来描述 DOM 层次结构的 JS 对象）
  const element = {
    // 让我们能够唯一地将其标识为 React 元素
    $$typeof: REACT_ELEMENT_TYPE,

    // 元素的内置属性
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 记录负责创建此元素的组件。
    _owner: owner
  }
  // ...
  return element
}
```
