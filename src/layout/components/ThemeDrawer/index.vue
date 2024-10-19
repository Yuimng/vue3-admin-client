<template>
  <el-drawer v-model="drawerVisible" title="布局设置" size="290px">
    <!-- 全局主题 -->
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker v-model="primary" :predefine="colorList" @change="changePrimary" />
    </div>
    <div class="theme-item">
      <span>暗黑模式</span>
      <SwitchDark />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DEFAULT_PRIMARY } from '@/config'
import { useGlobalStore } from '@/store/modules/global'
import { storeToRefs } from 'pinia'
import { useTheme } from '@/hooks/useTheme'
import mittBus from '@/utils/mittBus'
import SwitchDark from '@/components/SwitchDark/index.vue'

const globalStore = useGlobalStore()
const { primary } = storeToRefs(globalStore)

const { changePrimary } = useTheme()

// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  '#daa96e',
  '#0c819f',
  '#409eff',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6'
]

const drawerVisible = ref(false)
mittBus.on('openThemeDrawer', () => (drawerVisible.value = true))
</script>

<style scoped lang="scss">
@import './index';
</style>
