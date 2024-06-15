<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="clickTab" @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useTabsStore } from '@/stores/modules/tabs'
import { useAuthStore } from '@/stores/modules/auth'
import { useRoute, useRouter } from 'vue-router'
import { TabPaneName, TabsPaneContext } from 'element-plus'
import MoreButton from './cpns/MoreButton.vue'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const authStore = useAuthStore()

const tabsMenuValue = ref(route.fullPath)
const tabsMenuList = computed(() => tabsStore.tabsMenuList)

onMounted(() => {
  initTabs()
})

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return
    tabsMenuValue.value = route.fullPath
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
      isKeepAlive: route.meta.isKeepAlive as boolean
    }
    tabsStore.addTab(tabsParams)
  },
  { immediate: true }
)

// 初始化需要固定的 tabs
const initTabs = () => {
  authStore.flatMenuListGet.forEach((item) => {
    if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix,
        isKeepAlive: item.meta.isKeepAlive
      }
      tabsStore.addTab(tabsParams)
    }
  })
}

const clickTab = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string
  router.push(fullPath)
}

const removeTab = (fullPath: TabPaneName) => {
  tabsStore.removeTab(fullPath as string, fullPath == route.fullPath)
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
