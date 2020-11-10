import { createApp } from 'vue'
import { 
    Search, PullRefresh, Toast, Card, Button, Stepper, Tag, 
    SwipeCell, Tabbar, TabbarItem, SubmitBar,Checkbox, CheckboxGroup } from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
.use(Search)
.use(PullRefresh)
.use(Toast)
.use(Card)
.use(Button)
.use(Stepper)
.use(Tag)
.use(SwipeCell)
.use(Tabbar)
.use(TabbarItem)
.use(SubmitBar)
.use(Checkbox)
.use(CheckboxGroup)
.use(store)
.use(router)
.mount('#app')