<template>
  <el-dialog
    v-model="dialogVisible"
    :title="!isEdit ? '新增角色' : '编辑角色'"
    width="500"
    :before-close="handleClose"
  >
    <template v-if="!isEdit">
      <el-form
        ref="roleFormRef"
        :model="roleForm"
        :rules="formRules"
        label-width="100px"
        class="role-form mt20"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色" prop="role">
              <el-input v-model="roleForm.role" placeholder="输入role" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="roleForm.roleName" placeholder="输入名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="超级管理员" prop="isSuper">
              <el-radio-group v-model="roleForm.isSuper">
                <el-radio :value="1" size="large">是</el-radio>
                <el-radio :value="0" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单权限" prop="menus">
              <div class="menu-tree">
                <el-tree
                  ref="treeRef"
                  :data="menuOptions"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                  :check-strictly="true"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="roleForm.remark"
                placeholder="输入备注"
                type="textarea"
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
        ref="editRoleFormRef"
        :model="editRoleForm"
        :rules="formRules"
        label-width="100px"
        class="role-form mt20"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色" prop="role">
              <el-input v-model="editRoleForm.role" placeholder="输入role" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="editRoleForm.roleName" placeholder="输入名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="超级管理员" prop="isSuper">
              <el-radio-group v-model="editRoleForm.isSuper">
                <el-radio :value="1" size="large">是</el-radio>
                <el-radio :value="0" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单权限" prop="menus">
              <div class="menu-tree">
                <el-tree
                  ref="editTreeRef"
                  :data="menuOptions"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                  :check-strictly="true"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="editRoleForm.remark"
                placeholder="输入备注"
                type="textarea"
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
import { ref, reactive, toRaw, computed, onMounted } from 'vue'
import { ElMessage, ElTree, FormInstance } from 'element-plus'
import { addRole, editRole, getRoleMenus } from '@/api/modules/system'
import { Role } from '@/api/interface/system'
import { MenuTree, getTreeMenu } from '@/utils'
import { useAuthStore } from '@/store/modules/auth'
const isEdit = ref(false)
const dialogVisible = ref(false)

const roleFormRef = ref<FormInstance>()
const roleForm = reactive({
  role: '',
  roleName: '',
  isSuper: 0,
  menus: [] as number[],
  remark: '' as string
})
const treeRef = ref<InstanceType<typeof ElTree>>()

const editRoleFormRef = ref<FormInstance>()
const editRoleForm = reactive({
  id: 0,
  role: '',
  roleName: '',
  isSuper: 0,
  menus: [] as number[],
  remark: '' as string
})
const editTreeRef = ref<InstanceType<typeof ElTree>>()

const formRules = reactive({
  role: [
    { required: true, message: '请输入角色role', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9-_]*$/,
      message: '必须是字母或数字,特殊符号允许-和_',
      trigger: 'blur'
    }
  ],
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
})

const menuOptions = ref<MenuTree[]>([])

onMounted(() => {
  initMenus()
})

const initMenus = async () => {
  // const res = await getMenusAll()
  // if (res.code === 200) {
  //   menuOptions.value = getTreeMenu(res.data)
  // } else {
  //   ElMessage.error(res.msg)
  // }
  const authStore = useAuthStore()
  const menuList = computed(() => authStore.authMenuList)
  menuOptions.value = getTreeMenu(menuList.value)
}

const defaultProps = {
  children: 'children',
  label: 'label'
}

const handleNew = () => {
  isEdit.value = false
  dialogVisible.value = true
}

const setCheckedMenus = async (roleId: number) => {
  const res = await getRoleMenus(roleId)
  if (res.code !== 200) {
    ElMessage.error(res.msg)
  } else {
    editTreeRef.value!.setCheckedKeys(res.data, false)
  }
}

const handleEdit = (row: Role) => {
  setCheckedMenus(row.id)
  isEdit.value = true
  editRoleForm.id = row.id
  editRoleForm.role = row.role
  editRoleForm.roleName = row.roleName
  editRoleForm.isSuper = row.isSuper
  editRoleForm.remark = row.remark || ''
  dialogVisible.value = true
}

defineExpose({
  handleNew,
  handleEdit
})

const handleClose = () => {
  roleFormRef.value?.resetFields()
  editRoleFormRef.value?.resetFields()
  if (isEdit.value) {
    // 清除选中
    editTreeRef.value!.setCheckedKeys([], false)
  } else {
    treeRef.value!.setCheckedKeys([], false)
  }
  dialogVisible.value = false
}

const handleCancel = () => {
  roleFormRef.value?.resetFields()
  editRoleFormRef.value?.resetFields()
  dialogVisible.value = false
}

const emits = defineEmits(['refresh'])

const handleConfirm = () => {
  if (!isEdit.value) {
    roleFormRef.value?.validate(async (valid) => {
      if (valid) {
        // 新增角色
        const newCheckedMenus = treeRef.value?.getCheckedKeys() as number[]
        roleForm.menus = newCheckedMenus
        const res = await addRole(toRaw(roleForm))
        if (res.code !== 200) {
          ElMessage.error(res.msg)
        } else {
          roleFormRef.value?.resetFields()
          dialogVisible.value = false
          emits('refresh')
          ElMessage.success(res.msg)
        }
      }
    })
  } else {
    editRoleFormRef.value?.validate(async (valid) => {
      if (valid) {
        const newCheckedMenus = editTreeRef.value?.getCheckedKeys() as number[]
        console.log(newCheckedMenus)
        editRoleForm.menus = newCheckedMenus
        const res = await editRole(toRaw(editRoleForm))
        if (res.code !== 200) {
          ElMessage.error(res.msg)
        } else {
          editRoleFormRef.value?.resetFields()
          dialogVisible.value = false
          emits('refresh')
          ElMessage.success(res.msg)
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
.menu-tree {
  .el-tree-node__content:hover {
    background-color: var(--el-tree-node-hover-bg-color);
  }

  .el-tree-node__content {
    --el-checkbox-height: var(--el-tree-node-content-height);

    display: flex;
    align-items: center;
    height: var(--el-tree-node-content-height);
    cursor: pointer;
  }
}
</style>
