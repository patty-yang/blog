## 通信

- vue2
  - props/$emit
  - $parent/$children
  - $refs
  - eventBus
  - provide/inject
  - $emit/$on
- vue3
  - props/defineEmits
  - expose/ref
  - provide/inject

## computed watch 区别

computed 支持缓存，依赖的属性发生变化的时候去重新计算
watch 不支持缓存，只要监听的属性发生变化，就会执行回调函数

computed 不支持异步，有异步操作无法监听数据变化
watch 支持异步

computed 默认监听
watch 默认加载不监听 需要配合 immediate

## 插件化机制

```js
const result = ''

if (typeof result !== 'number') {
}
if (result < 20) {
}

if (result > 20) {
}

// -------------

const rules = [
  {
    name: 'isNumber',
    validator: (value) => typeof value === 'number',
    message: '必须是数字'
  }
]

class Validator {
  constructor() {
    this.rules = rules
  }
  addRule(rule) {
    this.rules.push(rule)
  }
  validate(result) {
    const { rules } = this
    for (let rule of rules) {
      const res = rule.validator(result)

      if (!res) {
        return rule.message
      }
      return true
    }
  }
}

const validator = new Validator(rules)

const minPlugin = {
  name: 'min',
  validator: (value) => value > 20,
  message: '必须大于20'
}

validator.addRule(minPlugin)
```

## key 的作用

- 有了 key 之后，就能明确的知道新旧节点中 children 的映射关系，而知道映射关系就很容易的判断 children 节点是否可被复用
- 虚拟 DOM 算法中 key 的作用
  - 简单的说：key 是虚拟 DOM 对象的标识，当数据发生变化时，Vue 会根据【新数据】生成【新的虚拟 DOM】,
    随后 Vue 进行【新虚拟 DOM】与【旧虚拟 DOM】的差异比较，比较规则如下：
    - 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key：
      - 若虚拟 DOM 中内容没变, 直接使用之前的真实 DOM！
      - 若虚拟 DOM 中内容变了, 则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM。
    - 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key
      - 根据数据创建新的真实 DOM，随后渲染到到页面。
  - 用 index 作为 key 可能会引发的问题：
    - 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
      - 会产生没有必要的真实 DOM 更新 ==> 界面效果没问题, 但效率低。
    - 如果结构中还包含输入类的 DOM：
      - 会产生错误 DOM 更新 ==> 界面有问题。
  - 开发中如何选择 key?:
    - 最好使用每条数据的唯一标识作为 key, 比如 id、手机号、身份证号、学号等唯一值。
    - 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的。

## 虚拟 DOM 的优缺点
