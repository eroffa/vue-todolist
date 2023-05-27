import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: route => ({ page: parseInt(route.query.page) || 1 })
    }
  ],
})

export default router
