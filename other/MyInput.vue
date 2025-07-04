<template>
  <div>
    <div>二次封装 input</div>

    <component
      :is="h(ElInput, { ...$attrs, ...props, ref: changeRef }, $slots)"
    />
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, h, type ComponentInternalInstance } from 'vue'
import { type InputProps, ElInput } from 'element-plus'

const vm = getCurrentInstance() as ComponentInternalInstance
// 这类型不知道是啥先写 any
const changeRef = (instance: any) => {
  vm.exposeProxy = vm.exposed = instance || {}
}
const props = defineProps<Partial<InputProps>>()
</script>
