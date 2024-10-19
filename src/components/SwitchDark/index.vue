<template>
  <el-switch v-model="globalStore.isDark" inline-prompt @change="switchDark" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from '@/hooks/useTheme'
import { useGlobalStore } from '@/store/modules/global'

const { switchDark } = useTheme()
const globalStore = useGlobalStore()
</script>
