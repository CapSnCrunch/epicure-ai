// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (HomePage-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: '/recipe/:recipeId',
        name: 'recipe',
        component: () => import('@/pages/RecipePage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
