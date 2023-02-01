import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      props: true
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateUserView.vue')
    }
  ]
})

export default router
