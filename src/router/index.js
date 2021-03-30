import Vue from 'vue'
import VueRouter from 'vue-router'
import authRoutes from '@/modules/auth/router'
import dashboardRoutes from '@/modules/dashboard/router'
import AuthService from '@/modules/auth/services/auth-service'
import { AUTH_TOKEN } from '@/plugins/apollo'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...authRoutes,
    ...dashboardRoutes,
    { path: '', redirect: '/login' }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    const loginRoute = {
      path: '/login',
      query: { redirect: to.fullPath } // pegando url quando usuario tentou acessar sem estar logado
    }
    if (token) {
      try {
        await AuthService.user({ fetchPolicy: 'network-only' })
        return next()
      } catch (error) {
        console.log('Auto login error: ', error)
        return next(loginRoute)
      }
    }
    return next(loginRoute)
  }
  next()
})

export default router
