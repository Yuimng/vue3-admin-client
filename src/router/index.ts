import { HOME_URL, LOGIN_URL } from '@/config'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { initDynamicRouter } from './dynamicRouter'
import NProgress from '@/utils/nprogress'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HOME_URL
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/layout',
    redirect: HOME_URL, // 重定向主页
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [
      // -----非全屏页面动态引入-----
    ]
  },

  // -----全屏页面引入-----

  // 错误页面
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/403.vue'),
    meta: {
      title: '403页面'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorMessage/404.vue'),
    meta: {
      title: '404页面'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/500.vue'),
    meta: {
      title: '500页面'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/ErrorMessage/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  // nprogress 启动
  NProgress.start()

  // 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (userStore.token && isTokenValid(userStore.expires)) return next(from.fullPath) // 保持原页面
    resetRouter() // 清除已加载动态路由
    return next()
  }

  // 判断是否有 Token，没有或者token过期 重定向到 login 页面
  if (!userStore.token || !isTokenValid(userStore.expires))
    return next({ path: LOGIN_URL, replace: true })

  // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.authMenuListGet.length) {
    const flag = await authStore.getAuthMenuList()
    if (flag) {
      // 动态加载路由
      await initDynamicRouter()
      return next({ ...to, replace: true })
    } else {
      return next({ path: LOGIN_URL, replace: true })
    }
  }

  next()
})

/**
 * @description 重置路由（全部清除）
 * */
export const resetRouter = () => {
  const authStore = useAuthStore()
  authStore.flatMenuListGet.forEach((route) => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
}

/**
 * token 是否有效
 * @param time token 过期时间
 * @returns boolean true:有效 / false:无效
 */
export const isTokenValid = (time: number) => {
  return time * 1000 > Date.now()
}

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done()
})

export default router
