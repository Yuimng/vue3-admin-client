import http from '@/api'
import { Menu, ResultTable, Role, User } from '@/typings'

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

export const getMenuList = (data: object) => {
  return http.post<Menu[]>('/menu/list', { ...data })
}
