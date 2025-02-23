## qiankun 注册的基本流程是什么

### 1. 在主应用中安装 qiankun，并在主应用中注册子应用`registerMicroApps`

```
  name
  entry
  activeRule
  container
```

### 2. 配置子应用的运行时环境，添加对应的生命周期

```
  bootstrap 初始胡
  mount 挂载
  unmount 卸载
```

> vite 项目

改造子应用入口(render)，使用`vite-plugin-qiankun`

```js
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper'

let app = null
let router = null
let history = null
function initRouter() {
  history = createWebHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? '/sub-vue' : '/'
  )
  router = createRouter({
    history,
    routes
  })
}
function render(props = {}) {
  const { container } = props
  initRouter()
  app = createApp(App)
  app.use(router)
  app.use(createPinia())
  app.mount(container ? container.querySelector('#app') : '#app')
  // if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  //   console.log('正在作为子应用运行')
  // }
}

renderWithQiankun({
  mount(props) {
    render(props)
  },
  bootstrap() {
    // console.log('bootstrap')
  },
  unmount(props) {
    console.log('🚀 ~ unmount ~ unmount:')
    app.unmount()
    app._container.innerHTML = ''
    history.destroy() // 不卸载  router 会导致其他应用路由失败
    router = null
    app = null
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
// vite.config.js
plugins: [vue(), qiankun('sub-vue', { useDevMode })],

```

> webpack 构建项目

1. 在 src 下添加 public-path.js

```js
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2. webpack

   把子应用打包成 umd 库格式

```js
output: {
  // 把子应用打包成 umd 库格式
  library: `${name}-[name]`,
  libraryTarget: 'umd',
  jsonpFunction: `webpackJsonp_${name}`,
},
```

3. react 使用 react-app-rewired 配置 -> config-overrides.js

## 全局状态

```js
const actions = initGlobalState(state);

actions.onGlobalStateChange((value, prev) => {
  // value: 当前变更后的值
  // prev: 变更前的值
  // state 变更的时候就会触发
  Object.assign(state, value);
});
```

## 使用的优势

- 技术栈无关
  主框架不限制接入应用的技术栈，微应用具备完全自主权

- 独立开发，独立部署
  微应用仓库独立，前后端可独立开发，部署完成后自动完成同步更新

- 增量升级
  在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略

- 独立运行
  每个微应用之间状态隔离，运行时状态不共享

## 对比 iframe

- 缺点

  - url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
  - 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
  - UI 不适配等问题

- 优点

- 1. 实现了 `js` 隔离
     给 window 做了个 proxy 代理，保证 windows 对象的纯净，不被污染
- 2. 实现了 `css` 隔离
     有 shadow dom 和 scoped 两种方案，但是都有对应的问题

  - shadow dom 自带样式隔离，但 shadow Dom 内的样式和外部的互不影响，导致挂在 body 的弹窗样式设置不上的问题
  - scoped 是给选择器加了个 qiankun- class 类，父应用能设置子应用样式，这样能隔离样式，但是同样有挂在 body 的弹窗样式设置不上的问题，所以 qiankun 的 scoped 不支持全局样式

### 如何解决

- react 使用 css module
- vue 使用 scoped
  vue、react 项目已经做样式隔离了，没必要使用 qiankun 的样式隔离


<Gitalk />