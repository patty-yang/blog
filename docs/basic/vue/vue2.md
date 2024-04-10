## Mixin 优势与问题

- 优势

  - 提高代码复用性

    -- vue componsition API useXX 解决

  - 不需要进行状态传递

- 缺点

  - 不能按需引入
  - 溯源困难

## 过渡与动画

- js 实现动画
  - 使用 js 创建动画 -> gasp
  - animate css
  - 预先定义好动画相关类名 切换 class
  - js 操作 style transition
- vue 中

  - 通过监听`transitionstart` `transitionend`两个方法,过渡的时候通过切换类名，

  ```vue
  <template>
    <div>
      <transition name="fade">
        <span v-if="isShow"> content </span>
      </transition>
      <button @click="isShow = !isShow"></button>

      <transition-group name="fade">
        <div v-for="i in items" :key="i"></div>
      </transition-group>

      <button @click="add"></button>
      <button @click="remove"></button>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        isShow: false,
        items: [1, 2, 3, 4]
      }
    },
    methods: {
      add() {
        this.items.splice(this.randomIndex(), 0, ++this.items.length)
      },
      randomIndex() {
        return Math.floor(Math.random() * this.items.length)
      },
      remove() {
        this.items.splice(this.randomIndex(), 1)
      }
    }
  }
  </script>

  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opcity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  ```

  - https://github.com/vuejs/vue/blob/main/src/platforms/web/runtime/components/transition-group.ts

  update 添加和删除的过程

  prevChildren -> 切换之前数据的内容

  name -> 传入的 name

<!-- ## slot

render slot
https://github.com/vuejs/vue/blob/49b6bd4264c25ea41408f066a1835f38bf6fe9f1/src/core/instance/render-helpers/render-slot.ts

**_ 外部组件自定义内部组件内容, 实现内容分发 _**

**_ 本质上都是函数 _**

- slots
- scopedSlots

- 具名插槽
- 默认插槽
- 作用域插槽 -->

## 插件化机制

- 不侵入源码的情况下对源代码进行扩展，通过插件对自身能力做一个增强

- webpack tappable

- - vuex vue-router pinia 等插件

- 规范

  - 插件基座
  - 插件注册
  - 插件卸载
  - 插件生命周期

- 可以是对象 也可以势函数
- - 对象 install
  - 函数 同 install

## 定义插件

```js
const MyPlugin = {
  install(Vue, options) {
    // 全局的函数
    Vue.myGlobalsFn = function (options) {
      conosle.log('install')
    }
    // 全局指令
    Vue.derective('my-directive', {
      bind(el, binding, vnode, oldvalue) {}
    })
    Vue.mixin({
      created() {}
    })
    // 等。。。
  }
}

const app = createApp()
app.use(MyPlugin)
```

```ts
  install(app: App) {
      const router = this
      app.component('RouterLink', RouterLink)
      app.component('RouterView', RouterView)

      app.config.globalProperties.$router = router
      Object.defineProperty(app.config.globalProperties, '$route', {
        enumerable: true,
        get: () => unref(currentRoute),
      })

      // this initial navigation is only necessary on client, on server it doesn't
      // make sense because it will create an extra unnecessary navigation and could
      // lead to problems

      if (
        isBrowser &&
        // used for the initial navigation client side to avoid pushing
        // multiple times when the router is used in multiple apps
        !started &&
        currentRoute.value === START_LOCATION_NORMALIZED
      ) {
        // see above
        started = true
        push(routerHistory.location).catch(err => {
          if (__DEV__) warn('Unexpected error when starting the router:', err)
        })
      }

      const reactiveRoute = {} as RouteLocationNormalizedLoaded
      for (const key in START_LOCATION_NORMALIZED) {
        Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key as keyof RouteLocationNormalized],
          enumerable: true,
        })
      }

      app.provide(routerKey, router) // -> this.$router  <-inject
      app.provide(routeLocationKey, shallowReactive(reactiveRoute))
      app.provide(routerViewLocationKey, currentRoute)

      const unmountApp = app.unmount
      installedApps.add(app)
      app.unmount = function () {
        installedApps.delete(app)
        // the router is not attached to an app anymore
        if (installedApps.size < 1) {
          // invalidate the current navigation
          pendingLocation = START_LOCATION_NORMALIZED
          removeHistoryListener && removeHistoryListener()
          removeHistoryListener = null
          currentRoute.value = START_LOCATION_NORMALIZED
          started = false
          ready = false
        }
        unmountApp()
      }

      // TODO: this probably needs to be updated so it can be used by vue-termui
      if ((__DEV__ || __FEATURE_PROD_DEVTOOLS__) && isBrowser) {
        addDevtools(app, router, matcher)
      }
    },
```
