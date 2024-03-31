## 打包构建流程

- 初始化，初始化会读取配置信息，统计入口文件、解析 loader plugin 等信息
  1. 初始化参数
  2. 创建 compiler 实例
  3. 开始编译 compiler.run
  4. 确定入口 根据 entry 找出所有入口文件 调用 addEntry
- 编译阶段，webpack 编译代码，部分依赖 babel，ts 转 js less 转 css styled-components 进行处理
  1. 通过 entry 对应的 dependence 创建 module 对象，调用对应的 loader 将模块内容转为 js 内容
  2. 完成模块编译，得到一个 moduleGraph
- 输出阶段: 生成输出文件，包含文件名，输出路径，资源信息
  1. 输出资源组装 chunk，chunkGroup，再将 chunk 转换为一个单独文件加入到输出列表（修改资源内容的最后机会也就是（afterChunks： new SyncHook(["chunks"])钩子））
  2. 写入文件系统（emitAssets） 在确定好输出内容后，根据配置文件输出到文件中

### 核心概念

- compiler
- compilation
- module
- chunk
- bundle

## 插件

- compiler.hook.compilation

  - 时机: 启动编译创建出 compilation 对象后触发
  - 参数: 当前编译的 compilation 对象
  - 示例: 很多插件基于此事件获取 compilation 实例

- compiler.hook.make

  - 时机: 正式开始编译时触发
  - 参数: 当前编译的 compilation 对象
  - 示例: webpack 内置的 `EntryPlugin` 基于此钩子实现 entry 模块的初始化

- compiler.hook.optimizeChunks

  - 时机: seal 函数中，chunk 集合构建完毕触发
  - 参数: chunk 集合 与 chunkGroups 集合
  - 示例: `SplitChunksPlugin` 插件基于此钩子实现 chunk 拆分优化

- compiler.hook.done
  - 时机: 编译完成后触发
  - 参数: stats 对象，包含编译过程中的各类统计信息
  - 示例: `webpack-bundle-analyzer` 插件基于此钩子实现打包分析

## 如何让打包出来的文件尽可能的小

- 按需加载
  - Vue defineAsyncComponent
  - React lazy
- 配合缓存： 将不怎么变动的包（vue、vue-router、vuex、pinia）比如说打到一个 vender.js 公共资源单独打包（splitchunks 指定库的名称）
  - cache filesystem 将中间结果缓存到内存
  - buildDependencies 根据以来内容是否发生变化来决定是否使用缓存
- 减少 commonjs 的使用 尽量使用 esm 库
- tree shaking
- externals 通过外部导入的形式，去使用第三方的资源

  - 微前端架构
  - 针对公共依赖 子应用无需导包公共依赖到自己的主 js 中

- 提升构建速度
  - 空间换时间 -> dll、cache
  - 多线程 -> happy-pack（老）thread-loader（新）保证 cpu 的搞笑运行

## loader

- 本质是一个函数 会接受一个 ast 处理过后的字符串
- 将结果传给当前资源 this 指向上下文 getOption 能获取到传递的参数

```javascript
//  自定义loader 将代码中的console替换
module.exports = function () {
  source.replace(/console\.log\(.*)/g, 'content')
  return source
}
```

## plugin

- 本质是一个对象
- 使用了 tapable 的插件机制 提供了一些列的发布订阅的 API
- 注册事件，在不同的触发注册事件的时间执行

```javascript
// 自定义plugin 打包完成后，将本次打包的所有文件的名称输出到 fileList.md

class FileList {
  constructor(options) {
    this.options = options
    this.name = options.name || 'fileList.md'
  }

  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      const { filename } = this
      const { assets } = compilation
      // assets => webpack 输出文件的内容

      compilation.assets['key'] = {
        source: function () {
          return
        },
        size: function () {
          return
        }
      }
    })
  }
}
module.exports = FileListPlugin
```

## loader 和 plugin 的区别

- loader 是对资源 ast 进行的处理
- plugin 是对功能的一些增强
