/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import AdminLayout from '@/layouts/AdminLayout.vue'

import Login from '@/pages/Login.vue'
import Students from '@/pages/Students.vue'
import { useAuthStore } from '@/store'

const routes = [
  {
    path: '/',
    component: Login, // Login sem layout
  },
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: 'students',
        component: Students,
      },
      // outras rotas protegidas aqui
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    return next()
  }

  const authStore = useAuthStore()

  const token = authStore.token

  if (!token) {
    // Se não estiver logado, redireciona para a página inicial
    return next({ path: '/' })
  }

  // Se estiver logado, permite acesso
  next()
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
