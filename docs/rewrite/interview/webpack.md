webpack 打包优化
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
    clean: true,
  },
};
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
      '': '',
    },
    // 共享模块
    shared: {
      jqery: {},
    },
    expose: {
      '': '',
    },
  }),
];
```

<Gitalk />