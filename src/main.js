import Vue from 'vue'
import { Search, PullRefresh, Toast, Card, Button, Stepper, Tag, Icon, SwipeCell,
   Tabbar, TabbarItem, SubmitBar, Checkbox, CheckboxGroup, Dialog, Loading, Popup,
   Notify } from 'vant'
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import util from '@/plugins/util'

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
Vue.prototype.$util = util
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')