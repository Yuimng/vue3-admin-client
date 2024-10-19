import http from '@/api'
import { Login } from '@/api/interface'
import { Menu } from '@/api/interface/system'

/**
 * @description: 登录模块接口列表
 */

// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>('/login', params)
}

// 获取用户信息
export const getUserInfoApi = (userId: number) => {
  return http.get<Login.Userinfo>(`/user/${userId}`)
}

// 获取菜单列表
export const getAuthMenuListApi = () => {
  return http.post<Menu[]>(`/menu/list/`)
}

// 用户退出登录
// export const logoutApi = () => {
//   return http.post('/logout')
// }
