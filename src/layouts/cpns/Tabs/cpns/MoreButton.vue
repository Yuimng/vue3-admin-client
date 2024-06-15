<template>
  <el-dropdown trigger="click" class="more-btn">
    <div class="down-box flx-center">
      <i class="iconfont icon-down"></i>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="closeCurrentTab">
          <span class="flx-center"><i class="iconfont icon-minus-circle"></i>关闭当前</span>
        </el-dropdown-item>
        <el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'left')">
          <span class="flx-center"><i class="iconfont icon-d-arrow-left"></i>关闭左侧</span>
        </el-dropdown-item>
        <el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'right')">
          <span class="flx-center"><i class="iconfont icon-d-arrow-right"></i>关闭右侧</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="tabsStore.closeMultipleTab(route.fullPath)">
          <span class="flx-center"><i class="iconfont icon-close-circle"></i>关闭其他</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="flx-center" @click="closeAllTab"
            ><i class="iconfont icon-fold-closed"></i>关闭全部</span
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { HOME_URL } from '@/config'
import { useTabsStore } from '@/stores/modules/tabs'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const tabsStore = useTabsStore()

const closeCurrentTab = () => {
  if (route.meta.isAffix) return
  tabsStore.removeTab(route.fullPath)
}

const closeAllTab = () => {
  tabsStore.closeMultipleTab()
  router.push(HOME_URL)
}
</script>

<style scoped lang="scss">
.down-box {
  width: 50px;
  height: 40px;
  border-left: 1px solid #e6e6e6;
  cursor: pointer;
}
</style>
