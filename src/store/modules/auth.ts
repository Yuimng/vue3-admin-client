import { defineStore } from 'pinia'
import { AuthState } from '@/store/interface'
import { getAuthMenuListApi } from '@/api/modules/login'
import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from '@/utils'

// import { useUserStore } from '@/store/modules/user'
// import router from '@/router'
// import { LOGIN_URL } from '@/config'
import { ElMessage } from 'element-plus'

export const useAuthStore = defineStore({
  id: 'ym-auth',
  state: (): AuthState => ({
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: ''
  }),
  getters: {
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: (state) => state.authMenuList,
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: (state) => getFlatMenuList(state.authMenuList),
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isEnable === 0
    showMenuListGet: (state) => getShowMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: (state) => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    async getAuthMenuList() {
      try {
        const res = await getAuthMenuListApi()
        if (res.code === 200) {
          if (res.data.length === 0) {
            // 菜单列表为空，则跳转到登录页
            ElMessage.error('角色菜单列表为空，联系管理员')
            return false
          } else {
            // 成功获取菜单列表
            this.authMenuList = res.data
            return true
          }
        } else {
          ElMessage.error(res.msg)
          // 获取菜单失败 则跳转到登录页
          return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
})
