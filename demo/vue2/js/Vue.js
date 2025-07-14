import {compiler, observer} from './utils.js'

class Vue {
  constructor(options) {
    this.$el = options.el;
    observer(this, options.data)
    compiler(this)
  }

  static nextTick(cb) {
    Promise.resolve().then(cb)
  }
}

export default Vue;