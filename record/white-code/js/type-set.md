## Set 数据结构的实现

```js
class MySet {
  constructor(iterator = []) {
    // 传递的值是否是可迭代对象
    if (typeof iterator[Symbol.iterator] !== 'function') {
      throw new TypeError(
        `${iterator} is not iterable (cannot read property Symbol(Symbol.iterator))`
      )
    }
    this._datas = []
    for (const item of iterator) {
      this.add(item)
    }
  }

  add(value) {
    if (this.has(value)) return
    this._datas.push(value)
  }

  has(value) {
    for (const data of this._datas) {
      if (this.isEquals(data, value)) {
        return true
      }
    }
    return false
  }

  isEquals(value1, value2) {
    if (value1 === 0 && value2 === 0) {
      return true
    }
    return Object.is(value1, value2)
  }

  delete(data) {
    for (let i = 0; i < this._datas.length; i++) {
      if (this.isEquals(this._datas[i], data)) {
        this._datas.splice(i, 1)
        return true
      }
    }
    return false
  }
  clear() {
    this._datas = []
  }

  get size() {
    return this._datas.length
  } 
  // [Symbol.iterator]() {
  //     let index = 0
  //     const datas = this._datas
  //     return {
  //         next() {
  //             if(index < datas.length) {
  //                 return {
  //                     value: datas[index++],
  //                     done: false
  //                 }
  //             } else {
  //                 return {
  //                     value: undefined,
  //                     done: true
  //                 }
  //             }
  //         }
  //     }
  // }

  *[Symbol.iterator]() {
    for (const data of this._datas) {
      yield data
    }
  }

  forEach(cb) {
    for (const item of this._datas) {
      cb(item, item, this)
    }
  }
}

const s = new MySet([1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0])

console.log(s)

// s.add(1)
// s.add(11)
// console.log(s)
//
// s.delete(2)
// console.log(s)
//
// s.clear()
// console.log(s)

for (const item of s) {
  console.log(item)
}
```

# Set 数据结构实现思路

## 核心特性

### 基础构造

- Set 作为一个类(Class)实现
- 构造函数支持可选的迭代器参数
  - 无参数时创建空集合
  - 有参数时必须是可迭代对象

### 数据操作

- **添加元素** (add)

  - 自动去重：重复元素将被忽略
  - 返回修改后的 Set 对象

- **查询操作** (has)

  - 检查元素是否存在
  - 返回布尔值

- **删除操作**
  - delete：删除指定元素
  - clear：清空整个集合

### 遍历能力

- 支持 for...of 循环遍历

  - 实现 [Symbol.iterator] 接口
  - 按插入顺序返回元素

- forEach 方法
  - 支持回调函数遍历
  - 参数：(value, value, set)
