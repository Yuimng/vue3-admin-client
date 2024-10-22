<template>
  <el-dialog
    v-model="dialogVisible"
    :title="!isEdit ? '新增用户' : '编辑用户'"
    width="600"
    :before-close="handleClose"
  >
    <template v-if="!isEdit">
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
            <el-form-item label="部门" prop="deptId">
              <el-tree-select
                v-model="userForm.deptId"
                :data="treeData"
                check-strictly
                :render-after-expand="false"
                style="width: 240px"
                node-key="id"
                :props="{ label: 'name' }"
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
    </template>
    <template v-else>
      <el-form
        ref="editUserFormRef"
        :model="editUserForm"
        :rules="editUserFormRules"
        label-width="80px"
        class="user-form mt20"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="username">
              <el-input v-model="editUserForm.username" placeholder="输入名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="deptId">
              <el-tree-select
                v-model="editUserForm.deptId"
                :data="treeData"
                check-strictly
                :render-after-expand="false"
                style="width: 240px"
                node-key="id"
                :props="{ label: 'name' }"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model="editUserForm.name" placeholder="输入昵称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roleId" required>
              <el-select v-model="editUserForm.roleId">
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
              <el-input v-model="editUserForm.phone" placeholder="输入手机号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editUserForm.email" placeholder="输入邮箱" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="editUserForm.remark"
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
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, onMounted } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { addUser, editUser, getDepartmentsAll, getRolesAll } from '@/api/modules/system'
import { Department, User } from '@/api/interface/system'
const isEdit = ref(false)
const dialogVisible = ref(false)

const userFormRef = ref<FormInstance>()
const userForm = reactive({
  username: '',
  password: '',
  name: '',
  deptId: 1, // 默认部门顶级
  roleId: 2, // 默认普通用户
  phone: '',
  email: '',
  remark: ''
})
const userFormRules = reactive({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 2, max: 10, message: '账号名称长度为2-10个字符', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9-_]*$/,
      message: '必须是字母或数字,特殊符号允许-和_',
      trigger: 'blur'
    }
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

const editUserFormRef = ref<FormInstance>()
const editUserForm = reactive({
  id: 0,
  username: '',
  name: '',
  deptId: 1, // 默认部门顶级
  roleId: 2, // 默认普通用户
  phone: '',
  email: '',
  remark: ''
})
const editUserFormRules = reactive({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 2, max: 10, message: '账号名称长度为2-10个字符', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9-_]*$/,
      message: '必须是字母或数字,特殊符号允许-和_',
      trigger: 'blur'
    }
  ],
  name: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '账号名称长度为2-10个字符', trigger: 'blur' }
  ]
})

onMounted(() => {
  initRoles()
  initDepts()
})

const roleOptions = ref<{ value: number; label: string }[]>([])

const initRoles = async () => {
  const res = await getRolesAll()
  if (res.code === 200) {
    roleOptions.value = res.data.map((item) => {
      return {
        value: item.id,
        label: item.role
      }
    })
  } else {
    ElMessage.error(res.msg)
  }
}

const treeData = ref<Department[]>([])
const initDepts = async () => {
  const res = await getDepartmentsAll()
  if (res.code === 200) {
    treeData.value = res.data
  } else {
    ElMessage.error(res.msg)
  }
}

const handleNew = () => {
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row: User) => {
  isEdit.value = true
  editUserForm.id = row.id
  editUserForm.username = row.username as string // 非空
  editUserForm.name = row.name
  editUserForm.deptId = row.deptId
  editUserForm.roleId = row.roleId
  editUserForm.phone = row.phone || ''
  editUserForm.email = row.email || ''
  editUserForm.remark = row.remark || ''
  dialogVisible.value = true
}

defineExpose({
  handleNew,
  handleEdit
})

const handleClose = () => {
  userFormRef.value?.resetFields()
  editUserFormRef.value?.resetFields()
  dialogVisible.value = false
}

const handleCancel = () => {
  dialogVisible.value = false
}

const emits = defineEmits(['refresh'])

const handleConfirm = () => {
  if (!isEdit.value) {
    userFormRef.value?.validate(async (valid) => {
      if (valid) {
        // 新增用户
        const res = await addUser(toRaw(userForm))
        if (res.code !== 200) {
          ElMessage.error(res.msg)
        } else {
          userFormRef.value?.resetFields()
          dialogVisible.value = false
          emits('refresh')
          ElMessage.success(res.msg)
        }
      }
    })
  } else {
    editUserFormRef.value?.validate(async (valid) => {
      if (valid) {
        const res = await editUser(toRaw(editUserForm))
        if (res.code !== 200) {
          ElMessage.error(res.msg)
        } else {
          editUserFormRef.value?.resetFields()
          dialogVisible.value = false
          emits('refresh')
          ElMessage.success(res.msg)
        }
      }
    })
  }
}
</script>

<style scoped lang="scss"></style>
