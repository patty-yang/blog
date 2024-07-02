import Theme from 'vitepress/theme'
import Gitalk from '../../components/Gitalk.vue'
export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
    ctx.app.component('Gitalk', Gitalk)
    // app is an express instance
  }
}
