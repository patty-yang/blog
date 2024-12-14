import { defineConfig } from 'vitepress';
import { readDirectory } from '..';

export default defineConfig({
  outDir: 'dist',
  lang: 'zh-CN',
  title: '小杨的进阶之路',
  description: ' ',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端积累',
        items: [
          { text: 'vue', link: '/vue/index' },
          { text: '每天学点ts', link: '/typescript/ts' },
          { text: '重学js', link: '/javascript/js' },
          { text: '读万卷书 行万里路', link: '/react/index' },
        ]
      },
      {
        text: '源码阅读',
        items: []
      }
    ],
    sidebar: {
      ...readDirectory('project'),
      ...readDirectory('books'),
      ...readDirectory('vue'),
    },
    socialLinks: [
      // {
      //   icon: 'github',
      //   link: 'https://github.com/SunnySeptemberBoy/SunnySeptemberBoy.github.io'
      // }
    ],
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
    search: {
      provider: 'local',
    }
  }
})
