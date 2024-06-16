<template>
  <div class="account-manage">
    <div class="card search-container mb10">
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
    <div class="card table-container">
      <div class="table-btns mb18">
        <el-button type="primary" class="table-button" @click="dialogVisible = true">
          <i class="btn-icon mr4 iconfont icon-quanjia" /><span>新增用户</span>
        </el-button>
      </div>
      <el-table class="table-content" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="Id" width="50" />
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="name" label="昵称" width="150" />
        <el-table-column prop="email" label="邮箱" width="180" />
        <el-table-column prop="phone" label="电话" width="120" />
        <el-table-column prop="role" label="角色" width="150" />
        <el-table-column prop="roleName" label="角色名称" width="150" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column prop="remark" label="备注" width="180" />
        <el-table-column fixed="right" prop="operation" label="操作" width="160" align="center">
          <template #default="{ row }">
            <el-button link type="primary" size="small">
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
    <el-dialog v-model="dialogVisible" title="新增用户" width="600">
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userFormRules"
        label-width="80px"
        class="user-form mt20"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="username">
              <el-input v-model="userForm.username" placeholder="输入名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input
                v-model="userForm.password"
                type="password"
                show-password
                placeholder="输入密码"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model="userForm.name" placeholder="输入昵称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roleId" required>
              <el-select v-model="userForm.roleId">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="userForm.phone" placeholder="输入手机号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" placeholder="输入邮箱" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="userForm.remark"
                type="textarea"
                placeholder="输入备注"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dialog-footer">
          <el-form-item>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, toRaw } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { User, addUser, deleteUser, getUserList } from '@/api/modules/system'

onMounted(() => {
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
    pageSize: pagination.pageSize
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

const dialogVisible = ref(false)

const userFormRef = ref<FormInstance>()
const userForm = reactive({
  username: '',
  password: '',
  roleId: 2, // 默认普通用户
  name: '',
  email: '',
  phone: '',
  remark: ''
})

const userFormRules = reactive({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 2, max: 10, message: '账号名称长度为2-10个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码必须是6位以上的字母或数字',
      trigger: 'blur'
    }
  ],
  name: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '账号名称长度为2-10个字符', trigger: 'blur' }
  ]
})

// TODO: 获取角色列表
const roleOptions = [
  {
    value: 1,
    label: '超级管理员'
  },
  {
    value: 2,
    label: '普通用户'
  }
]

const handleCancel = () => {
  userFormRef.value?.resetFields()
  dialogVisible.value = false
}

const handleConfirm = () => {
  userFormRef.value?.validate(async (valid) => {
    if (valid) {
      // 新增用户
      const res = await addUser(toRaw(userForm))
      if (res.code !== 200) {
        ElMessage.error(res.msg)
      } else {
        userFormRef.value?.resetFields()
        dialogVisible.value = false
        onSearch()
        ElMessage.success(res.msg)
      }
    }
  })
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
