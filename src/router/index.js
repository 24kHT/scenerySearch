import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/hangzhou'
    },
    {
      path: '/hangzhou',
      component: () => import('@/views/weatherPage.vue')
    },
    {
      path: '/play',
      component: () => import('@/views/playSce.vue')
    },
    {
      path: '/star',
      component: () => import('@/views/aPage.vue')
    }
  ]
})

export default router
