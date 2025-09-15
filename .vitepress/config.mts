import {defineConfig} from 'vitepress'
import {createSideBar} from '..'

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
      {text: '笔记', link: '/docs/white-code/'},
      {
        text: '归档',
        items: [
          {text: '项目', link: '/docs/project/form'},
          {text: '网络', link: '/docs/network/'},
          {text: '组件库', link: '/docs/library/'},
        ]
      },

      // { text: 'build', link: '/docs/build/' },
    ],
    sidebar: {
      ...createSideBar('library'),
      ...createSideBar('project'),
      ...createSideBar('network'),
    },
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
