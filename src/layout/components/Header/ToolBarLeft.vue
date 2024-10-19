<template>
  <div class="tool-bar-lf">
    <CollapseIcon />
    <BreadCrumb v-show="globalStore.breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from './components/CollapseIcon.vue'
import BreadCrumb from './components/BreadCrumb.vue'
import { useGlobalStore } from '@/store/modules/global'

const globalStore = useGlobalStore()
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
}
</style>
