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

## watchEffect 于 watch 的区别

- watch 需要明确监听哪个数据，在监听对象或数组时，需要开启 deep 选项才能深度监听其属性或元素的变化
- watchEffect 自动进行响应式的收集依赖,但是回调函数无法获取到变化前后的值

watchEffect 依赖收集方式 -> vue 依赖收集方式
在运行函数时，会进行依赖收集，函数在运行过程中用到了那些响应式数据，响应式数据变化后这个函数就会重新运行，但是在收集依赖的时候，只会收集这个函数在同步代码中遇到的依赖

```js
watchEffect(async () => {
  url.value = await fetchUrl()
  videoRef.value.playbackRate = speed.value
})
```

## 双向绑定

- vue2

```text
vue 实例在初始化的时候会通过一些列的init方法进行初始化methods、data、computed、其中就会通过Object.defineProperty 对data中的属性进行数据劫持，通过getter和setter来监听数据的变化，同时每个属性都会设置一个 Dep类(消息订阅) ,它内部维护了一个数组，用来记录所有的订阅者(watcher),然后通过 Compile 进行模版解析，将模版中的变量替换成对应的数据并更新视图。在属性值发生变化的时候会出发 setter 函数，setter 函数会调用 dep.notify() 通知所有的订阅者，订阅者就会调用 update 方法更新视图。
```

- vue3
  proxy -> get ->
  在 get 方法中决定追踪策略，然后通过定义的 track，在对应的依赖 map 中增加依赖追踪
  使用了 WeakMap 来存储依赖关系，避免了 Vue2 中 Watcher 的内存泄漏问题。
- weekMap
- Set
  - collectionHandles.ts
    - mutable
    - shallow
    - shallowReadonly
    - readonly
- 有地方来访问 有内容变化的同时会通知
  <!-- WeakMap set -->

## 生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

## 组件通信

- props/$emit
- $parent/$children
- $refs
- eventBus
- provide/inject
- $emit/$on

## 组件化
