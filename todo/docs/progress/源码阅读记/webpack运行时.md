## webpack 运行时

```js
1. 定义一个 __webpack_modules__ 数组
2. 定义一个 __webpack_module_cache__ 缓存对象
3. 实现了 __webpack_require__ 模块加载器，
并利用__webpack_module_cache__ __webpack_modules__ 数组中取模块对应的结果进行缓存
4. 通过自执行函数运行入口模块（0）
```

```js
var __webpack_modules__ = [
  (module) => {
    module.exports = (...args) => args.reduce((x, y) => x + y, 0)
  },
  (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
    const sum = __webpack_require__(/*! ./sum.js */ 1)

    console.log(sum(2, 8))
  }
]
var __webpack_module_cache__ = {}

// The require function
function __webpack_require__(moduleId) {
  // Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId]
  if (cachedModule !== undefined) {
    return cachedModule.exports
  }
  // Create a new module (and put it into the cache)
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {}
  })

  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

  // Return the exports of the module
  return module.exports
}

var __webpack_exports__ = {}
;(() => {
  const other = __webpack_require__(/*! ./other */ 2)
  console.log(sum(3, 8))
})()
```
