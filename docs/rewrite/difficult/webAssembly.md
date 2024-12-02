## 提升图像处理性能

- `问题背景`

<!-- > 涉及到在线的图像处理,如对图像添加滤镜,图片变化、图片压缩这些操作,项目中涉及到锐化、浮雕等效果,这些功能不是简单的 css 就能搞定的,这就涉及到专业的图像处理库,因为图像处理库提供了专业的处理和算法。 -->

> 涉及到在线的图像处理,如对图像添加滤镜,图片变化、图片压缩这些操作,项目中涉及到锐化、浮雕等效果,涉及到专业的图像处理库,因为图像处理库提供了专业的处理和算法。

> 但是使用这些库进行复杂操作的时候,经常会遇到卡顿、耗时的问题。
> 因为图像算法涉及到大量的数学运算，这是一种计算密集型的任务，而 js 是单线程，主线程做这种密集型的任务就会阻塞其他操作，给人一种卡顿的感觉

##### `解决思路`

- 服务端解决
  - 多线程解决,但是涉及到网络通信,避免反向优化
- webAssembly

##### `技术细节`

- 什么是 webAssembly
  - 是一种二进制格式,接近于机器码,运行时性能更接近于原生代码,可以与 js 互操作,允许将多种语言编译成 webAssembly 格式,从而牺牲计算密集型任务的性能
- 为什么使用 webAssembly
  - 因为 js 是单线程,如果使用 js 处理密集型任务,会导致主线程阻塞,导致页面卡顿,使用 webAssembly 可以解决这个问题

##### `实现细节`

1. 将算法迁移 WebAssembly 里

- 借助 [Emscripten](https://github.com/emscripten-core/emscripten)（Emscripten: An LLVM-to-WebAssembly Compiler）
  - 选择了 C/C++ 图像处理库 ([opencv](https://github.com/opencv/opencv)),借助 Emscripten 将 opencv 编译成 webAssembly 格式
  - 编译后会生成 webAssembly 模块, 以及 js 映射模块
  - 使用时,先加载 js 映射模块, 然后通过加载 webAssembly 模块处理图像

2. 使用 webWorker 处理图像

- 因为 webAssembly 不能直接操作 dom,不能直接使用 js 的 api,所以使用 webWorker 来处理图像
- 可以避免主线程阻塞, 提升页面性能
- 避免阻塞用户界面，通过 postMessage 将图像数据传入 webWorker, 处理完成后, 通过 message 将结果返回主线程 更新 canvas

##### `优化过程`

1. 使用 web worker

- 创建 web worker 线程, 将图像处理算法迁移到 web worker 中执行
- 在 web worker 中使用 webAssembly 处理图像
- 通过 postMessage 将图像数据传入 web worker, 处理完成后, 通过 message 将结果返回主线程 更新 canvas

2.  使用 OffscreenCanvas 优化 canvas

- 使用 OffscreenCanvas 后不需要将处理后的图像传回主线程, 直接在 web worker 中绘制

3. 使用 requestIdleCallback 优化

- 优化数据传递和其他非紧急操作,在浏览器空闲的时间处理

##### `整体流程`

1. 算法迁移 webAssembly 中, 生成 webAssembly 模块, 以及 js 映射模块
2. 创建 web worker 线程, 加载 js 映射模块, 加载 webAssembly 模块
3. 使用 requestIdleCallback 处理非紧急操作, 在浏览器空闲的时间处理
4. 处理完成后, 通过 OffscreenCanvas 在 web worker 中绘制图像,完成更新

##### `效果`

- 使用了 lighthouse 和 performance 进行性能测试。 优化前，处理一张 4k 分辨率的图片(添加滤镜)平均需要 2.5s 优化后同样的处理仅需 500 毫秒左右，性能提升了 80%

<Gitalk />
