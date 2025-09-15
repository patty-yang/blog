import Theme from 'vitepress/theme'
import { h } from 'vue'
import Comment from '../../components/Comment.vue'
// import './common.css'
import './style.css'
import type { EnhanceAppContext } from 'vitepress'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'doc-after': () => h(Comment)
    })
  },
  enhanceApp(ctx: EnhanceAppContext) {
    Theme.enhanceApp(ctx)
  }
}
