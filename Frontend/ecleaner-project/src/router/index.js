import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/stores/auth-store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Guard de autenticação
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Inicializar autenticação se ainda não foi feita
    if (!authStore.token) {
      authStore.initializeAuth()
    }

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)
    const isAuthenticated = authStore.isAuthenticated

    if (requiresAuth && !isAuthenticated) {
      // Rota protegida, mas usuário não está autenticado
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else if (requiresGuest && isAuthenticated) {
      // Rota para convidados (login), mas usuário já está autenticado
      next('/')
    } else {
      // Permitir acesso
      next()
    }
  })

  return Router
})
