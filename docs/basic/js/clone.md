## 浅拷贝

- concat
  - 如果数组元素是基本类型，会拷贝一份互不影响
  - 如果是对象或者是数组，只会拷贝数组和对象的引用，这样无论是修改新旧值，都会发生变化
- slice
- Object.assign()
  - 只能拷贝对象的一级对象
- ... 扩展运算符

## 深拷贝

```js
function deepClone(obj = {}) {
  // 如果 obj 对象 则不需要拷贝
  if (typeof obj !== 'object') {
    return obj
  }
  let result
  //   判断 obj 是数组还是对象，创建对应的元素作为克隆对象
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (let key in obj) {
    // 确保支付制对象自身的属性，不包括原型链上的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用，为了深度复制对象的属性或者数组之中的元素
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
```
