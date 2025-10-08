var a = {
  n: 1,
};
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);

/**
 * 比较逻辑
 * 1. 两端类型相同，比较值
 * 2. 两端存在 NAN 返回false
 * 3. undefined 和 null 只有和自身 或者相互比较时，才返回true
 * 4. 两端都是原始类型，转换为数字比较
 * 5. 一端是原始类型，一端是对象类型，将对象转为原始类型 继续对比
 */
/**
 * 对象如何得到原始类型
 * 1. 若对象拥有 [Symbol.toPrimitive] 方法，则调用该方法。
 *    若方法能得到原始值，使用原始值
 *    若得不到原始值，抛出异常
 * 2. 调用对象的 valueOf 方法
 *    若方法能得到原始值，使用原始值
 *    若得不到原始值，进入下一步
 * 3. 调用对象的 toString 方法
 *    若方法能得到原始值，使用原始值
 *    若得不到原始值，抛出异常
 */

const a = {
  count: 1,
  valueOf() {
    return this.count++;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log('==对比，让其成立');
}
