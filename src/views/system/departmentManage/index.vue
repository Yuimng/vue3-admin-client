<template>
  <div class="card department-manage">
    <div class="table-btns mb18">
      <el-button type="primary" class="table-button" @click="handleNew">
        <i class="btn-icon mr4 iconfont icon-quanjia" /><span>新增部门</span>
      </el-button>
    </div>
    <el-table
      default-expand-all
      class="table-content"
      :data="tableData"
      row-key="id"
      style="width: 100%"
    >
      <el-table-column prop="name" label="部门名称" show-overflow-tooltip />
      <el-table-column prop="id" label="部门ID" show-overflow-tooltip />
      <el-table-column prop="sort" label="顺序" />
      <!-- <el-table-column prop="isEnable" label="是否启用">
        <template #default="{ row }">
          <el-tag type="success" v-if="row.isEnable">开启</el-tag>
          <el-tag type="danger" v-else>关闭</el-tag>
        </template>
      </el-table-column> -->

      <el-table-column fixed="right" prop="operation" label="操作" width="160" align="center">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row)">
            <i class="btn-icon mr4 iconfont icon-xiugai"></i> <span>编辑</span>
          </el-button>
          <el-popconfirm
            @confirm="handleDelete(row.id)"
            confirm-button-text="确认"
            cancel-button-text="否"
            title="确认删除该部门?"
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
    <DepartmentDialog ref="deptDialogRef" @refresh="onSearch" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Department } from '@/api/interface/system'
import { deleteDept, getDepartmentsAll } from '@/api/modules/system'

import DepartmentDialog from './components/departmentDialog.vue'
onMounted(() => {
  onSearch()
})

const tableData = ref<Department[]>([])

async function onSearch() {
  const { data } = await getDepartmentsAll()
  tableData.value = data
}

const handleDelete = async (id: number) => {
  const res = await deleteDept(id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
  } else {
    onSearch()
    ElMessage.success(res.msg)
  }
}

const deptDialogRef = ref<InstanceType<typeof DepartmentDialog>>()
const handleNew = () => {
  deptDialogRef.value?.handleNew()
}
const handleEdit = (row: Department) => {
  deptDialogRef.value?.handleEdit(row)
}
</script>

<style scoped lang="scss">
.department-manage {
  height: 100%;
}
</style>
