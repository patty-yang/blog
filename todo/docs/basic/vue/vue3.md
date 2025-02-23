## 响应式

- vue2

```javascript
const initData = {
  value: 1
}

const data = {}
Object.keys(initData).forEach((key) => {
  Object.defineProperty(data, key, {
    get() {
      console.log('当前访问的key:', key)
      return initData[key]
    },
    set(v) {
      initData[key] = v
    }
  })
})

// data.value -> 1
// data.value2 = 3
// data.value2  -> undefined

this.$set(data, value2, 3)
```

<!-- 响应式的依赖收集 -->

```js
// set 给对象上添加一个响应式的属性，并触发视图的更新
// 源代码
// 针对数组的操作，splice
target.splice(key, 1, value)
// 如果是对象 存在此属性  直接更新

// 判断是不是 响应式__ob__
// 不是的话 return val
// 是响应式的话进行依赖收集 并触发视图更新
```

- vue3

## 异步组件

```javascript
const AsyncComponent = defineAsyncComponent(() => import('./async'))
  // react
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
```

## teleport

- 将子节点父节点以外的 DOM
- react -> createPortal

```vue
<template>
  <div class="portals">
    <button @click="showDialog">click</button>
    <Teleport to="body">
      <span v-if="isOpen"></span>
    </Teleport>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

let closePopup

const showDialog = () => {
  isOpen.value = true
  clearTimeout(closePopup)
  closePopup = setTimeout(() => {
    isOpen.value = false
  }, 2000)
}
</script>
```
