import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    component: () => import('../views/Home')
  },
  {
    path: '/shop',
    name: 'shop',
    // component: Home
    component: () => import('../views/shop')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
