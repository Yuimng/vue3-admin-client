import http from '@/api'
import { Department, Menu, ResultTable, Role, User } from '@/api/interface/system'
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

export const getRolesAll = () => {
  return http.post<Role[]>('/role/listAll')
}

export const getRoleList = (data: object) => {
  return http.post<ResultTable<Role>>('/role/list', { ...data })
}

export const deleteRole = (id: number) => {
  return http.post('/role/delete', { id })
}

export const addRole = (data: object) => {
  return http.post('/role/add', { ...data })
}

export const editRole = (data: object) => {
  return http.post('/role/update', { ...data })
}

export const getRoleMenus = (roleId: number) => {
  return http.post<number[]>('/role/useMenus', { roleId })
}

export const getMenusAll = () => {
  return http.post<Menu[]>('/menu/listAll')
}

export const getMenuList = (data: object) => {
  return http.post<Menu[]>('/menu/list', { ...data })
}

export const deleteMenu = (id: number) => {
  return http.post('/menu/delete', { id })
}

export const addMenu = (data: object) => {
  return http.post('/menu/add', { ...data })
}

export const editMenu = (data: object) => {
  return http.post('/menu/update', { ...data })
}

export const getDepartmentsAll = () => {
  return http.post<Department[]>('/department/listAll')
}

export const deleteDept = (id: number) => {
  return http.post('/department/delete', { id })
}

export const addDept = (data: object) => {
  return http.post('/department/add', { ...data })
}

export const editDept = (data: object) => {
  return http.post('/department/update', { ...data })
}
