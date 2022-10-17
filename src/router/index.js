import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index'),
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
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404')
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  // 有token
  console.log('-----------', to.matched)
  if (store?.state?.user?.access_token) {
    if (to.path === '/login') {
      next({ path: '/', query: to.query })
    } else {
      // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
      if (to.matched.length === 0) {
        next('/404')
      }
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login',
      })
    }
  }
})

export default router
