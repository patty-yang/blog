import Theme from 'vitepress/theme'
import { h } from 'vue'
import Gitalk from '../../components/Gitalk.vue'

import './common.css'

import type { EnhanceAppContext } from 'vitepress'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'doc-after': () => h(Gitalk)
    })
  },
  enhanceApp(ctx: EnhanceAppContext) {
    Theme.enhanceApp(ctx)
    ctx.app.component('Gitalk', Gitalk)
    // app is an express instance
  }
}
