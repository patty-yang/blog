# vite 的配置

## ⚙️ 基础配置

#### root

- 📁 指定项目根目录（index.html 所在的位置）

#### define

- 🔧 定义全局常量替换
  > 💡 Vite 使用 esbuild 的 define 特性进行常量替换。表达式必须是 JSON 可序列化的值（包括
  null、boolean、number、string、array、object）或单个标识符。对于非字符串值，系统会自动将其转换为 JSON 字符串格式。

#### resolve

- **alias**: 📍 配置路径别名，简化导入路径
- **extensions**: 📄 配置文件扩展名自动解析

#### CSS 相关配置

- **devSourcemap**: 🗺️ 开发环境的 CSS source map
- **postcss**: 🎨 PostCSS 配置选项
- **preprocessorOptions**: 🔄 预处理器配置（如 SCSS 等）

```js
export default defineConfig({
  css: {
    // postcss: 'config'
    postcss: {
      plugins: [autoprefixer(), cssnano()]
    }
  }
})
```

## 🖥️ 服务器配置

#### 🌐 host

- 指定服务器监听的 IP 地址
  > 💡 设置为 `0.0.0.0` 或 `true` 可监听所有网络接口，便于多设备测试

#### 🔢 port

- 指定开发服务器端口号
  > 默认为 5173

#### 🔒 strictPort

- 端口严格模式
  > 当指定端口被占用时，是否直接退出而不是尝试下一个可用端口

#### 🔄 proxy

- 配置开发服务器代理
  > 用于解决开发环境的跨域问题

#### 👀 watch

- 自定义文件监视器配置
  > 底层使用 `chokidar`（强大的 Node.js 文件系统监听库）
  > 支持忽略特定文件/文件夹的变化

```js
export default defineConfig({
  server: {
    watch: {
      // 任何模块下的file.txt更改都会触发 HMR
      ignored: ['**/file.txt']
    }
  }
})
```

#### 🔐 https

- SSL 配置选项
  > 支持配置 SSL 证书和私钥路径
  > 用于开发环境下的 HTTPS 服务

```js
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(''),
      cert: fs.readFileSync('')
    }
  }
})
```

## 🔄 依赖预构建

在**首次**使用 Vite 启动项目时，会对项目依赖进行预构建

### 🤔 为什么需要预构建？

存在的主要问题：

1. 📦 **请求负担**：大量依赖文件会导致浏览器发起过多 HTTP 请求
2. 🔄 **兼容性问题**：部分依赖包使用 CommonJS 格式发布，与 ESM 环境不兼容

### ⚡ Vite 的解决方案

为解决上述问题，Vite 在首次启动时会执行依赖预构建。这个过程由 `esbuild` 处理，支持并行处理以提升效率。

### 🛠️ esbuild 的核心工作

1. 📥 **模块转换**

    - 将 CommonJS/UMD 格式模块转换为 ESM 格式
    - 确保所有模块都符合 ESM 规范

2. 📦 **依赖打包**

    - 合并依赖文件
    - 减少开发环境中的浏览器请求数量

3. 🗜️ **代码优化**

    - 执行代码最小化处理
    - 实现高效的代码压缩

4. ⚡ **增量编译**
    - 智能检测变更
    - 仅编译新增或修改的部分
    - 提高构建效率

### 💾 缓存机制

esbuild 将构建产物缓存至 `node_modules/.vite` 目录：

1. 📁 **文件系统缓存**

2. 🌐 **浏览器缓存**

#### 🔄 触发重新预构建的条件

以下任一情况发生变化都将触发重新预构建：

1. 📦 包管理器的锁文件内容变更

    - package-lock.json
    - pnpm-lock.yaml
    - yarn.lock

2. ⚙️ vite.config.js 相关配置改动

3. 🔧 NODE_ENV 环境变量修改

> 💡 **性能优化**：
> 预构建的依赖在浏览器端会启用强缓存机制（HTTP header: max-age=31536000），
> 显著提升开发环境下的加载性能。

## 🛠️ 自定义预构建配置

#### 📍 entries 入口配置

Vite 提供了灵活的入口点配置机制：

- 🔍 **默认行为**：

    - Vite 自动扫描 `index.html` 以检测预构建依赖
    - 会智能跳过 `node_modules` 和 `build.outDir` 目录

- 🎯 **自定义入口**：
    - 当配置了 `build.rollupOptions.input` 时，Vite 将使用这些入口点
    - 如需更精细的控制，可直接通过 `entries` 指定依赖入口

支持以下配置方式：

1. 📝 **基础配置**：直接指定具体文件路径

```js
export default defineConfig({
  optimizeDeps: {
    entries: ['src/main.js', 'src/main.js'] // 指定入口文件
  }
})
```

1. 🌟 **Glob 模式**：使用通配符匹配多个文件

```js
export default defineConfig({
  optimizeDeps: {
    entries: ['src/**/*.js'] // 匹配 src 目录下的所有 .js 文件
  }
})
```

1. ❌ **排除规则**：通过特定语法排除不需要的目录

```js
export default defineConfig({
  optimizeDeps: {
    entries: [
      'src/**/*.js',
      '!src/ignore/**/*.js' // 排除 src/ignore 目录下的所有.js 文件
    ]
  }
})
```

1. 配置 node_modules 的 includes excludes

## 🏗️ Vite 生产版本构建

### 📦 核心特性

1. **代码分割和动态导入**

2. **🌳 Tree Shaking**

3. **🔌 插件生态**

4. **⚙️ 动态控制和优化**

5. **✨ 生产优化**

```js
export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'dist', // 打包后的目录
    assetsDir: 'assets', // 静态资源的目录
    cssMinify: 'esbuild', // 压缩css
    minify: 'terser', // 压缩js
    sourcemap: 'inline' // 生成sourcemap文件
  }
})
```
