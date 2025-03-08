// // // // 代码输出
// // //
// // // // 1
// // // var foo = { bar: 1 }
// // //
// // // var arr1 = [1, 2, foo]
// // //
// // // var arr2 = arr1.slice(1)
// // //
// // // arr2[0]++
// // // arr2[1].bar++
// // //
// // // foo.bar++
// // //
// // // arr1[2].bar++
// // //
// // // console.log(arr1[1] === arr2[0])
// // // console.log(arr1[2] === arr2[1])
// // // console.log(foo.bar)
// // //
// // // // 引用类型存储的是地址
// // //
// // // // foo: a1
// // // // arr1: a2
// // // // arr2: a3
// // //
// // // // a1: {
// // // //     bar: 4
// // // // }
// // // // a2: {
// // // //     0: 1,
// // // //     1: 2,
// // // //     2: a1
// // // // }
// // // // a3: {
// // // //     0: 3,
// // // //     1: a1
// // // // }
// // //
// // // let obj = new Object()
// // // console.log('🚀 ~ obj:', obj)
// //
// // // const name = 'es6'
// // // const test = 'test'
// // // const text = myTag`Hello,${test}-${name}`
// // // // 有两个插值，就会把字符串拆成三部分
// // // // 也就是说，parts 的长度是 args 的长度 + 1
// // // // text = myTag(['Hello, ', '!'], name) // Hello, es6!
// // // function myTag(parts, ...args) {
// // //     let str = '';
// // //     // 遍历 parts 和 args，拼接字符串
// // //     for (let i = 0; i < parts.length; i++) {
// // //         str += parts[i]; // 添加当前的字符串部分
// // //         if (i < args.length) {
// // //             str += args[i]; // 添加对应的参数
// // //         }
// // //     }
// // //     return str;
// // // }
// // //
// // // console.log(text)
// //
// // // String.raw()
// //
// // // function createFeiboIterator() {
// // //     let prev1 = 1
// // //     let prev2 = 1 // 当前位置的前一位和前两位
// // //     let n = 1 // 当前位置是第几位
// // //
// // //     return {
// // //        next() {
// // //            let value = n <= 2 ? 1 : prev1 + prev2
// // //            prev2 = prev1
// // //            prev1 = value
// // //            n++
// // //            return {
// // //                value,
// // //                done: false
// // //            }
// // //        }
// // //     }
// // // }
// //
// // // function* createFeiboIterator() {
// // //   let prev1 = 1
// // //   let prev2 = 1 // 当前位置的前一位和前两位
// // //   let n = 1 // 当前位置是第几位
// // //
// // //   while (true) {
// // //     if (n <= 2) {
// // //       yield 1
// // //     } else {
// // //       const value = prev1 + prev2
// // //       prev2 = prev1
// // //       prev1 = value
// // //       yield value
// // //     }
// // //     n++
// // //   }
// // // }
// // //
// // // const iterator = createFeiboIterator()
// // // console.log(iterator.next())
// // // console.log(iterator.next())
// // // console.log(iterator.next())
// // // console.log(iterator.next())
// // // console.log(iterator.next())
// //
// // // function *test(){
// // //     let info = yield 1
// // //     console.log(info, 'info')
// // //     yield 2 + info
// // //     console.log(info)
// // // }
// // //
// // // const generator = test()
// // // console.log(generator.next())
// // // console.log(generator.next(333))
// //
// // // function *test(){
// // //     yield 'a'
// // //     yield 'b'
// // // }
// // //
// // // function *test2(){
// // //     yield *test()
// // //     yield 1
// // //     yield 2
// // //     yield 3
// // // }
// // //
// // // const t = test()
// // // console.log(t.return('123'))
// // // console.log(t.throw('this is error'))
// //
// // // const obj = {
// // //     name: 1,
// // //     path: '1231323'
// // // }
// // //
// // //
// // // const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
// // //
// // // const file = new File([blob], 'test.json', { type: 'application/json' })
// //
// // // const arr1 = [33, 22, 55, 33, 11, 33, 5]
// // // const arr2 = [22, 55, 77, 88, 88, 99, 99]
// // //
// // // const arr = [...new Set([...arr1, ...arr2])]
// // // console.log('🚀 ~ 并集:', arr)
// // //
// // // const s = new Set(arr1)
// // // const arr3 = arr2.filter((item) => s.has(item))
// // // console.log('🚀 ~ 交集:', arr3)
// // //
// // // const arr4 = [...new Set([...arr1, ...arr2].filter((item) => arr1.includes(item) !== arr2.includes(item)))]
// // //
// // // console.log('🚀 ~ 差集:', arr4)
// //
// class MySet {
//   constructor(iterator = []) {
//     // 传递的值是否是可迭代对象
//     if (typeof iterator[Symbol.iterator] !== 'function') {
//       throw new TypeError(
//         `${iterator} is not iterable (cannot read property Symbol(Symbol.iterator))`
//       )
//     }
//     this._datas = []
//     for (const item of iterator) {
//       this.add(item)
//     }
//   }
//
//   add(value) {
//     if (this.has(value)) return
//     this._datas.push(value)
//   }
//
//   has(value) {
//     for (const data of this._datas) {
//       if (this.isEquals(data, value)) {
//         return true
//       }
//     }
//     return false
//   }
//
//   isEquals(value1, value2) {
//     if (value1 === 0 && value2 === 0) {
//       return true
//     }
//     return Object.is(value1, value2)
//   }
//
//   delete(data) {
//     const initialLength = this._datas.length;
//     this._datas = this._datas.filter(item => !this.isEquals(item, data));
//     return this._datas.length < initialLength;
//   }
//
//   clear() {
//     this._datas.length = 0
//   }
//
//   // [Symbol.iterator]() {
//   //     let index = 0
//   //     const datas = this._datas
//   //     return {
//   //         next() {
//   //             if(index < datas.length) {
//   //                 return {
//   //                     value: datas[index++],
//   //                     done: false
//   //                 }
//   //             } else {
//   //                 return {
//   //                     value: undefined,
//   //                     done: true
//   //                 }
//   //             }
//   //         }
//   //     }
//   // }
//
//   *[Symbol.iterator]() {
//     for (const data of this._datas) {
//       yield data
//     }
//   }
//
//   forEach(cb) {
//     for (const item of this._datas) {
//       cb(item, item, this)
//     }
//   }
// }
//
// const s = new MySet([1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0])
//
// // console.log(s)
//
// s.add(1)
// s.add(11)
// // console.log(s)
//
// s.delete(2)
// // console.log(s)
//
// s.clear()
// console.log(s)
// //
// // for (const item of s) {
// //   console.log(item)
// // }
// //
// // class MyMap {
// //   constructor(iterable) {
// //     if (typeof iterable[Symbol.iterator] !== 'function') {
// //       throw new TypeError(
// //         `${iterable} is not iterable (cannot read property Symbol(Symbol.iterator))`
// //       )
// //     }
// //     this._datas = []
// //     for (const item of iterable) {
// //       //   每一个 item 也得是一个可迭代对象
// //       if (typeof item[Symbol.iterator] !== 'function') {
// //         throw new TypeError(
// //           `${item} is not iterable (cannot read property Symbol(Symbol.iterator))`
// //         )
// //       }
// //       const iterator = item[Symbol.iterator]()
// //       const key = iterator.next().value
// //       const value = iterator.next().value
// //       this.set(key, value)
// //     }
// //   }
// //
// //   set(key, value) {
// //     if (this.has(key)) {
// //       const obj = this._getObjectByKey(key)
// //       obj.value = value
// //     } else {
// //       this._datas.push({
// //         key,
// //         value
// //       })
// //     }
// //   }
// //
// //   // 根据 key 从数组中找到对应的对象
// //   _getObjectByKey(key) {
// //     return this._datas.find((item) => this.isEquals(item.key, key))
// //   }
// //
// //   get(key) {
// //     const item = this._getObjectByKey(key)
// //     return item ? item.value : undefined
// //   }
// //
// //   size() {
// //     return this._datas.length
// //   }
// //
// //   clear() {
// //     this._datas.length = 0
// //   }
// //
// //   delete(key) {
// //     const index = this._datas.findIndex((item) => this.isEquals(item.key, key))
// //     if (index !== -1) {
// //       this._datas.splice(index, 1)
// //     }
// //   }
// //
// //   has(key) {
// //     const item = this._getObjectByKey(key)
// //     return !!item
// //   }
// //
// //   isEquals(value1, value2) {
// //     if (value1 === 0 && value2 === 0) {
// //       return true
// //     }
// //     return Object.is(value1, value2)
// //   }
// //
// //   forEach(cb) {
// //     for (const item of this._datas) {
// //       cb(item.value, item.key, this)
// //     }
// //   }
// //
// //   *[Symbol.iterator]() {
// //     for (const item of this._datas) {
// //       yield [item.key, item.value]
// //     }
// //   }
// // }
// //
// // const map = new MyMap([
// //   ['a', 3],
// //   ['b', 4],
// //   ['c', 5]
// // ])
// //
// // const obj = {}
// //
// // // map.set(obj, 123)
// // // map.set('a', 123)
// // // map.set(obj, 111)
// // // map.delete(obj)
// //
// // // let s = map.size
// // // console.log(map)
// // // console.log(s)
// // //
// // //
// // // for (const item of map) {
// // //   console.log(item)
// // // }
// //
// // map.forEach((a1, a2, a3) => {
// //   // console.log(a1)
// //   // console.log(a2)
// //   // console.log(a3)
// // })
//
// // let obj = {
// //   name: 'hello'
// // }
// //
// // const set = new WeakSet()
// // set.add(obj)
// //
// // obj = null
// // console.log(set)
