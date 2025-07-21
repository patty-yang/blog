## Vue3 对比 Vue2

这是一个大版本的更新，我觉得可以分为四类

| 分类         | 说明                                     |
|------------|----------------------------------------|
| `源码层面的优化`  | Vue2 源码集中，Vue3 monorepo，模块可独立发布，颗粒度更细。 |
| `性能方面的优化`  | 解决历史包袱，性能提升。                           |
| `API 语法优化` | 新增 Composition API，代码组织更灵活。            |
| `引入RFC`    | 社区参与度提升，持续完善。                          | 

**🛠️ 1. 源码层面的变化**

在`vue2`的源码是在 `src`目录下的,然后根据功能拆分出来不同的文件夹

├── `complier`: 编译器  
├── `core`: 和平台无关的通用运行时代码  
├── `server`: 服务端渲染  
├── `sfc`: 单文件解析代码  
├── `shared`: 共享代码库

因为是在`src`目录下,所以无法**单独抽离**出来,无法对单个模块进行发布

在`vue3`改为了`monorepo`的形式,将模块拆分为独立的包,每个包能单独的进行发布部署。颗粒度更细

**🚀 2. 性能优化**

1. ts 支持
    - vue1.x 纯 js 开发
    - vue2.x Flow.js
    - vue3.x Typescript

2. 源码体积缩小
    - 移除冷门功能: `filter`、`inline-template`
    - 生产环境用 `rollup` 构建，`tree-shaking`
3. 数据劫持优化
    - `vue2`: `Object.defineProperty`
    - `vue3`: `Proxy`
4. 编译优化
    - 静态提升、预字符串优化、缓存事件处理函数、`Block Tree`、`PatchFlag`
5. diff 算法优化
    - `vue2`: 双端 diff
    - `vue3`: 快速 diff

---

**🧩 3. 语法 API 的变化**

1. 逻辑组织的优化
    - `options API`: 复用的颗粒度是组件级别
    - `composition API`: 复用的颗粒度是函数级别
2. 优化逻辑复用
    - `mixin` 的缺点
        - 不清晰的数据来源
        - 命名空间的冲突
        - 隐式的跨 `mixin` 交流
3. 其他变化
    - 去掉了 `new Vue` 的构造函数
      | `vue2`         | `vue3`                                     |
      |------------|----------------------------------------|
      | 调用构造函数的静态方法会对所有的 `vue` 应用生效,不利于隔离不同的应用 | |
      | 构造函数继承了太多的功能, 不利于 `tree-shaking`  | 按需导入,利于 `tree-shaking` |
      | 没有区分组件实例和应用,通过 new Vue 创建的对象,即时一个 `vue`应用,同时也是一个特殊的`vue`组件 | 将两个概念区分
      `通过createApp`创建的对象是一个Vue应用,内部提供的方法是针对整个应用的 |

**💡 4. RFC**
> 收集社区对某个新功能、改动或标准的建议和意见

## vue3 响应式的变化

1. **拦截**
    - `Object.defineProperty` 针对的是对象特定属性的**读写**操作进行拦截，表示的是 新增/删除属性的监测不到的
    - `Proxy` 能对对象的整个操作进行拦截
2. **响应式**
    - `vue2` 通过 `data` 来创建的响应式数据
    - `vue3`中的
        - `ref` 是通过 `Object.defineProperty`
        - 对象是通过 `Proxy`
3. 依赖收集的变化
    - `vue2` 是通过 `Watcher、Dep`
        - 每个响应式属性都有个 `Dep`实例，用来依赖收集，内部包含了一个数组，存储依赖这个属性的所有 `Watcher`
        - 当属性值发生变化, `Dep` 会通知所有的 `Watcher` 去做更新操作
    - `vue3 3.5` 是通过 `WeakMap、Map、Set`
        - 依赖收集的颗粒度更细
        - `WeakMap` 中的 `key` 对应的是响应式对象,值是 `Map`,这个 `Map` 的 `key` 是对象的属性, 值是一个 `Set`
          存储了所有依赖于这个函数的 `effect` 函数
    - `vue3 3.6` 是通过链表的方式
        - `deps` `nextDeps`
        - `subs`
        - TODO: 待梳理

## nextTick

- 同步代码中多次对响应式数据做了修改，多次修改会被合并为一次，之后通过最终的修改结果**异步**去更新 DOM
- 如果不合并的话，数据一改变同步更新，会导致频繁的重绘和重排

> 异步更新带来了 `无法及时获取更新后的 DOM 值`  
> 那么解决方案就是: **将获取`DOM`数据的同步代码**包装成一个微任务,浏览器在完成一次渲染后,就会立即执行微任务

```js
class Component {
  _data = {
    name: ''
  }
  pending = false

  constructor() {
    this.data = new Proxy(this._data, {
      set: (target, key, value) => {
        const res = Reflect.set(target, key, value)
        if (!this.pending) {
          this.pending = true
          Promise.resolve().then(() => {
            this.render();
            this.pending = false
          })
        }
        return res
      }
    });
  }

  render() {
    console.log(this.data.name);
  }
}

const comp = new Component();

comp.data.name = '1';
comp.data.name = '2';
comp.data.name = '3';
comp.data.name = '4';

```