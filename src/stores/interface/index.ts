/* GlobalState */
export interface GlobalState {
  isCollapse: boolean
  primary: string
}

/* UserState */
export interface UserState {
  token: string
  expires: number
  userInfo: {
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
    isSuper: number
  }
}

/* AuthState */
export interface AuthState {
  routeName: string
  authButtonList: {
    [key: string]: string[]
  }
  authMenuList: Menu.MenuOptions[]
}

/* tabsMenuProps */
export interface TabsMenuProps {
  icon: string
  title: string
  path: string
  name: string
  close: boolean
  isKeepAlive: boolean
}

/* TabsState */
export interface TabsState {
  tabsMenuList: TabsMenuProps[]
}

/* keepAliveState */
export interface KeepAliveState {
  keepAliveNames: string[]
}
