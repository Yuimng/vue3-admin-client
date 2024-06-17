// 请求响应参数（不包含data）
export interface Result {
  code: number
  msg: string
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
    expires7d: boolean
  }
  export interface ResLogin {
    id: number
    username: string
    token: string
    expires: number
  }
  export interface Userinfo {
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
