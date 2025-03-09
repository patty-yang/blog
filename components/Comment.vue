<template>
  <!-- params generate in https://giscus.app/zh-CN -->
  <Giscus
    v-if="showComment"
    repo="patty-yang/blog"
    repo-id="R_kgDOLCd40w"
    category="Announcements"
    category-id="DIC_kwDOLCd4084Cnupb"
    mapping="title"
    strict="1"
    reactions-enabled="1"
    emit-metadata="1"
    input-position="bottom"
    theme="preferred_color_scheme"
    lang="zh-CN"
    loading="lazy"
    crossorigin="anonymous"
  />
</template>
<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import Giscus from '@giscus/vue'

const route = useRoute()

const showComment = ref(true)
watch(
  () => route.path,
  () => {
    showComment.value = false
    nextTick(() => {
      showComment.value = true
    })
  },
  {
    immediate: true
  }
)
</script>
