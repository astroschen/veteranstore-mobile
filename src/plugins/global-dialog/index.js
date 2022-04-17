import DialogBox from '@/components/kt-title-dialogbox'
import store from '@/store'
// 引入全局弹窗方法

// 定义 Loading 对象
const Loading = {
  // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
  install (Vue, newvue) {
    window.EventBus = newvue
    const receiveMessage = (ifarmedata) => {
      // 开启弹窗
      new DialogBox({
        ...ifarmedata
      }).then(res => {
        if (ifarmedata?.$eventBusCablefun) {
          ifarmedata.$eventBusCablefun(res)
        }
      })
    }
    // 全局注册事件总线
    newvue.$on('globalDialogOpen', receiveMessage)
    Vue.prototype.$dialogbox = DialogBox
    Vue.prototype.$store = store
  }
}
// 导出
export default Loading
