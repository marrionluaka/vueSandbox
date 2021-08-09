import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { INTERCOM, SEARCH } from './routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/intercom',
    name: INTERCOM,
    component: () => import('@/views/Intercom.vue')
  },
  {
    path: '/search',
    name: SEARCH,
    component: () => import('@/views/Search.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
