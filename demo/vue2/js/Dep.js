class Dep {
  constructor() {
    this.subs = [] // 收集所有的 watcher
  }

  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    // 通知 watcher 更新
    this.subs.forEach(sub => sub.update())
  }

}

Dep.target = null  //  记录当前 watcher
export default Dep