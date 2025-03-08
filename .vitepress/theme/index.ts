import Theme from 'vitepress/theme'
import Gitalk from '../../components/Gitalk.vue'

import './common.css'

import type {EnhanceAppContext} from 'vitepress'

export default {
  ...Theme,
  enhanceApp(ctx: EnhanceAppContext) {
    Theme.enhanceApp(ctx)
    ctx.app.component('Gitalk', Gitalk)
    // app is an express instance
  }
}
