import http from '@/api'

export interface User {
  id: number
  name: string
  username: string | null
  email: string | null
  phone: string | null
  avatar: string | null
  remark: string | null
  roleId: number
  role: string
  roleName: string
}

export interface Role {
  id: number
  role: string
  roleName: string
  isSuper: number
  remark: string
  createdAt: string
}

export interface ResultTable<T = any> {
  /** 总条目数 */
  count: number
  /** 列表数据 */
  rows: T[]
}

export const getUserList = (data: object) => {
  return http.post<ResultTable<User>>('/user/list', { ...data })
}

export const deleteUser = (id: number) => {
  return http.post('/user/delete', { id })
}

export const addUser = (data: object) => {
  return http.post('/user/add', { ...data })
}

export const editUser = (data: object) => {
  return http.post('/user/update', { ...data })
}

export const getRoleList = (data: object) => {
  return http.post<ResultTable<Role>>('/role/list', { ...data })
}

export const deleteRole = (id: number) => {
  return http.post('/role/delete', { id })
}
