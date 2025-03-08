## 🔍 Set 集合

## 📌 1. 参数可以传可以不传，但传递的必须是一个可迭代对象

```js
class MySet { // [!code ++]
    constructor(iderator = []) { // [!code ++]
        if (typeof iderator[Symbol.iterator] !== 'function') { // [!code ++]
            throw new TypeError(iderator + ' is not iterable'); // [!code ++]
        } // [!code ++]
    } // [!code ++]
} // [!code ++]
```

## 🔄 2. 迭代每一个可迭代对象

```js
class MySet {
    constructor(iderator = []) {
        if (typeof iderator[Symbol.iterator] !== 'function') {
            throw new TypeError(iderator + ' is not iterable');
        }

        this._data = [] // [!code ++]
        for (let item of iderator) {  // [!code ++]
            this.add(item) // [!code ++]
        } // [!code ++]
    }

    add(value) { // [!code ++]
        this._data.push(value) // [!code ++]
    } // [!code ++]
}  
```
## 🎯 3.  set 不会重复

```js
class MySet {
    constructor(iderator = []) {
        if (typeof iderator[Symbol.iterator] !== 'function') {
            throw new TypeError(iderator + ' is not iterable');
        }

        this._data = []
        for (let item of iderator) {
            this.add(item)
        }
    }

    add(value) {
        if (this.has(value)) return  // [!code ++]
        this._data.push(value)
    }

    has(value) { // [!code ++]
        return this._datas.some(data => this.isEquals(data, value))  // [!code ++]
    } // [!code ++]

    isEquals(value1, value2) { // [!code ++]
        if (value1 === 0 && value2 === 0) { // [!code ++]
            return true // [!code ++]
        } // [!code ++]
        return Object.is(value1, value2) // [!code ++]
    } // [!code ++]
}  
```
## ❌ 4. 删除

```js
class MySet {
    constructor(iderator = []) {
        if (typeof iderator[Symbol.iterator] !== 'function') {
            throw new TypeError(iderator + ' is not iterable');
        }

        this._data = []
        for (let item of iderator) {
            this.add(item)
        }
    }

    add(value) {
        if (this.has(value)) return
        this._data.push(value)
    }

    has(value) {
        return this._datas.some(data => this.isEquals(data, value))
    }

    delete(data) { // [!code ++]
        const initialLength = this._datas.length // [!code ++]
        this._datas = this._datas.filter(item => !this.isEquals(item, data)) // [!code ++]
        return this._datas.length < initialLength // [!code ++]
    } // [!code ++]

    clear() { // [!code ++]
        this._datas = [] // [!code ++]
    } // [!code ++]

    isEquals(value1, value2) {
        if (value1 === 0 && value2 === 0) {
            return true
        }
        return Object.is(value1, value2)
    }
}  
```

## ⚠️ 5. 遍历 -> 不是一个可迭代对象

```js
class MySet {
    constructor(iderator = []) {
        if (typeof iderator[Symbol.iterator] !== 'function') {
            throw new TypeError(iderator + ' is not iterable');
        }

        this._data = []
        for (let item of iderator) {
            this.add(item)
        }
    }

    add(value) {
        if (this.has(value)) return
        this._data.push(value)
    }

    has(value) {
        return this._datas.some(data => this.isEquals(data, value))
    }

    delete(data) {
        const initialLength = this._datas.length
        this._datas = this._datas.filter(item => !this.isEquals(item, data))
        return this._datas.length < initialLength
    }

    clear() {
        this._datas = []
    }

    * [Symbol.iterator]() { // [!code ++]
        for (const data of this._datas) { // [!code ++]
            yield data // [!code ++]
        } // [!code ++]
    } // [!code ++]

    forEach(cb) { // [!code ++]
        for (const item of this._datas) { // [!code ++]
            cb(item, item, this) // [!code ++]
        } // [!code ++]
    } // [!code ++]
    

    isEquals(value1, value2) {
        if (value1 === 0 && value2 === 0) {
            return true
        }
        return Object.is(value1, value2)
    }
}  
```