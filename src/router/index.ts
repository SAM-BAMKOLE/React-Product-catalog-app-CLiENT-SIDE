import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: false } // Protect this route
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/products/new',
      name: 'addProduct',
      component: () => import('@/views/AddProductView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/products/search',
      name: 'searchProducts',
      component: () => import('@/views/ProductSearch.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/products/:productId',
      name: 'updateProduct',
      component: () => import('@/views/UpdateProductView.vue'),
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.token) {
    return next({ path: '/login' })
  }

  next()
})

export default router
