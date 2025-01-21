/**
 * 表单存储类，用于处理表单数据的本地存储、同步和广播
 */
class FormStorage {
  /**
   * @param {string} formId - 表单唯一标识
   * @param {object} formData - 表单数据对象
   */
  constructor(formId, formData) {
    this.formId = formId
    this.storageKey = `form-storage-${formId}`
    this.formData = formData
    // 创建广播频道用于跨标签页通信
    this.channel = new BroadcastChannel('form_sync')
    this.debouncedSaveData = this.debounce(this.saveData, 300).bind(this)

    // 监听广播消息
    this.channel.onmessage = (event) => {
      const { formId, data } = JSON.parse(event.data)
      if (formId === this.formId) {
        this.syncData(data)
      } else if (formId === 'all') {
        this.clearData()
      }
    }
  }

  /**
   * 初始化方法，加载本地存储的数据
   */
  init() {
    this.loadData()
  }

  /**
   * 保存表单数据到本地存储并广播
   */
  saveData() {
    const data = JSON.stringify(this.formData.value)
    localStorage.setItem(this.storageKey, data)
    this.channel.postMessage(
      JSON.stringify({ formId: this.formId, data: this.formData.value })
    )
  }

  /**
   * 防抖函数
   * @param {Function} func - 需要防抖的函数
   * @param {number} wait - 等待时间(ms)
   * @returns {Function} 防抖后的函数
   */
  debounce(func, wait) {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }

  /**
   * 从本地存储加载数据
   */
  loadData() {
    const saveData = JSON.parse(localStorage.getItem(this.storageKey) || '{}')

    if (saveData) {
      for (const key in saveData) {
        if (Object.prototype.hasOwnProperty.call(this.formData.value, key)) {
          this.formData.value[key] = saveData[key]
        }
      }
    }
  }

  /**
   * 清除本地存储的数据
   */
  clearData() {
    localStorage.removeItem(this.storageKey)
    this.channel.postMessage(
      JSON.stringify({ formId: this.formId, data: null })
    )
  }

  /**
   * 同步数据到表单
   * @param {object} data - 需要同步的数据
   */
  syncData(data) {
    if (data) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(this.formData.value, key)) {
          this.formData.value[key] = data[key]
        }
      }
    }
  }
}

/**
 * FormStorage实例管理器
 * 负责管理所有FormStorage实例，处理页面生命周期相关的数据保存
 */
class FormStorageManager {
  static instances = []
  static isInitialized = false

  /**
   * 注册FormStorage实例
   * @param {FormStorage} instance - FormStorage实例
   */
  static register(instance) {
    FormStorageManager.instances.push(instance)
    if (!FormStorageManager.isInitialized) {
      window.addEventListener('beforeunload', FormStorageManager.saveAll)
      document.addEventListener(
        'visibilitychange',
        FormStorageManager.handleVisibilityChange
      )
      FormStorageManager.isInitialized = true
    }
  }

  /**
   * 保存所有实例的数据
   */
  static saveAll() {
    FormStorageManager.instances.forEach((instance) => instance.saveData())
  }

  /**
   * 处理页面可见性变化
   */
  static handleVisibilityChange() {
    if (document.hidden) {
      FormStorageManager.saveAll()
    }
  }
}

export default FormStorage
