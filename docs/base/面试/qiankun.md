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
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
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
const actions = initGlobalState(state)

actions.onGlobalStateChange((value, prev) => {
  // value: 当前变更后的值
  // prev: 变更前的值
  // state 变更的时候就会触发
  Object.assign(state, value)
})
```
