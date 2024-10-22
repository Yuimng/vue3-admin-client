<template>
  <div class="account-manage">
    <div class="card left-card mr10">
      <el-input class="mb10" v-model="filterText" placeholder="搜索" />
      <el-tree
        ref="treeRef"
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        :highlight-current="true"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="card right-card">
      <div class="search-container mb10">
        <el-form ref="searchFormRef" :inline="true" :model="searchForm" class="search-form">
          <el-form-item label="用户名：">
            <el-input v-model="searchForm.username" placeholder="输入用户名" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">
              <i class="btn-icon mr4 iconfont icon-sousuo" /><span>搜索</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-container">
        <div class="table-btns mb18">
          <el-button type="primary" class="table-button" @click="handleNew">
            <i class="btn-icon mr4 iconfont icon-quanjia" /><span>新增用户</span>
          </el-button>
        </div>
        <el-table class="table-content" :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="Id" width="50" />
          <el-table-column prop="username" label="用户名" width="150" />
          <el-table-column prop="name" label="昵称" width="150" />
          <el-table-column prop="deptId" label="部门" width="150">
            <template #default="{ row }">
              {{ formatDeptName(row.deptId) }}
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180" />
          <el-table-column prop="phone" label="电话" width="120" />
          <el-table-column prop="role" label="角色" width="150" />
          <el-table-column prop="roleName" label="角色名称" width="150" />
          <el-table-column prop="createdAt" label="创建时间" width="180" />
          <el-table-column prop="remark" label="备注" width="180" />
          <el-table-column fixed="right" prop="operation" label="操作" width="160" align="center">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="handleEdit(row)">
                <i class="btn-icon mr4 iconfont icon-xiugai"></i> <span>编辑</span>
              </el-button>
              <el-popconfirm
                @confirm="handleDelete(row.id)"
                confirm-button-text="确认"
                cancel-button-text="否"
                title="确认删除该用户?"
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
        <el-pagination
          class="table-pagination mt18"
          :total="pagination.total"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :page-sizes="[10, 25, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <UserDialog ref="userDialogRef" @refresh="onSearch" />
  </div>
</template>

<script lang="ts" setup>
import UserDialog from './components/userDialog.vue'
import { onMounted, ref, reactive, watch } from 'vue'
import { ElMessage, FormInstance, ElTree } from 'element-plus'
import { deleteUser, getDepartmentsAll, getUserList } from '@/api/modules/system'
import { User } from '@/api/interface/system'
import { Department } from '@/api/interface/system'
import { findNodeById } from '@/utils'

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'name'
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

interface Tree {
  [key: string]: any
}

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.name.includes(value)
}

let treeData = ref<Department[]>()

const initTreeData = async () => {
  const { data } = await getDepartmentsAll()
  treeData.value = data
}

// 部门筛选 默认100
const selectDeptId = ref<number>(1)

const handleNodeClick = (data: Department) => {
  selectDeptId.value = data.id
  onSearch()
}

// 表格显示部门名称
const formatDeptName = (id: number) => {
  const obj = findNodeById(treeData.value!, id)
  return obj?.name
}

onMounted(() => {
  initTreeData()
  onSearch()
})

const tableData = ref<User[]>([])

const searchFormRef = ref<FormInstance>()
const searchForm = reactive({
  username: ''
})

const pagination = reactive({
  total: 0,
  pageSize: 10,
  currentPage: 1
})

async function onSearch() {
  const searchParam = {
    username: searchForm.username,
    pageNo: pagination.currentPage,
    pageSize: pagination.pageSize,
    deptId: selectDeptId.value
  }
  const { data } = await getUserList(searchParam)
  tableData.value = data.rows
  pagination.total = data.count
}

const handleSizeChange = async (val: number) => {
  pagination.pageSize = val
  await onSearch()
}
const handleCurrentChange = async (val: number) => {
  pagination.currentPage = val
  await onSearch()
}

const handleDelete = async (id: number) => {
  const res = await deleteUser(id)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
  } else {
    onSearch()
    ElMessage.success(res.msg)
  }
}

const userDialogRef = ref<InstanceType<typeof UserDialog>>()
const handleNew = () => {
  userDialogRef.value?.handleNew()
}

const handleEdit = (row: User) => {
  userDialogRef.value?.handleEdit(row)
}
</script>

<style scoped lang="scss">
@import './index';
</style>
