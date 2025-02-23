// 代码输出

// 1
var foo = { bar: 1 }

var arr1 = [1, 2, foo]

var arr2 = arr1.slice(1)

arr2[0]++
arr2[1].bar++

foo.bar++

arr1[2].bar++

console.log(arr1[1] === arr2[0])
console.log(arr1[2] === arr2[1])
console.log(foo.bar)

// 引用类型存储的是地址

// foo: a1
// arr1: a2
// arr2: a3

// a1: {
//     bar: 4
// }
// a2: {
//     0: 1,
//     1: 2,
//     2: a1
// }
// a3: {
//     0: 3,
//     1: a1
// }

let obj = new Object()
console.log('🚀 ~ obj:', obj)
