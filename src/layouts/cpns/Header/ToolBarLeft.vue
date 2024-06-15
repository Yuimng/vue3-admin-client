<template>
  <div class="tool-bar-lf">
    <CollapseIcon />
    <BreadCrumb />
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from './cpns/CollapseIcon.vue'
import BreadCrumb from './cpns/BreadCrumb.vue'
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
}
</style>
