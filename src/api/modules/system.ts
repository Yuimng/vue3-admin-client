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

export interface ResultTable {
  /** 总条目数 */
  count: number
  /** 列表数据 */
  rows: User[]
}

export const getUserList = (data: object) => {
  return http.post<ResultTable>('/user/list', { ...data })
}

export const deleteUser = (id: number) => {
  return http.post('/user/delete', { id })
}

export const addUser = (data: object) => {
  return http.post('/user/add', { ...data })
}
