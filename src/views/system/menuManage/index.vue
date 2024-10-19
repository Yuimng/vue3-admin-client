<template>
  <div class="menu-manage">
    <div class="card search-container mb10">
      <el-form ref="searchFormRef" :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="菜单名称：">
          <el-input v-model="searchForm.title" placeholder="输入菜单名称" clearable />
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnable">
          <el-select v-model="searchForm.isEnable">
            <el-option
              v-for="item in enableOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">
            <i class="btn-icon mr4 iconfont icon-sousuo" /><span>搜索</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card table-container">
      <div class="table-btns mb18">
        <el-button type="primary" class="table-button" @click="handleNew">
          <i class="btn-icon mr4 iconfont icon-quanjia" /><span>新增菜单</span>
        </el-button>
      </div>
      <el-table class="table-content" :data="tableData" row-key="id" style="width: 100%">
        <el-table-column prop="meta.title" label="菜单名称" show-overflow-tooltip width="150" />
        <el-table-column prop="name" label="菜单name" show-overflow-tooltip width="150" />
        <el-table-column prop="sort" label="顺序" width="80" />
        <el-table-column prop="meta.icon" label="菜单图标" align="center" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center">
              <i class="iconfont" :class="'icon-' + scope.row.meta.icon"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="菜单路径" show-overflow-tooltip width="300" />
        <el-table-column prop="meta.isEnable" label="是否启用" width="100">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.meta.isEnable">开启</el-tag>
            <el-tag type="danger" v-else>关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="meta.isAffix" label="是否固定" width="100">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.meta.isAffix">开启</el-tag>
            <el-tag type="danger" v-else>关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="meta.isKeepAlive" label="是否缓存" width="100">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.meta.isKeepAlive">开启</el-tag>
            <el-tag type="danger" v-else>关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="meta.isLink" label="是否链接" width="100">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.meta.isLink">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="operation" label="操作" width="160" align="center">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEdit(row)">
              <i class="btn-icon mr4 iconfont icon-xiugai"></i> <span>编辑</span>
            </el-button>
            <el-popconfirm
              @confirm="handleDelete(row.id)"
              confirm-button-text="确认"
              cancel-button-text="否"
              title="确认删除该菜单?"
            >
              <template #reference>
                <el-button link type="primary" size="small">
                  <i class="btn-icon mr4 iconfont icon-shanchu"></i><span>删除</span>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <MenuDialog ref="menuDialogRef" @refresh="onSearch" />
  </div>
</template>
<script lang="ts" setup>
import MenuDialog from './components/menuDialog.vue'
import { onMounted, ref, reactive, toRaw } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { deleteMenu, getMenuList } from '@/api/modules/system'
import { Menu } from '@/api/interface/system'

onMounted(() => {
  onSearch()
})

const tableData = ref<Menu[]>([])

const searchFormRef = ref<FormInstance>()
const searchForm = reactive({
  title: '',
  isEnable: 2
})

const enableOptions = [
  {
    value: 2,
    label: '全部'
  },
  {
    value: 1,
    label: '开启'
  },
  {
    value: 0,
    label: '关闭'
  }
]

async function onSearch() {
  const { data } = await getMenuList(toRaw(searchForm))
  tableData.value = data
}

const handleDelete = async (id: number) => {
  const res = await deleteMenu(id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
  } else {
    onSearch()
    ElMessage.success(res.msg)
  }
}

const menuDialogRef = ref<InstanceType<typeof MenuDialog>>()
const handleNew = () => {
  menuDialogRef.value?.handleNew()
}
const handleEdit = (row: Menu) => {
  menuDialogRef.value?.handleEdit(row)
}
</script>

<style scoped lang="scss">
@import './index';
</style>
