import Vue from 'vue'
import { Search, PullRefresh, Toast, Card, Button, Stepper, Tag, Icon, SwipeCell,
   Tabbar, TabbarItem, SubmitBar, Checkbox, CheckboxGroup, Dialog, Loading, Popup,
   Notify, Overlay, Sidebar, SidebarItem } from 'vant'
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
// 通用工具
import util from '@/plugins/util'
// 全局组件
import '@/components/global'

Vue.use(Search)
  .use(PullRefresh)
  .use(Toast)
  .use(Card)
  .use(Button)
  .use(Stepper)
  .use(Tag)
  .use(Icon)
  .use(SwipeCell)
  .use(Tabbar)
  .use(TabbarItem)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Dialog)
  .use(Loading)
  .use(Popup)
  .use(Notify)
  .use(Overlay)
  .use(Sidebar)
  .use(SidebarItem)
Vue.prototype.$util = util
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')