function Person() {}

// Person.prototype.name = 'John1'
const person1 = new Person()
const person2 = new Person()
// console.log('🚀 ~ person1:', person1.name)
// console.log('🚀 ~ person2:', person2.name)

// console.log(person1.__proto__ === Person.prototype)
// console.log(Person.prototype.constructor === Person)
// console.log(Object.getPrototypeOf(person1) === person1.__proto__)

// prototype 构造函数的属性
// __proto__ 实例上的属性 最终都会指向原型 prototype

Person.prototype.name = 'person-name'

person1.name = 'person1-name'

console.log('🚀 ~ person1:', person1.name)

delete person1.name
console.log('🚀 ~ person1:', person1.name)
