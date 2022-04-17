import Vue from 'vue'
import component from './component.vue'
const CompnentView = Vue.extend(component)

export default class detailListDia {
  constructor (data) {
    if (data.parentifarme === true && !(window.self === window.top) && window?.parent?.EventBus?.$emit) {
      // 开启iframe穿透（前提父级也有这个弹窗）
      // 定义$eventBusCablefun 方法为回调
      if (!data.$eventBusCablefun) {
        data.$eventBusCablefun = (res) => {
          this.resolvefun(res)
        }
      }
      window.parent.EventBus.$emit('globalDialogOpen', data)
    } else {
      this.vmInstance = new CompnentView({
        propsData: {
          ...data
        }
      }).$mount() // 根据模板创建一个面板
      this.vmInstance.savedatefun = this.savedatefun.bind(this)
      this.vmInstance.closefun = this.closefun.bind(this)
      document.body.appendChild(this.vmInstance.$el) // 将字符串模板生成的内容添加到DOM上
      // 打开回调
      if (data.opened) {
        data.opened(this.vmInstance)
      }
    }
    return new Promise((resolve, reject) => {
      this.resolvefun = resolve
      this.rejectfun = reject
    })
  }

  closefun (res) {
    this.resolvefun({ state: 'close', data: res })
    this.vmInstance.$destroy()
    this.vmInstance.show = false
  }

  savedatefun (res, state) {
    let returnstate = 'save'
    if (state) {
      returnstate = state
    }
    if (this.vmInstance) {
      this.resolvefun({ state: returnstate, data: res })
      this.vmInstance.show = false
      this.vmInstance.$nextTick(() => {
        this.vmInstance.$destroy()
      })
    }
  }

  // 关闭
  close () {
    this.vmInstance.closeFn()
  }
}
