---
title: vue 插槽
date: 2024-05-03
tags:
- vue
---


## 插槽

```vue
<template>
  <Child>
    <div>default</div>
    <template v-slot:header>
      <div>header</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
  </Child>
</template>

<script setup>
import Child from './test.js'
</script>
```

```js
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup(_, { slots }) {
    console.log('🚀 ~ setup ~ slots:', slots)
    return () =>
      h('div', {}, [
        h('div', {}, slots.default?.()),
        h('div', {}, slots.header?.()),
        h('div', {}, slots.footer?.())
      ])
  }
})
```

![slot](https://raw.githubusercontent.com/patty-yang/pic/img/test/202503232024619.png)
