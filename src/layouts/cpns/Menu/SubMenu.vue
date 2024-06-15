<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <i class="menu-icon iconfont" :class="'icon-' + subItem.meta.icon"></i>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <i class="menu-icon iconfont" :class="'icon-' + subItem.meta.icon"></i>
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ menuList: Menu.MenuOptions[] }>()

const router = useRouter()
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
  router.push(subItem.path)
}
</script>

<style scoped lang="scss">
.menu-icon {
  margin-right: 5px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary);
  color: #fff;
}
</style>
