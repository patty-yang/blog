```js
// store.js
import { reactive } from 'vue'

export const store = reactive({
  todos: [
    {
      id: '1',
      name: 'test'
    }
  ]
})
```

```vue
<!-- list.vue -->
<template>
  <div>
    <p v-for="item in todos" :key="item.id">{{ item.name }}</p>
  </div>
</template>

<script setup>
import { store } from '../store'
const todos = store.todos
</script>
```

```vue
<!-- add.vue -->
<template>
  <div>
    <input type="text" v-model="todoValue" />
    <button @click="addTodo">add</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store'

const todoValue = ref('')

const addTodo = () => {
  store.todos.push({
    id: new Date().toString(),
    name: todoValue.value
  })
}
</script>
```

其实也是拦截到了响应式数据的读取，添加了对应的依赖，在响应式数据更新的时候，重新运行 render 函数，然后渲染新的 DOM

所以 pinia 的好处在哪

- 开发工具支持
- 热更新
- 插件机制
- 自动补全
- SSR
- 语义上更符合，没有心智负担
  - 单独的 reactive 对象，语义上可能是任何东西
  - 一个 pinia 对象，语义上就是一个全局对象

也算是降低了开发的心智负担吧

<Gitalk />
