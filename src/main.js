import Vue from 'vue'
import {
  Search, PullRefresh, Toast, Card, Button, Stepper, Tag, Icon, SwipeCell, Picker,
  Tabbar, TabbarItem, SubmitBar, Checkbox, CheckboxGroup, Dialog, Loading, Popup,
  Notify, Overlay, Sidebar, SidebarItem, Sticky, Field, CellGroup, Uploader, Cell,
  Lazyload, List
} from 'vant'
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import axios from './plugins/axios/index'
import store from './store'
// 通用工具
import util from '@/plugins/util'
// 全局组件
import '@/components/global'
// js计算精度问题
import NP from 'number-precision'

Vue.use(Search)
  .use(PullRefresh)
  .use(Toast)
  .use(Card)
  .use(Button)
  .use(Stepper)
  .use(Tag)
  .use(Icon)
  .use(SwipeCell)
  .use(Picker)
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
  .use(Sticky)
  .use(Field)
  .use(CellGroup)
  .use(Uploader)
  .use(Cell)
  .use(Lazyload, { lazyComponent: true })
  .use(List)
Vue.prototype.$util = util
Vue.prototype.$http = axios
Vue.prototype.$np = NP
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')