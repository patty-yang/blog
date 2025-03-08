# 🗺️ Map 实现

## 1. 🔍 判断传入的参数是否是一个可迭代的对象

```js
class MyMap { // [!code ++]
    constructor(iterable) { // [!code ++]
        if (typeof iterable[Symbol.iterator] !== 'function') { // [!code ++]
            throw new TypeError(`${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`) // [!code ++]
        } // [!code ++]
    } // [!code ++]
} // [!code ++]
```

## 2. 🔄 每次循环的结果也得是一个可迭代对象

```js
class MyMap {
    constructor(iterable) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError(`${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`)
        }
        for (const item of iterable) { // [!code ++]
            //   每一个 item 也得是一个可迭代对象 // [!code ++]
            if (typeof item[Symbol.iterator] !== 'function') { // [!code ++]
                throw new TypeError(`${item} is not iterable (cannot read property Symbol(Symbol.iterator))`) // [!code ++]
            } // [!code ++]
        } // [!code ++]
    }
}
```

## 3. ⚡ 取出每一次的迭代结果

```js


class MyMap {
    constructor(iterable) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError(`${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`)
        }
        for (const item of iterable) {
            //   每一个 item 也得是一个可迭代对象 
            if (typeof item[Symbol.iterator] !== 'function') {
                throw new TypeError(`${item} is not iterable (cannot read property Symbol(Symbol.iterator))`)
            }
            const iterator = item[Symbol.iterator]() // [!code ++]
            const key = iterator.next().value // [!code ++]
            const value = iterator.next().value // [!code ++]
        }
    }
}
```

## 4. 💾 set 操作

```js
class MyMap {
    constructor(iterable) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError(`${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`)
        }
        this._datas = []
        for (const item of iterable) {
            //   每一个 item 也得是一个可迭代对象
            if (typeof item[Symbol.iterator] !== 'function') {
                throw new TypeError(`${item} is not iterable (cannot read property Symbol(Symbol.iterator))`)
            }
            const iterator = item[Symbol.iterator]()
            const key = iterator.next().value
            const value = iterator.next().value
            this.set(key, value) // [!code ++]
        }
    }

    set(key, value) {
        // 如果添加的时候有这个 key 呢? // [!code ++]
        this._datas.push({
            key, // [!code ++]
            value // [!code ++]
        }) // [!code ++]
    }
}
```

## 5. 🔑 set 时存在 key 的情况

```js
class MyMap {
    constructor(iterable) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError(`${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`)
        }
        this._datas = []
        for (const item of iterable) {
            //   每一个 item 也得是一个可迭代对象
            if (typeof item[Symbol.iterator] !== 'function') {
                throw new TypeError(`${item} is not iterable (cannot read property Symbol(Symbol.iterator))`)
            }
            const iterator = item[Symbol.iterator]()
            const key = iterator.next().value
            const value = iterator.next().value
            this.set(key, value)
        }
    }

    set(key, value) {
        //   如果添加的时候有这个 key 呢?  // [!code --]
        if (this.has(key)) { // [!code ++]

        } else {
            this._datas.push({
                key,
                value
            })
        }
    }

    has(key) { // [!code ++]
        for (const item of this._datas) { // [!code ++]
            if (this.isEquals(item.key, key)) { // [!code ++]
                return true // [!code ++]
            } // [!code ++]
            return false // [!code ++]
        }
    }

    isEquals(value1, value2) { // [!code ++]
        if (value1 === 0 && value2 === 0) { // [!code ++]
            return true // [!code ++]
        } // [!code ++]
        return Object.is(value1, value2) // [!code ++]
    } // [!code ++]
}
```

## 6. 🔄 替换 key 对应的 value

```js
class MyMap {
    constructor(iterable) {
        if (typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError(`${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`)
        }
        this._datas = []
        for (const item of iterable) {
            //   每一个 item 也得是一个可迭代对象
            if (typeof item[Symbol.iterator] !== 'function') {
                throw new TypeError(`${item} is not iterable (cannot read property Symbol(Symbol.iterator))`)
            }
            const iterator = item[Symbol.iterator]()
            const key = iterator.next().value
            const value = iterator.next().value
            this.set(key, value)
        }
    }


    set(key, value) {
        if (this.has(key)) {
            const obj = this._getObjectByKey(key) // [!code ++]
            obj.value = value // [!code ++]
        } else {
            this._datas.push({
                key,
                value
            })
        }
    }

    // 根据 key 从数组中找到对应的对象
    _getObjectByKey(key) {// [!code ++]
        return this._datas.find(item => this.isEquals(item.key, key))// [!code ++]
    }// [!code ++]

    has(key) { // [!code ++]
        const item = this._getObjectByKey(key) // [!code ++]
        return !!item // [!code ++]
    } // [!code ++]

    isEquals(value1, value2) {
        if (value1 === 0 && value2 === 0) {
            return true
        }
        return Object.is(value1, value2)
    }
}
```

## 7. 🛠️ 其他方法

```js
class MyMap {
    //   ..... 
    get(key) {
        const item = this._getObjectByKey(key)
        return item ? item.value : undefined
    }

    clear() {
        this._datas.length = 0
    }

    delete(key) {
        const index = this._datas.findIndex(item => this.isEquals(item.key, key))
        if (index !== -1) {
            this._datas.splice(index, 1)
        }
    }


    forEach(cb) {
        for (const item of this._datas) {
            cb(item.value, item.key, this)
        }
    }

    * [Symbol.iterator]() {
        for (const item of this._datas) {
            yield [item.key, item.value]
        }
    }
}
```

