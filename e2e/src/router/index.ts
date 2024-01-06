import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/v-drag',
    name: 'v-drag',
    component: () => import('../views/VDrag.vue'),
  },
  {
    path: '/v-drop',
    name: 'v-drop',
    component: () => import('../views/VDrop.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
