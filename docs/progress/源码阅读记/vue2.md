## 阅读大型开源项目的源码的思路

- 了解核心流程 API（对库的 API 比较熟悉）
- 了解整体流程
  - vue2 -> 应用从编译到初始化到挂载到触发更新到卸载的整个流程
  - webpack -> 从启动到打包到文件输出
    - webpack-cli 命令行启动
    - webpack nodejs 执行

## 根据过程分析源码

- 如 vue

1. 首先编写的是 xxx.vue 文件
2. 通过 sfc 将 vue 文件转为 js
3. compiler 用于编译处理
4. 启动项目，初始化应用 new Vue()
5. 处理初始化的逻辑，包含生命周期、mixin 等内容
6. 创建对应 VDom 挂载
7. 一旦发生更新（data 数据更新 通过监听触发）
8. 收集依赖
9. 处理更新 diff

## 目录结构设计

```
src
 |---- compiler   #编译相关
 |---- core       #核心代码
 |---- platforms  #不同平台的支撑
 |---- server     #服务端渲染
 |---- sfc        # .vue 文件解析
 |---- shared     #共享代码
```

- compiler
  - 包含所有编译相关的代码。 把模版解析成 AST 语法树，ast 语法树优化，代码生成等功能
- core
  - vuejs 核心代码，重点分析的地方
- platform
  - 跨平台的入口
- server
  - 服务端渲染逻辑，主要工作是把组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器
- sfc
  - 将 .vue 文件解析成一个 javascript 对象
- shared
  - 公用的工具方法
- 构建相关
  - 使用 Rollup 构建，构建配置在 scripts 目录下。
