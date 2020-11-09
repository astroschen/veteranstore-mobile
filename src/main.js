import { createApp } from 'vue'
import { Search, PullRefresh, Toast, Card, Button, Stepper, Tag } from 'vant'
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
.use(store)
.use(router)
.mount('#app')