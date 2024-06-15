<template>
  <div class="chart-box">
    <ECharts :option="option" :resize="true" />
  </div>
</template>

<script setup lang="ts">
import ECharts from '@/components/ECharts/index.vue'
import { ECOption } from '@/components/ECharts/config'

const option: ECOption = {
  color: ['#fa5247', '#2b5aed'],
  title: {
    text: '上周来访车辆',
    show: true,
    left: 'center',
    top: '45%',
    textStyle: {
      fontWeight: 600,
      fontSize: 16
    }
  },
  grid: {
    top: '5%'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      type: 'pie',
      radius: ['45%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        fontSize: 14,
        formatter: '{b}:{c} 辆' //自定义显示格式(b:name, c:value, d:百分比)
      },
      data: [
        { value: 12, name: '外来车辆' },
        { value: 68, name: '区内车辆' }
      ]
    }
  ]
}
</script>
<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: 100%;
}
</style>
