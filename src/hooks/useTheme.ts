import { DEFAULT_PRIMARY } from '@/config'
import { useGlobalStore } from '@/store/modules/global'
import { getDarkColor, getLightColor } from '@/utils/color'
import { storeToRefs } from 'pinia'

export const useTheme = () => {
  const globalStore = useGlobalStore()
  const { isDark, primary } = storeToRefs(globalStore)

  // 切换暗黑模式 ==> 同时修改主题颜色、侧边栏、头部颜色
  const switchDark = () => {
    const html = document.documentElement as HTMLElement
    if (isDark.value) html.setAttribute('class', 'dark')
    else html.setAttribute('class', '')
    changePrimary(primary.value)
  }

  // 修改主题颜色
  const changePrimary = (val: string | null) => {
    if (!val) {
      val = DEFAULT_PRIMARY
    }
    document.documentElement.style.setProperty('--el-color-primary', val)
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    )
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value
        ? `${getDarkColor(val, i / 10)}`
        : `${getLightColor(val, i / 10)}`
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
    }

    globalStore.setPrimaryState(val)
  }

  const initTheme = () => {
    switchDark()
    changePrimary(primary.value)
  }

  return {
    switchDark,
    changePrimary,
    initTheme
  }
}
