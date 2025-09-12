## 🎯 为什么选择 ESBuild？

ESBuild 是一个极速的 JavaScript 打包器和压缩器，具有以下优势：

- **⚡ 极速构建**：比 Webpack 快 10-100 倍
- **🛠️ 零配置**：开箱即用，无需复杂配置
- **📦 多格式支持**：ESM、CJS、IIFE 等格式
- **🔄 热重载**：支持文件监听和实时构建
- **🎯 TypeScript 原生支持**：无需额外配置

## 🚀 快速开始

### 步骤 1️⃣：配置开发脚本

在 `package.json` 中添加开发脚本：

```json
{
  "scripts": {
    "dev": "node scripts/dev.js reactivity --format esm"
  }
}
```

这个命令会：

- 🚀 启动开发环境
- 👀 监听文件变动并实时构建
- 📦 以 ESM 格式输出到 `dist` 目录

### 步骤 2️⃣：创建构建脚本

新建 `scripts` 目录，并在里面创建 `dev.js` 文件：

```js
/**
 * 🔥 ESBuild 开发环境构建脚本
 *
 * 功能特性：
 * - 📁 支持多包构建（packages/*）
 * - 🎯 灵活的输出格式（ESM/CJS/IIFE）
 * - 👀 实时监听文件变化
 * - 🗺️ 自动生成 Source Map
 *
 * 使用示例：
 * node scripts/dev.js reactivity --format esm
 * node scripts/dev.js vue -f cjs
 */

import {parseArgs} from 'node:util'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import esbuild from 'esbuild'
import {createRequire} from 'node:module'

// 📝 解析命令行参数
const {
  values: {format},
  positionals,
} = parseArgs({
  allowPositionals: true,
  options: {
    format: {
      type: 'string',
      short: 'f',
      default: 'esm',
    },
  },
})

// 🔧 ESM 环境兼容性处理
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

// 🎯 确定构建目标
const target = positionals.length ? positionals[0] : 'vue'

// 📂 路径配置
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)
const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)

// 📦 读取包配置
const pkg = require(`../packages/${target}/package.json`)

// 🚀 启动 ESBuild 构建
esbuild
    .context({
      entryPoints: [entry],                    // 📥 入口文件
      outfile,                                 // 📤 输出文件
      format,                                  // 🎨 输出格式
      platform: format === 'cjs' ? 'node' : 'browser', // 🌐 目标平台
      sourcemap: true,                         // 🗺️ Source Map
      bundle: true,                            // 📦 打包依赖
      globalName: pkg.buildOptions?.name,      // 🏷️ 全局变量名
    })
    .then(ctx => ctx.watch()) // 👀 监听文件变化
```

## 📋 参数说明

| 参数                | 说明       | 可选值                           | 默认值   |
|-------------------|----------|-------------------------------|-------|
| 位置参数              | 指定要构建的包名 | `reactivity`, `vue`, `shared` | `vue` |
| `--format` / `-f` | 输出格式     | `esm`, `cjs`, `iife`          | `esm` |

## 🎨 输出格式对比

| 格式       | 用途            | 特点                     |
|----------|---------------|------------------------|
| **ESM**  | 现代浏览器、Node.js | 原生模块系统，Tree-shaking 友好 |
| **CJS**  | Node.js 环境    | CommonJS 格式，向后兼容       |
| **IIFE** | 浏览器直接引入       | 立即执行函数，全局变量            |

## 🚀 使用示例

```bash
# 构建 reactivity 包为 ESM 格式
pnpm dev reactivity --format esm

# 构建 vue 包为 CommonJS 格式
pnpm dev vue -f cjs

# 构建 shared 包为 IIFE 格式（浏览器直接使用）
pnpm dev shared --format iife
```

## 📁 输出结构

构建完成后，文件会输出到对应包的 `dist` 目录：

```
packages/
├── reactivity/
│   └── dist/
│       ├── reactivity.esm.js      # ESM 格式
│       ├── reactivity.cjs.js      # CommonJS 格式
│       └── reactivity.iife.js     # IIFE 格式
└── vue/
    └── dist/
        ├── vue.esm.js
        ├── vue.cjs.js
        └── vue.iife.js
```