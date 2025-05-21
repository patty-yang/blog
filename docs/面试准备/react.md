## 🔄 React 架构演进

在 v15 版本之前，React 采用 Stack 架构，包含两个核心模块:

🏗️ Stack 架构时期的协调器(Reconciler)主要负责:

- Virtual DOM 的具体实现
- 处理 state 和 props 变化引发的 UI 更新计算
- mount 的组件会调用到 mountComponent，update 的组件会调用 UpdateComponent，这两个方法都会递归调用子组件，更新流程一旦开始就无法中断

而渲染器(Renderer)则负责将计算后的 UI 变化渲染到宿主环境。

🚧 随着应用规模不断扩大，Stack 架构暴露出明显的性能瓶颈:

CPU 方面:

- Virtual DOM 的差异比较采用递归方式
- JS 计算量大导致动画卡顿
- 实时更新的内容会出现视觉延迟

I/O 方面:

- 异步更新缺少优先级机制
- 文本输入等交互会有延迟
- 用户体验受到较大影响

🎯 为解决这些问题，React 团队在 v16 版本推出了全新的 Fiber 架构，包含三个核心模块:

⚡ 调度器(Scheduler):

- 为不同任务分配优先级
- 确保高优先级任务优先进入协调阶段

🔄 改进后的协调器(Reconciler):

- 优化了 Virtual DOM 的实现
- 引入了 Fiber 节点的概念
- 通过链表来串联节点关系:
  - child 指向子元素
  - sibling 指向兄弟元素
  - return 指向父元素

🎨 渲染器(Renderer)继续负责将计算结果渲染到宿主环境。

✨ Fiber 架构带来的核心改进:

实现了可中断的更新流程:

- 在循环过程中通过 shouldYield 检查时间片
- 支持更新流程的暂停和恢复
- 有效解决了 CPU 瓶颈问题

引入了优先级调度机制:

- 由 Scheduler 调度器统一管理任务优先级
- 确保高优先级任务优先处理
- 成功解决了 I/O 瓶颈问题
