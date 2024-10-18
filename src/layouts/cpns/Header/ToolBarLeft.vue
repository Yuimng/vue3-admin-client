<template>
  <div class="tool-bar-lf">
    <CollapseIcon />
    <BreadCrumb v-show="globalStore.breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from './cpns/CollapseIcon.vue'
import BreadCrumb from './cpns/BreadCrumb.vue'
import { useGlobalStore } from '@/stores/modules/global'

const globalStore = useGlobalStore()
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
}
</style>
