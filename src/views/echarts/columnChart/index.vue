<template>
  <div class="card chart-box">
    <ECharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { ECOption } from '@/components/ECharts/config'
import ECharts from '@/components/ECharts/index.vue'

type ColumnData = {
  label: string
  value: number
}

const mockData: ColumnData[] = [
  {
    label: '分享量',
    value: 1344
  },
  {
    label: '评论量',
    value: 576
  },
  {
    label: '点赞量',
    value: 900
  }
]

const option: ECOption = {
  grid: {
    left: '3%',
    right: '4%',
    top: '6%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    data: mockData.map((item) => item.label)
  },
  series: [
    {
      type: 'bar',
      barWidth: 30,
      itemStyle: {
        color: '#1e84f0',
        borderRadius: [30, 30, 30, 30]
      },
      data: mockData.map((item) => item.value)
    }
  ]
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
