<template>
  <div class="tool-bar-rt">
    <FullScreen />
    <div class="username">{{ username }}</div>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import FullScreen from './cpns/Fullscreen.vue'
import Avatar from './cpns/Avatar.vue'

const userStore = useUserStore()
const username = computed(() => userStore.userInfo.username)
</script>

<style scoped lang="scss">
.tool-bar-rt {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}
</style>
