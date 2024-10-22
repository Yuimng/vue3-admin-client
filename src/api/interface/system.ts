export interface User {
  id: number
  name: string
  username: string | null
  deptId: number
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

export interface Menu {
  id: number
  name: string
  path: string
  component: string | (() => Promise<unknown>)
  redirect?: string
  parentId: number
  sort: number
  meta: MetaProps
  createdAt: string
  children?: Menu[]
}

export interface MetaProps {
  icon: string
  title: string
  isLink: boolean
  isEnable: boolean
  isAffix: boolean
  isKeepAlive: boolean
}

export interface ResultTable<T = any> {
  /** 总条目数 */
  count: number
  /** 列表数据 */
  rows: T[]
}

export interface Department {
  id: number
  parentId: number
  name: string
  sort: number
  isEnable: number
  createdAt: string
  children?: Department[]
}
