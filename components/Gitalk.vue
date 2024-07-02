<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script setup>
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'

import { onMounted } from 'vue'

onMounted(() => {
  const commentConfig = {
    clientID: 'Ov23liMDUbgsWuwghnqf', // clientSecret
    clientSecret: '7999762f94d282389c2433094a05bb76cc6ff160', // clientSecret
    repo: 'blog', // 存放评论的仓库名
    owner: 'xiao_Yang', // github用户名
    admin: ['xiao_Yang'], // github管理者列表
    id: location.pathname,
    distractionFreeMode: false
  }
  const gitalk = new Gitalk(commentConfig)
  gitalk.render('gitalk-container')
})
</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
</style>
