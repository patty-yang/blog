1. 执行 npx webpack 会执行到 webpack/bin/webpack.js 文件

2. 通过 debugger 发现执行到了 runCli 方法

 <!-- <img src="./img/image-1.png" alt="第二步执行了runCli方法" align=center /> -->

3. Cli 方法内部执行逻辑
   <!-- <img src="./img/image-2.png" alt="Cli方法内部" align=center /> -->

4. 通过 debugger =》 cli 是将的 上级 lib/bootstrap 下的方法导入且执行,同时将命令行参数传入
   <!-- <img src="./img/image-3.png" alt="xx" align=center /> -->

5. 之后通过 new Webpack-cli 后调用 run 方法
   <!-- <img src="./img/image-5.png" alt="调用run方法" align=center /> -->

6. run 方法内部应该是对命令行参数解析一系列的操作
   <!-- <img src="./img/image-4.png" alt="解析命令行参数" align=center /> -->

7. 执行 loadWebpack 后执行 runWebpack
   <!-- <img src="./img/image-6.png" alt="调用到了 run webpack" align=center /> -->

8. 后续通过 runwebpack 中的 createCompiler 去生成 compiler 实例
   <!-- <img src="./img/image-7.png" alt="生成compiler实例" align=center /> -->

9. 之后通过执行 webpack 回到 webpack 执行逻辑中
   <!-- <img src="./img/image-8.png" alt="回到webpack执行逻辑中" align=center /> -->

> 因为 webpack 后会调用 webpakc-cli 所以可以直接使用 node-api 直接调试 webpack

```js
const webpack = require('webpack')

function fn1() {
  return webpack({
    mode: 'none',
    entry: '',
    output: {
      iife: false,
      pathinfo: 'verbose'
    }
  })
}
```
