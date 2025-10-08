- vue 性能优化从哪几个方面展开

  - 打包构建

    - 产物优化
      - tester、uglify
      - tree-shaking
      - chunk
    - 开发时优化
      - MFSU ? (umi 提供的基于 webpack 构建提速)
      - happy-pack
      - dll

  - 应用层面

    - 懒加载
    - 合理设计组件颗粒度(page -> pageHeader、pageFooter、pageContent)
    - 细颗粒度更新(Pinia，订阅的对象尽量最小修改)
    - transform 减少重排，完成动画
    - 接口请求缓存
    - web-worker 耗时计算

      ```js
      const num = 10000;
      const worker = new Worker('worker.js');
      worker.postMessage(num);

      worker.onmessage = function (event) {
        console.log(event.data);
      };
      ```

  - 资源加载
    - gzip 压缩
    - oss、cdn
    - http1/2(http 1 和 2 的区别)
  - 缓存
    - 强缓存
      - Expires 基于客户端时间 不可靠
      - Cache-Control 优先级更高
    - 协商缓存
      - Last-Modified/If-Modified-Since
      - Etag/If-None-Match
    - 策略缓存
      - service-worker
  - 首屏加载

        - 预加载 prefetch
        - 预渲染 prerender
        - 骨架屏

 <!-- - 浏览器渲染过程

  - 解析 HTML 生成 DOM 树
  - 解析 CSS 生成 CSSOM 树
  - 将 DOM 树和 CSSOM 树结合，生成渲染树
  - 布局（文档流、盒模型、计算大小和位置）
  - 绘制（把边框颜色、文字颜色、阴影等画出来）
  - 合成（根据层叠关系展示画面）

- 浏览器回流和重绘

  - 回流（reflow）
    - 布局、大小、位置、隐藏等
  - 重绘（repaint）
    - 颜色、背景色、文字颜色等

- 浏览器重绘和重排

  - 重绘（repaint）
    - 改变元素外观，不影响布局 -->
