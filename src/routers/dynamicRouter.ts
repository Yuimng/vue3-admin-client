import router from '@/routers/index'
import { useAuthStore } from '@/stores/modules/auth'
import { RouteRecordRaw } from 'vue-router'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

export const initDynamicRouter = async () => {
  const authStore = useAuthStore()
  try {
    // 添加动态路由  flatMenuListGet 递归将菜单全部平铺
    authStore.flatMenuListGet.forEach((item) => {
      if (item.children && item.children.length > 0) {
        item.redirect = item.children[0].path
      }
      item.children && delete item.children
      if (item.component && typeof item.component == 'string') {
        item.component = modules['/src/views' + item.component + '.vue']
      }
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw)
      } else {
        router.addRoute('layout', item as unknown as RouteRecordRaw)
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
