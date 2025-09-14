## 什么是 Monorepo 🚀

- **一句话**: 把一堆相关项目放到同一个仓库里，一起管理、一起开发、一起发版。
- **类比**: 不再给每个项目开一个“文件夹（仓库）”，而是把它们放进一个“大文件夹”，里面每个项目还是独立的，但大家共用一套工具和规则。

## 为什么要用？✨

- **省心 🧹**: 统一依赖、统一工具（ESLint、Prettier、CI），不再每个仓库重复配置。
- **省时 ⏱️**: 跨项目改动一次提交就搞定，不用分多个仓库来回跑。
- **省空间 💾**: 依赖能被提升到根目录，磁盘不再被重复安装“吃空”。
- **省沟通 💬**: 代码在一起，联调、对齐版本、排查问题都更快。

### 什么时候用最合适？🎯

- **多个包/模块相互依赖**（如 `shared` -> `reactivity` -> `vue`）
- **需要统一标准**（统一 tsconfig/eslint/prettier/commit lint）
- **需要联动发版**（比如 A 改了，B 也要跟着发）

### 和 Multi-repo 的差别？🔍

- **Monorepo**: 一个仓库装很多包，管理更集中，跨包改动超顺滑。
- **Multi-repo**: 每个包一个仓库，隔离更强，但跨项目协作成本高。

---

## 典型目录结构（与你当前项目对齐）🗂️

```
minivue/
  packages/
    shared/
    reactivity/
    vue/
  pnpm-workspace.yaml
  package.json
```

---

## 易踩的坑与规避 ⚠️

- **坑1：子包没设 name 或版本 🧱**
    - 现象：workspace 链接不了，或者 filter 选不中
    - 解决：每个子包 `package.json` 必须有 `name`，版本可从简（如 `0.0.0`）

- **坑2：依赖循环 ♻️**（A 依赖 B，B 又依赖 A）
    - 现象：构建或运行异常、类型推断混乱
    - 解决：抽 `shared` 层，打破环，或下沉到更基础的包

- **坑3：路径引用混乱 🧭**
    - 现象：TS 能过但运行时找不到；或反之
    - 解决：统一用包名导入（`@vue/shared`），少用相对路径跨包

- **坑4：版本管理失控 📦**
    - 现象：某些包忘了升级，导致行为不一致
    - 解决：借助 changeset/自研脚本，或者简单粗暴：统一 `workspace:*`

---

## pnpm workspace 玩转 Monorepo 🧰

### 1) 根目录配置（只做一次）🏗️

- `pnpm-workspace.yaml`

```
packages:
  - packages/*
```

- 根 `package.json` 常见配置：

```
{
  "private": true,
  "packageManager": "pnpm@X.Y.Z",
  "scripts": {
    "build": "pnpm -r --filter ./packages... run build",
    "dev": "pnpm -r --parallel --filter ./packages/reactivity run dev"
  }
}
```

### 2) 子包如何相互引用 🔗

- 在子包 `package.json` 里：

```
{
  "dependencies": {
    "@vue/shared": "workspace:*"
  }
}
```

- 含义 📝：优先链接本仓库里的 `@vue/shared`，不从 npm 下载。

### 3) 常用命令 🛠️

- **安装依赖**（根目录执行）: `pnpm install`
- **按包执行脚本**: `pnpm --filter @scope/pkg run dev`
- **对全部包执行**: `pnpm -r run build`
- **只对依赖链执行**: `pnpm -r --filter @scope/pkg... run build`
- **装其他包** `pnpm install @vue/shared --workspace --filter reactivity`

---


