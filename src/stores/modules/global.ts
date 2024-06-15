import { defineStore } from 'pinia'
import { GlobalState } from '@/stores/interface'
import piniaPersistConfig from '@/stores/helper/persist'
import { DEFAULT_PRIMARY } from '@/config'

export const useGlobalStore = defineStore({
  id: 'ym-global',
  state: (): GlobalState => ({
    isCollapse: false,
    primary: DEFAULT_PRIMARY
  }),
  getters: {},
  actions: {
    setCollapseState(state: boolean) {
      this.isCollapse = state
    },
    setPrimaryState(color: string) {
      this.primary = color
    }
  },
  persist: piniaPersistConfig('ym-global')
})
