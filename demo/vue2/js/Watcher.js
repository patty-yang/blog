import Dep from './Dep.js'

let queue = []
let set = new Set()
let pending = false

function flushSchedulerQueue() {
  queue.forEach(watcher => watcher.run())
  queue = []
  set.clear()
  pending = false
}

function queueWatcher(watcher) {
  if (!set.has(watcher)) {
    queue.push(watcher)
    set.add(watcher)
    if (!pending) {
      pending = true
      Promise.resolve().then(flushSchedulerQueue)
    }
  }
}

class Watcher {
  constructor(vm, el, vmKey) {
    this.vm = vm
    this.el = el
    this.vmKey = vmKey
    Dep.target = this
    this.run()
    Dep.target = null
  }

  update() {
    queueWatcher(this)
  }

  run() {

    if (this.el.nodeType === Node.TEXT_NODE) {
      this.el.nodeValue = this.vm[this.vmKey]
    } else if (this.el.nodeType === Node.ELEMENT_NODE) {
      this.el.innerHTML = this.vm[this.vmKey]
    }
  }
}

export default Watcher