<!-- ## 注册机制、异步加载、生命周期管理、通信机制、构建时集成应用及应用独立发布部署、安全隔离措施


 匹配规则
项目中是如何配置的 基础路径

qiankun 基本配置流程
主应用和子应用的基础路径
路由匹配规则

1. 在主应用中安装 qiankun，并在主应用中注册子应用
   name entry container activeRule
2. 在子应用中导出相应的 生命周期 钩子
3. 配置子应用的打包配置
4. > vue
   > 在项目 src 目录中增加 `public-path.js`

```js
output: {
  library: `${packageName}-[name]`,
  libraryTarget: 'umd',
  chunkLoadingGlobal: `webpackJsonp_${packageName}`,
},
```

3.

---


-->

## qiankun 注册的基本流程是什么

> vite 项目

1. 在主应用中安装 qiankun，并在主应用中注册子应用`registerMicroApps`

```
  name
  entry
  activeRule
  container
```

2. 改造子应用入口(render)，使用`vite-plugin-qiankun`

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
