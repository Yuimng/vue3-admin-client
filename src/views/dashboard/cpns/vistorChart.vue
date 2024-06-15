<template>
  <div class="chart-box">
    <ECharts :option="option" :resize="true" />
  </div>
</template>

<script setup lang="ts">
import ECharts from '@/components/ECharts/index.vue'
import { ECOption } from '@/components/ECharts/config'

const data = {
  columns: getDates(),
  value: ['22', '35', '32', '23', '28', '52', '46']
}

function getDates() {
  let dates = []
  for (let i = 1; i <= 7; i++) {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - i)
    // 直接格式化为 "MM-dd" 格式
    const formattedDate =
      ('0' + (pastDate.getMonth() + 1)).slice(-2) + '-' + ('0' + pastDate.getDate()).slice(-2)
    dates.unshift(formattedDate)
  }
  return dates
}

const option: ECOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    }
  },
  legend: {
    right: '7%',
    top: '3%',
    itemWidth: 15,
    itemHeight: 6,
    align: 'auto',
    icon: 'rect'
  },
  grid: {
    top: '20%',
    left: '10%',
    right: '7%',
    bottom: '20%'
  },
  xAxis: [
    {
      // name: '上一周',
      type: 'category',
      boundaryGap: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#000'
        }
      },
      axisLabel: {
        color: '#000',
        padding: 0,
        fontSize: 12,
        formatter: function (data) {
          return data
        }
      },
      axisTick: {
        show: false
      },
      data: data.columns
    }
  ],
  yAxis: {
    name: '(人数)',
    nameTextStyle: {
      color: '#000',
      fontSize: 12,
      padding: [0, 30, 0, 0]
    },
    minInterval: 1,
    splitNumber: 5,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#eee'
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#000'
      }
    },
    axisLabel: {
      show: true,
      color: '#000',
      padding: 0
    },
    axisTick: {
      show: false
    }
  },
  series: {
    name: '上一周',
    type: 'line',
    symbol: 'circle',
    showSymbol: true,
    smooth: true,
    lineStyle: {
      // width: 1
      // color: data.colors[index],
      // borderColor: data.colors[index]
    },
    itemStyle: {
      // color: data.colors[index],
      borderColor: '#646ace',
      borderWidth: 2
    },
    tooltip: {
      show: true
    },
    data: data.value
  }
}
</script>
<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: 100%;
}
</style>
