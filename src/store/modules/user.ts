import { defineStore } from 'pinia'
import { UserState } from '@/store/interface'
import piniaPersistConfig from '@/store/helper/persist'
import { getUserInfoApi } from '@/api/modules/login'

export const useUserStore = defineStore({
  id: 'ym-user',
  state: (): UserState => ({
    token: '',
    expires: 0,
    userInfo: {
      id: 0,
      name: '',
      username: null,
      email: null,
      phone: null,
      avatar: null,
      remark: null,
      roleId: 0,
      role: '',
      roleName: '',
      isSuper: 0
    }
  }),
  getters: {},
  actions: {
    // Set Token
    setTokenWithExpires(token: string, expires: number) {
      this.token = token
      this.expires = expires
    },
    // Set setUserInfo
    async getUserInfo(userId: number) {
      if (userId) {
        const res = await getUserInfoApi(userId)
        if (res.code === 200) {
          this.userInfo = res.data
        }
      }
    }
  },
  persist: piniaPersistConfig('ym-user')
})
