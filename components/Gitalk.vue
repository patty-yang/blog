<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script setup>
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'

import {onMounted} from 'vue'

import comment from "./commentConfig";

onMounted(() => {
  initGitalk()
})
const initGitalk = () => {
  const commentConfig = {
    ...comment,
    id: location.pathname,
    distractionFreeMode: false,
    createIssueManually: true // 如果当前页面没有相应的 isssue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
  }
  const gitalk = new Gitalk(commentConfig)
  gitalk.render('gitalk-container')
}
</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
</style>
