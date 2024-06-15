<template>
  <div class="card chart-box">
    <ECharts :option="option" />
  </div>
</template>

<script setup lang="ts" name="waterChart">
import { ECOption } from '@/components/ECharts/config'
import ECharts from '@/components/ECharts/index.vue'

const option = {
  series: [
    {
      type: 'liquidFill',
      data: [0.6, 0.5, 0.4, 0.3]
    }
  ]
} as ECOption
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
