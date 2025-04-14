import { createRouter, createWebHistory } from 'vue-router'
import Level from '../components/Level.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Level',
      component: Level
    }
  ]
})

export default router 