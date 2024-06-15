<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbList" :key="item.path">
      <el-breadcrumb-item :to="{ path: item.path }" @click="onBreadcrumbClick(item.path)">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { HOME_URL } from '@/config'
import router from '@/routers'
import { useAuthStore } from '@/stores/modules/auth'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()

const route = useRoute()

const breadcrumbList = computed(() => {
  let breadcrumbData = authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path]
  if (breadcrumbData[0].path !== HOME_URL) {
    breadcrumbData = [{ path: HOME_URL, meta: { title: '主面板' } }, ...breadcrumbData]
  }
  return breadcrumbData
})

const onBreadcrumbClick = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss"></style>
