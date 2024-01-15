// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: '/search/:search',
        name: 'search',
        component: () => import('@/pages/SearchPage.vue'),
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
