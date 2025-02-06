## webpack 构建优化

- `问题背景`

  脚手架使用的是 create-react-app/vue-cli 创建的,后来模块多了之后越来越夸张,构建原因越来越长

##### `解决思路`

1. vite: 直接跳过打包的步骤(项目基于 webpack,有很多的 plugin 和 loader,迁移到 vite 可能会带来一些未知的风险,如果 vite 中如果没有对应的插件,带来的工作量就不可评估了)
2. 构建工具不能切换的情况下,就只能分析时间花费在了什么地方,所以使用了 `speed-measure-webpack-plugin`

##### `技术细节`

1. 通过 `speed-measure-webpack-plugin` 插件查看构建时间,会多来一份报告,包括总计的构建时间、各阶段的耗时、插件耗时、loader 耗时
2. 分析结果发现 babel 编译 js 时占用了一些时间、css-loader,在解析和处理的时候也挺耗时的
3. 所以就从这几个方面入手优化

##### `实现细节`

1. 使用 SWC 替换 babel 编译
2. thread-loader 解决 loader 耗时
3. 利用 webpack5 的持久化缓存技术
4. 开发环境去掉 hash，生产环境保留
5. 升级老旧的 plugin

##### `优化过程`

1. SWC: swc 是一个 js/ts 编译器,是基于 rust 编写,所以编译速度非常快,并且能兼容大多数 babel 的配置,迁移没有什么大的成本
2. thread-loader: 多线程处理 loader,减少主线程的负载
3. 持久化缓存和 hash: webpack5 的持久化缓存, 将模块的编译、解析结果以及插件的执行结果缓存到内存中,减少重复计算和编译,增加重用
4. 开发环境不需要 hash, hash 是利用浏览器缓存（强缓存、协商缓存）优化用户体验的手段,所以开发环境不需要
5. npm 查看 changelog, 如 terser-webpack-plugin 从 5.2.0 版本,引入了 swc 压缩器,盲猜性能有提升,先升级

##### `效果`

1. 使用 SWC 后,项目构建时间从 8-10 分钟减少到 3 分钟
2. 使用 thread-loader 后,css-loader 构建时间减少到 2 分钟
3. 使用持久化缓存后,构建时间减少到 1 分钟(第一次启动项目,时间上没有变化)
4. 去除 hash 后优化到 40s
5. terser-webpack-plugin 升级后,压缩时间减少到 10s

<Gitalk />
