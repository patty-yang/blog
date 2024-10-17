## 对比 http1

- 报文是二进制的 之前都是文本
- 按照报文大小分成了不同的帧
- 引入了帧(frame)和(stream)流的概念
- 帧是按照报文段分割，分割成每一小块，每一小块被称为一个帧
- 客户端和服务端来回传输的过程被称为流
- 流是通过帧的首部来标识
- 帧和流的引入就可以实现多路复用
  - 可以在传输中有很多流的产生，可任意发送请求和响应 不限制数量
  - 因为不限制数量就不会出现对头阻塞问题
- 服务端可以像客户端主动推送一些资源

- 优先级
- 永久连接

js 是动态作用域还是静态作用域

es6 是如何编译成 es5 的

什么是编译器

typescript 的原理是什么

React 的事件机制是什么

React 组件之间如何通信

React 的 HOC 是什么

React 是如何捕获错误的

React setState 的执行顺序

React jsx 转换成真实 DOM 的过程是什么

React refs 是什么

React render 方法的原理是什么

什么是 React Fiber

什么是事件循环

TCP 三次挥手 四次握手是什么

小程序的运行机制是什么

什么是 bundleless

webpack 的工作原理是什么

有哪些 webpack 的优化方式

什么是闭包：

MDN: 能够在函数中使用，但是既不是函数的参数，又不是函数局部变量的变量

**proto** : 构造函数创建出来的实例，指向构造函数原型的指向 -> 引用

prototype : 是构造函数创建出来的实例，指向构造函数创建的实例的原型 对象

---

## 考虑项目的依赖

## 构建项目的依赖相关

- 需要什么打包工具: **webpack**、vite、rollup、esbuild、tsup、swc、rspack
  - webpack-cli
  - webpack
- 是否需要 typescript
  - ts-loader、babel
- 还需要 webpack 哪些依赖，比如: style-loader、css-loader、file-loader
- eslint 用来做整个项目的 js、css 规范约束
- tsc 做 ts 类型检查
- husky githooks

## 项目的依赖相关

- react

## 命令

> 分为开发环境运行和构建

- dev
- build

- js、ts、babel-loader
  - 将代码装换位低版本浏览器的兼容处理 polyfill 代码转换，babel-loader
- css 样式相关，css-loader 只是 webpack 和 css 处理的一个桥梁
- file-loader、url-loader，是 webpack 和文件相关处理的桥梁

## 基础配置

1. 首先考虑到暂时是使用 js，后续会使用 babel 进行处理

## css 相关

1. 样式抽离 -> `mini-css-extract-plugin`

## source map 安全性的面试题

- 开发一个 webpack-xxx-plugin 将 sourcemap 上传到对应的监控平台
- 删除 sourcemap
- 前端 SDK 报错的输出内容上报
- 通过上报的信息，结合打包构建时上传的 sourcemao，就能在监控平台定位到代码的报错信息

## presets 预设

- @babel/preset-env
- @babel/preset-typescript

## 升级 typescript

- @babel/preset-typescript
- ts 目前相对比较好的选择
- 配置 tsconfig.js

## tsconfig.json 配置

- 编译选项 compilerOptions
  - 当前 ts 应该以什么形式去编译,编译代码的 es 版本,编译代码的模块,编译的代码模块化方式
- include
- exclude
- path

开源

- sentry
- webpack ->

## unpkg

- 搭建静态站点的 CDN

## docker 针对不同环境抹平不同环境的差异性

## x

- useHooks context hoc

  - 抽离 context provid

- useSyncExternalStore react 外部的状态和 store 关联 -> 外部响应和 react 同步

## vue

- `Vue `会在“next tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。
