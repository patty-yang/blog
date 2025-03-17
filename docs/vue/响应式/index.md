## vue3 数据响应式

- 自动追踪数据与视图的依赖关系
- 在数据发生变化时智能更新相关联的视图

### 那是如何追踪数据依赖关系的?

### 在数据改变的时候，是如何更新视图的?

这就涉及到数据拦截了

在 vue2 中是使用的 `Object.defineProperty`

在 vue3 中是使用的 `proxy`（也不太对，defineProperty 也有用到）

### Object.defineProperty

- [MDN 描述](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [大佬们的描述](https://juejin.cn/post/6844903828580466702)
- [大佬们的描述](https://juejin.cn/post/7148418896922411016)

### Proxy

- [MDN 描述](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

#### 两者的区别

**共同点**

- 都可以拦截`读`、`写` 操作
- 都可以实现深度拦截，需要递归处理

**不同点**

1. 拦截的目标和行为是不同的
   1. Object.defineProperty 是**针对对象的特定属性进行读写**操作的拦截
   2. Proxy **针对对象的多种操作**，包括`属性读、写、删除、函数调用、原型设置`等。
      1. 比如删除对象上的一个属性
      2. 给对象上增加一个不存在的属性
2. 性能上的区别
   1. 如果需要拦截的对象属性很多，使用 Proxy 性能更好，可以一次性对整个对象处理
   2. 如果需要拦截的对象很少，使用 Object.defineProperty 会好点

## Vue 中的响应式系统源码解析

### RefImpl

![RefImpl 源码实现](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503172248319.png)

### reactive

![reactive 函数源码](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503172250192.png)

![createReactiveObject 源码](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503172253029.png)

### 响应式处理的关键

- **ref 的处理逻辑**：

  - 根据传入值的类型决定使用 getter/setter 还是 Proxy
  - 基本类型使用 getter/setter
  - 引用类型使用 Proxy

- **依赖收集机制**：
  - 对象操作只有被拦截的才会触发依赖收集
