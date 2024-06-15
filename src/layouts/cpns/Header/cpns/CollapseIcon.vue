<template>
  <div class="collapse-icon" @click="changeCollapse">
    <i class="toolbar-icon icon iconfont" :class="isCollapse ? 'icon-zhankai' : 'icon-shouqi'"></i>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global'
import { computed } from 'vue'

const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)

const changeCollapse = () => {
  globalStore.setCollapseState(!isCollapse.value)
}
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  cursor: pointer;
}
</style>
