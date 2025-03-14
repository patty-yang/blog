import { defineConfig } from 'vitepress'
import { createSideBar } from '..'

const baseSideBarConfig = createSideBar('base')
const whiteCodeSideBarConfig = createSideBar('white-code')
const packageManageBarConfig = createSideBar('package-manage')

export default defineConfig({
  // https://vitepress.dev/reference/site-config#ignoredeadlinks
  cleanUrls: true,
  outDir: 'dist',
  lang: 'zh-CN',
  title: '小杨的进阶之路',
  description: ' ',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '前端积累', link: '/notes/base/' },
      { text: '手写代码', link: '/notes/white-code/' },
      { text: 'node', link: '/node/' },


      // { text: '首页', link: '/' },
      // {
      //   text: '长期积累',
      //   items: [
      //     { text: '笔记', link: '/notes/base/' },
      //     { text: '包管理器', link: '/notes/package-manage/' },
      //     // { text: 'vue', link: '/notes/vue/' },
      //     // { text: '重学typescript', link: '/notes/typescript/' },
      //     { text: '手写代码', link: '/notes/white-code/' }
      //     // { text: '读万卷书 行万里路', link: '/react/index' },
      //   ]
      // },
      // {
      //   text: '项目',
      //   items: [
      //     {
      //       text: '项目难点',
      //       link: '/notes/project/webpack'
      //     }
      //   ]
      // }
      // {
      //   text: '源码阅读',
      //   items: [
      //     {
      //       text: 'vue3',
      //       link: '/源码阅读记/vue3'
      //     }
      //   ]
      // }
    ],
    sidebar: {
      ...baseSideBarConfig,
      ...whiteCodeSideBarConfig,
      ...packageManageBarConfig
    },
    // socialLinks: [
    // {
    //   icon: 'github',
    //   link: 'https://github.com/SunnySeptemberBoy/SunnySeptemberBoy.github.io'
    // }
    // ],
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    search: {
      provider: 'local'
    }
  },
  vite: {
    server: {
      port: 1324
    }
  }
})
