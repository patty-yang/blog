import { defineConfig } from 'vitepress';
import { readDirectory } from '../docs';

export default defineConfig({
  outDir: 'dist',
  lang: 'zh-CN',
  title: '小杨的进阶之路',
  description: ' ',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: '/logo.png',
    // nav: [
    // { text: 'Home', link: '/' },
    // { text: 'Examples', link: '/' }
    // ],
    sidebar: [
      // ...readDirectory('base'),
      // ...readDirectory('basic'),
      // ...readDirectory('books'),
      // ...readDirectory('progress'),
      // ...readDirectory('other'),
      ...readDirectory('rewrite'),
    ],
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
    },
  },
});
