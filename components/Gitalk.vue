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
  initGitalk()
})
const initGitalk = () => {
  const commentConfig = {
    clientID: 'Ov23li1WG4ZVErHQjhUW',
    clientSecret: 'f450fd978317dcf928bd4fc8280315c440e167d8',
    repo: 'blog', // 存放评论的仓库名
    owner: 'SunnySeptemberBoy', // github用户名
    admin: ['SunnySeptemberBoy'], // github管理者列表
    id: location.pathname,
    distractionFreeMode: false,
    createIssueManually: true //如果当前页面没有相应的 isssue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
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
