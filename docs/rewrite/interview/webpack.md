## webpack 打包流程

1. 初始化: 通过配置文件和 shell 参数,初始化参数,确定入口文件、输出路径、加载器、插件等信息。随后读取配置文件,合并默认配置、CLI 参数,生成最终的配置对象
2. 编译: 从入口文件开始,递归解析模块依赖,找到需要打包的模块。之后使用 loader 对每个模块进行转换,转换成浏览器能识别的 js 代码
3. 构建模块依赖图: 根据模块依赖关系,构建模块依赖图,确定各个模块之间的依赖关系
4. 生成代码块: 根据入口和依赖图,将所有模块分组,生成一个个包含多个模块的代码块(chunk),这些 chunk 会根据配置生成不同的输出文件
5. 输出: 将生成的代码输出到指定的文件目录,并根据配置还在对应的资源文件
6: 插件处理: 在整个构建过程中, 会在特定的生命周期钩子上执行插件,插件可以对打包各个间断进行干预和处理
<!-- webpack 打包优化
modern
打包后会生成 script type=model
针对浏览器版本 现代版浏览器和低版本浏览器

所使用的都是同一个 html
高版本浏览器可以识别 type=module 所以打包体积更小
nomodule 低版本浏览器 当加了这个标记的时候 浏览器会直接忽略

## webpack5 更新内容

1. clean-webpack-plugin 清除目录下的内容

```js
module.exports = {
  output: {
    clean: true
  }
}
```

2. 允许在模块顶层代码去使用 await
3. cache-loader 默认开启，缓存存储在内存中
4. 外部资源输出目录可自定义 assetModuleFileName,可以不用 4 的 roles
5. 模块联邦

```js
// ModuleFederationPlugin
plugins: [
  new ModuleFederationPlugin({
    name: '',
    filename: '',
    // 使用其他项目暴露的模块
    remotes: {
      '': ''
    },
    // 共享模块
    shared: {
      jqery: {}
    },
    expose: {
      '': ''
    }
  })
]
```

<Gitalk /> -->
