import { defineStore } from 'pinia'
import { TabsMenuProps, TabsState } from '@/store/interface'
import piniaPersistConfig from '@/store/helper/persist'
import router from '@/router'
import { useKeepAliveStore } from '@/store/modules/keepAlive'

const keepAliveStore = useKeepAliveStore()

export const useTabsStore = defineStore({
  id: 'ym-tabs',
  state: (): TabsState => ({
    tabsMenuList: []
  }),
  getters: {},
  actions: {
    // 添加tab
    async addTab(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every((item) => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem)
      }
      // keepalive
      if (!keepAliveStore.keepAliveNames.includes(tabItem.path) && tabItem.isKeepAlive) {
        keepAliveStore.addKeepAlive(tabItem.path)
      }
    },
    // 移除tab
    async removeTab(tabPath: string, isCurrent: boolean = true) {
      if (isCurrent) {
        this.tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return
          const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1]
          if (!nextTab) return
          router.push(nextTab.path)
        })
      }

      // keepalive
      const tabItem = this.tabsMenuList.find((item) => item.path === tabPath)
      tabItem?.isKeepAlive && keepAliveStore.removeKeepAlive(tabItem.path)

      this.tabsMenuList = this.tabsMenuList.filter((item) => item.path !== tabPath)
    },
    async closeTabsOnSide(tabPath: string, type: 'left' | 'right') {
      const currentIndex = this.tabsMenuList.findIndex((item) => item.path === tabPath)
      if (currentIndex !== -1) {
        const range =
          type === 'left' ? [0, currentIndex] : [currentIndex + 1, this.tabsMenuList.length]
        this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
          return index < range[0] || index >= range[1] || !item.close
        })
      }
      // keepAlive
      const keepAliveList = this.tabsMenuList.filter((item) => item.isKeepAlive)
      keepAliveStore.setKeepAliveNames(keepAliveList.map((item) => item.path))
    },
    // 关闭多个tab
    async closeMultipleTab(tabPath?: string) {
      this.tabsMenuList = this.tabsMenuList.filter((item) => {
        return item.path === tabPath || !item.close
      })
      // keepAlive
      const keepAliveList = this.tabsMenuList.filter((item) => item.isKeepAlive)
      keepAliveStore.setKeepAliveNames(keepAliveList.map((item) => item.path))
    },

    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList
    }
  },
  persist: piniaPersistConfig('ym-tabs')
})
