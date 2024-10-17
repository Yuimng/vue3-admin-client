<template>
  <el-container class="layout">
    <el-aside>
      <div class="aside" :style="{ width: isCollapse ? '65px' : '210px' }">
        <div class="logo">
          <img class="logo-img" src="@/assets/images/logo.png" alt="logo" />
          <span v-show="!isCollapse" class="logo-text">YM-Admin</span>
        </div>
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
  <ThemeDrawer />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useGlobalStore } from '@/stores/modules/global'
import SubMenu from './cpns/Menu/SubMenu.vue'
import ToolBarLeft from './cpns/Header/ToolBarLeft.vue'
import ToolBarRight from './cpns/Header/ToolBarRight.vue'
import Main from './cpns/Main/index.vue'
import ThemeDrawer from './cpns/ThemeDrawer/index.vue'

const route = useRoute()
const authStore = useAuthStore()
const globalStore = useGlobalStore()

const menuList = computed(() => authStore.showMenuListGet)

const isCollapse = computed(() => globalStore.isCollapse)

// const activeMenu = computed(
//   () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
// )
const activeMenu = computed(() => route.path)
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
