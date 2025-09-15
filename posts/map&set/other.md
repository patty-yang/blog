---
title: vue 其他组件
date: 2024-05-06
tags:
  - vue
---

有点不知道怎么分类了， 先都放在这儿吧

> Referer: [Vue 官方文档](https://vuejs.ac.cn/guide/built-ins/suspense#combining-with-other-components)

---

## Vue Transition

优势:

1. 使用 transition，会自动控制一组特定样式类的挂载和移除，会让模版清爽很多。
2. 自动为元素添加/移除 CSS 类名
3. 集成第三方 CSS 动画库

- enter:

  - v-enter-from
  - v-enter-active
  - v-enter-to

- leave
  - v-leave-from
  - v-leave-active
  - v-leave-to

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <div>
    <button @click="show = !show">切换</button>

    <div :class="['fade', { active: show, leave: !show }]">
      <h1>动画</h1>
      <p>淡入淡出</p>
    </div>
  </div>
  <br />
  <Transition>
    <div v-if="show">
      <h1>Transition 动画</h1>
      <p>淡入淡出</p>
    </div>
  </Transition>
  <br />
  <Transition name="test">
    <div v-if="show">
      <h1>Transition 动画</h1>
      <p>淡入淡出</p>
    </div>
  </Transition>
  <br />
  <Transition name="bounce">
    <div v-if="show">
      <h1>Transition 动画</h1>
      <p>淡入淡出</p>
    </div>
  </Transition>
</template>

<style scoped lang="css">
.fade {
  transition: 3s;
}
.active {
  opacity: 1;
}
.leave {
  opacity: 0;
}
/* transition */

.v-enter-active,
.v-leave-active {
  transition: 3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}

/* name */
.test-enter-active,
.test-leave-active {
  transition: 3s;
}

.test-enter-from,
.test-leave-to {
  opacity: 0;
}

.test-enter-to,
.test-leave-from {
  opacity: 1;
}

.bounce-enter-active {
  animation: bounce-in 1s;
}

.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

## Teleport

将组件的部分模板"传送"到 DOM 树的任意位置。适合开发那些需要突破常规组件层级限制的场景，例如全局弹窗、消息提示、模态框等 UI 组件。
因为它可以避免模态框的样式受到父级元素 CSS 属性的影响，从而确保 UI 组件能够始终保持预期的展示效果。

```vue
<Teleport to="body">
  <div>
    内容
  </div>
</Teleport>
```

## 异步组件

在需要时才加载的组件（按需加载）

```js
const page = defineAsyncComponent(() => import('./x'))

const AsyncCom = defineAsyncComponent({
  loader: () => import(''),
  // 加载异步组件时显示的组件, 在内部加载时先执行
  loadingComponent: LoadingComponent,
  // 加载组件的延迟时间，默认: 200
  // 在网络较好的情况下，可能会造成闪烁，通过延迟来解决闪烁的问题
  delay: 200,
  // 加载失败的时候展示的组件，当返回的Promise发生错误的时候渲染
  errorComponent: ErrorComponent
})
```

## suspense

可以优雅地处理异步依赖加载状态。当我们的应用中包含多层级组件树，且各个组件都有异步依赖时，Suspense 能够在顶层统一管理这些加载状态。

### 支持的异步依赖类型

Suspense 可以处理以下两种异步依赖:

1. **异步 Setup 组件**

   - 包含异步 setup() 函数的组件
   - 在 `<script setup>` 中使用顶层 await 语法的组件

2. **异步组件**
   - 使用 `defineAsyncComponent` 定义的组件

### 插槽说明

Suspense 组件提供两个插槽:

- **默认插槽** (`#default`)

  - 用于展示异步组件的主要内容
  - 当所有异步依赖都完成加载后，组件进入"完成"状态
  - 此时会渲染默认插槽中的内容

- **后备插槽** (`#fallback`)
  - 用于展示加载状态的内容
  - 当任何异步依赖未完成时，组件处于"挂起"状态
  - 此时会渲染后备插槽中的内容
  - 常用于显示加载提示、骨架屏等

<!-- ### 使用建议

- 建议配合 `ErrorBoundary` 组件一起使用，以处理可能出现的错误状态
- 可以通过监听 `@pending`、`@resolve` 和 `@fallback` 事件来实现更细粒度的状态控制
- 在性能关键场景中，可以配合 `defineAsyncComponent` 的 `delay` 选项来避免闪烁 -->

```vue
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import Three from './three.vue'

const AsyncOne = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./one.vue'))
    }, 2000)
  })
})

const AsyncTwo = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./two.vue'))
    }, 2000)
  })
})

const onPending = () => {
  console.log('onPending')
}

const onResolve = () => {
  console.log('onResolve')
}
const onFullback = () => {
  console.log('onResolve')
}
</script>

<template>
  <Suspense @fullback="onFullback" @pending="onPending" @resolve="onResolve">
    <div>
      <AsyncOne />
      <AsyncTwo />
      <Three />
    </div>

    <template #fallback> Loading...</template>
  </Suspense>
</template>
```

## piniaPlugin

```js
export const myPiniaPlugin = () => {
  return {
    a: 'hello world'
  }
}

export const myPiniaPlugin2 = (ctx) => {
  const { store } = ctx
  store.test = 'this is custom'
}

const app = createApp(App)
const pinia = createPinia()

pinia.use(myPiniaPlugin)
pinia.use(myPiniaPlugin2)
```
