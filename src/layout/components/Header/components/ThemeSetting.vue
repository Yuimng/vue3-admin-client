<template>
  <div class="theme-setting">
    <i class="icon-yifu toolbar-icon icon iconfont" @click="openDrawer"></i>
  </div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus'
const openDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>

<style lang="scss" scoped>
.toolbar-icon:hover {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
