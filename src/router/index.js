import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home')
    }, {
      path: 'goods',
      name: 'goods',
      component: () => import('@/views/goods'),
    }, {
      path: 'addgoods',
      name: 'addgoods',
      component: () => import('@/views/goods/add'),
    }, {
      path: 'addgoods/:code',
      name: 'updategoods',
      props: true,
      component: () => import('@/views/goods/add'),
    }, {
      path: 'shop',
      name: 'shop',
      component: () => import('@/views/shop')
    }, {
      path: 'user',
      name: 'user',
      component: () => import('@/views/user')
    }]
  },
]

const router = new Router({
  routes
})

export default router
