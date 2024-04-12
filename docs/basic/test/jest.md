## jest

- describe `描述测试的场景`
- it `对测试用例的描述`
- expect `断言当前用例的状态`

```js
// __index__test.js
// chalk 优化终端输出
function sum(a, b) {
  return a + b
}
describe('描述当前用例的场景', () => {
  it('测试 功能用例的场景', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
//  toBe 严格对比 对象的话是值和引用的对比 内存空间是否一致
//  toEqual 值的对比 两个对象递归比较 key 的 value 是否一致
```
