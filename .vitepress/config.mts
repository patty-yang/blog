import { defineConfig } from 'vitepress'
import { createSideBar } from '..'

const baseSideBarConfig = createSideBar('base')
const whiteCodeSideBarConfig = createSideBar('white-code')
const librarySideConfig = createSideBar('library')
const vueSideConfig = createSideBar('vue')

export default defineConfig({
  // https://vitepress.dev/reference/site-config#ignoredeadlinks
  cleanUrls: true,
  outDir: 'dist',
  lang: 'zh-CN',
  title: '小杨的进阶之路',
  description: ' ',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config d
    logo: '/logo.png',
    nav: [
      {
        text: '前端积累',
        items: [
          {
            text: '基础知识',
            link: '/docs/base/'
          },
          {
            text: 'vue',
            link: '/docs/vue/'
          }
        ]
      },
      { text: '手写代码', link: '/docs/white-code/' },
      { text: 'node', link: '/node/' },
      { text: '组件库搭建', link: '/docs/library/' }

      // { text: '首页', link: '/' },
      // {
      //   text: '长期积累',
      //   items: [
      //     { text: '笔记', link: '/docs/base/' },
      //     { text: '包管理器', link: '/docs/package-manage/' },
      //     // { text: 'vue', link: '/docs/vue/' },
      //     // { text: '重学typescript', link: '/docs/typescript/' },
      //     { text: '手写代码', link: '/docs/white-code/' }
      //     // { text: '读万卷书 行万里路', link: '/react/index' },
      //   ]
      // },
      // {
      //   text: '项目',
      //   items: [
      //     {
      //       text: '项目难点',
      //       link: '/docs/project/webpack'
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
      ...librarySideConfig,
      ...vueSideConfig
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
