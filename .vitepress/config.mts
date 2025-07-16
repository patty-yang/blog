import { defineConfig } from 'vitepress'
import { createSideBar } from '..'

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
          },
          {
            text: 'react',
            link: '/docs/react/'
          },
          {
            text: '面试准备',
            link: '/docs/面试准备/'
          },
          { text: 'OAuth2', link: '/docs/OAuth2/' }
        ]
      },

      { text: '手写代码', link: '/docs/white-code/' },
      { text: '项目', link: '/docs/project/vite' },
      { text: '网络', link: '/docs/network/' }
    ],
    sidebar: {
      ...createSideBar('base'),
      ...createSideBar('white-code'),
      ...createSideBar('library'),
      ...createSideBar('vue'),
      ...createSideBar('project'),
      ...createSideBar('react'),
      ...createSideBar('面试准备'),
      ...createSideBar('network')
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
