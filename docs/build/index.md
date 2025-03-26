# 前端构建工具的演进

## 第一代：基础构建工具

主要代表：npm scripts、gulp、grunt
核心功能：

- 代码编译转换
- 文件合并
- 代码压缩与混淆

## 第二代：模块化构建工具

主要代表：browserify、webpack、parcel、rollup
重要特性：

- 模块化支持
- 代码分割
- 按需加载
- 依赖关系管理
- 打包流程统一

## 第三代：高性能构建工具

核心特征：使用 Rust 重构，追求极致性能

典型工具演进：
| 原有工具 | Rust 实现 |
|---------|-----------|
| babel | swc |
| postCss | lightingCss |
| electron | Tauri |
| eslint | dprint |
| webpack | turbopack/rsPack |
| rollup | rolldown |

> rsPack 由字节跳动开发维护

## Webpack 的痛点

### 构建性能问题

- 冷启动耗时长：首次启动需要对整个项目进行打包
- 构建速度慢：随着项目规模增长，打包时间呈指数级增长
- 资源消耗大：打包过程需要占用大量系统资源

## Vite 的解决方案

- 利用浏览器的 import 机制，按需编译和加载
- 针对 .vue 单文件组件进行按需编译和加载，将模版文件实时转换为可执行的 js 代码
- 利用 ws 实现实时更新，精确定位变更模块，最小化更新范围
