import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [{
            path: '/home',
            name: 'home',
            component: Home//() => import('@/views/goods')
        },{
            path: '/goods',
            name: 'goods',
            component: () => import('@/views/goods')
        },{
            path: '/shop',
            name: 'shop',
            component: () => import('@/views/shop')
        },{
            path: '/user',
            name: 'user',
            component: () => import('@/views/user')
        }]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
