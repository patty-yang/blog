import {defineConfig} from 'vitepress'

import {createSideBar} from './theme/utils/createSideBar'

const sideBarConfig = createSideBar()

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
      {text: '从古至今', link: '/docs/timeline'},
      {text: "笔记", link: '/notes/basic/js-basics'},
      {text: "读书", link: '/docs/books/程序员工作法'},
    ],
    sidebar: sideBarConfig,
    // socialLinks: [
    //   {
    //     icon: 'github',
    //     link: 'https://github.com/SunnySeptemberBoy/SunnySeptemberBoy.github.io'
    //   }
    // ],
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
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
