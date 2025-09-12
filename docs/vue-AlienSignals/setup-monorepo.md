## 🚀 快速开始

### 步骤 1️⃣：项目初始化

```bash
# 1) 初始化仓库
pnpm init

# 2) 创建 workspace 文件
cat > pnpm-workspace.yaml <<'YAML'
packages:
  - packages/*
YAML

# 3) 创建 packages 目录
mkdir -p packages
```

### 步骤 2️⃣：TypeScript 配置

```bash
# 4) 安装 TypeScript（工作区层级）
pnpm add -D typescript -w

# 5) 初始化 tsconfig（在仓库根目录）
npx tsc --init
```

**配置 `tsconfig.json`**：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    // 指定 ECMAScript 目标版本
    "module": "ESNext",
    // 指定模块代码生成规范
    "moduleResolution": "node",
    // 指定模块解析策略
    "outDir": "dist",
    // 指定编译输出的目录
    "resolveJsonModule": true,
    // 允许导入 JSON 文件
    "strict": false,
    // 关闭严格模式
    "lib": [
      "ESNext",
      "DOM"
    ],
    // 指定要使用的库文件
    "paths": {
      "@vue/*": [
        "packages/*/src"
      ]
    },
    "baseUrl": "./"
  }
}
```

### 步骤 3️⃣：目录结构搭建

```bash
# 7) 创建和 Vue 一样的目录结构
mkdir -p packages/shared/src packages/reactivity/src packages/vue/src

# 8) 为了拥有和 Vue 一样的体验，将 Vue 中的 package.json 复制到每一个包中
```

### 步骤 4️⃣：开发工具链

```bash
# 安装 ESLint + Prettier（工作区）
pnpm add -D eslint prettier -w

# 安装 Changesets（版本与发包管理）
pnpm add -D @changesets/cli -w
pnpm changeset init

# 安装 Turbo（任务编排加速，多包缓存）
pnpm add -D turbo -w
```

## 📁 项目结构

```
your-monorepo/
├── packages/
│   ├── shared/          # 共享工具库
│   │   └── src/
│   ├── reactivity/      # 响应式系统
│   │   └── src/
│   └── vue/            # 主框架
│       └── src/
├── pnpm-workspace.yaml
├── tsconfig.json
└── package.json
```

## 📦 包配置示例

### `packages/reactivity/package.json`

```json
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "description": "响应式模块",
  "main": "index.js",
  "module": "dist/reactivity.esm.js",
  "files": [
    "index.js",
    "dist"
  ],
  "sideEffects": false,
  "buildOptions": {
    "name": "VueReactivity",
    "formats": [
      "esm-bundler",
      "esm-browser",
      "cjs",
      "global"
    ]
  }
}
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - packages/*
```





