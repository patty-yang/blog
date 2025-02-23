# 🎯 防抖函数（Debounce）

## 🎨 功能特点

- 延迟执行：等待指定时间后才执行函数
- 重置计时：在等待期间如有新的调用则重新计时
- 保留上下文：正确绑定 this 和参数

## ⚡️ 核心实现

```javascript
const debounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```
