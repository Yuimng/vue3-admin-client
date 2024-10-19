<template>
  <el-dialog
    v-model="dialogVisible"
    :title="!isEdit ? '新增菜单' : '编辑菜单'"
    width="700"
    :before-close="handleClose"
  >
    <template v-if="!isEdit">
      <el-form
        ref="menuFormRef"
        :model="menuForm"
        :rules="formRules"
        label-width="100px"
        class="menu-form mt20"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="title">
              <el-input v-model="menuForm.title" placeholder="输入名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单name" prop="name">
              <el-input v-model="menuForm.name" placeholder="输入name" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单路径" prop="path">
              <el-input v-model="menuForm.path" placeholder="输入路径" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级菜单" prop="parentId">
              <el-tree-select
                v-model="menuForm.parentId"
                :data="menuOptions"
                check-strictly
                :render-after-expand="false"
                default-expand-all
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单图标" prop="icon">
              <el-input v-model="menuForm.icon" placeholder="输入图标" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="menuForm.sort" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否启用" prop="isEnable">
              <el-radio-group v-model="menuForm.isEnable">
                <el-radio :value="1" size="large">启用</el-radio>
                <el-radio :value="0" size="large">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否固定" prop="isAffix">
              <el-radio-group v-model="menuForm.isAffix">
                <el-radio :value="1" size="large">启用</el-radio>
                <el-radio :value="0" size="large">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否缓存" prop="isKeepAlive">
              <el-radio-group v-model="menuForm.isKeepAlive">
                <el-radio :value="1" size="large">启用</el-radio>
                <el-radio :value="0" size="large">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否链接" prop="isLink">
              <el-radio-group v-model="menuForm.isLink">
                <el-radio :value="1" size="large">是</el-radio>
                <el-radio :value="0" size="large">否</el-radio>
              </el-radio-group>
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
        ref="editMenuFormRef"
        :model="editMenuForm"
        :rules="formRules"
        label-width="100px"
        class="menu-form mt20"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="title">
              <el-input v-model="editMenuForm.title" placeholder="输入名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单name" prop="name">
              <el-input v-model="editMenuForm.name" placeholder="输入name" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单路径" prop="path">
              <el-input v-model="editMenuForm.path" placeholder="输入路径" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级菜单" prop="parentId">
              <el-tree-select
                v-model="editMenuForm.parentId"
                :data="menuOptions"
                check-strictly
                :render-after-expand="false"
                default-expand-all
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单图标" prop="icon">
              <el-input v-model="editMenuForm.icon" placeholder="输入图标" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="editMenuForm.sort" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否启用" prop="isEnable">
              <el-radio-group v-model="editMenuForm.isEnable">
                <el-radio :value="1" size="large">启用</el-radio>
                <el-radio :value="0" size="large">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否固定" prop="isAffix">
              <el-radio-group v-model="editMenuForm.isAffix">
                <el-radio :value="1" size="large">启用</el-radio>
                <el-radio :value="0" size="large">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否缓存" prop="isKeepAlive">
              <el-radio-group v-model="editMenuForm.isKeepAlive">
                <el-radio :value="1" size="large">启用</el-radio>
                <el-radio :value="0" size="large">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否链接" prop="isLink">
              <el-radio-group v-model="editMenuForm.isLink">
                <el-radio :value="1" size="large">是</el-radio>
                <el-radio :value="0" size="large">否</el-radio>
              </el-radio-group>
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
import { ref, reactive, computed, toRaw, onMounted } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { addMenu, editMenu } from '@/api/modules/system'
import { Menu } from '@/api/interface/system'
import { useAuthStore } from '@/store/modules/auth'
import { MenuOption, getTreeMenuOptions } from '@/utils'
const isEdit = ref(false)
const dialogVisible = ref(false)

const menuFormRef = ref<FormInstance>()
const menuForm = reactive({
  name: '',
  title: '',
  path: '',
  parentId: 0,
  sort: 1, // 默认普通用户
  icon: '',
  isEnable: 0,
  isAffix: 0,
  isKeepAlive: 0,
  isLink: 0
})

const editMenuFormRef = ref<FormInstance>()
const editMenuForm = reactive({
  id: 0,
  name: '',
  title: '',
  path: '',
  parentId: 0,
  sort: 1,
  icon: '',
  isEnable: 0,
  isAffix: 0,
  isKeepAlive: 0,
  isLink: 0
})

const formRules = reactive({
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  name: [
    { required: true, message: '请输入菜单name', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9-_]*$/,
      message: '必须是字母或数字,特殊符号允许-和_',
      trigger: 'blur'
    }
  ],
  path: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }]
})

const menuOptions = ref<MenuOption[]>([])

onMounted(() => {
  initMenus()
})

const initMenus = async () => {
  const authStore = useAuthStore()
  const menuData = computed(() => authStore.authMenuList)
  const menuList: Menu[] = [
    {
      id: 0,
      name: '',
      path: '',
      parentId: 0,
      sort: 1,
      meta: {
        icon: '',
        title: '主目录',
        isLink: false,
        isEnable: false,
        isAffix: false,
        isKeepAlive: false
      },
      component: '',
      createdAt: ''
    }
  ]
  menuList[0].children = menuData.value
  menuOptions.value = getTreeMenuOptions(menuList)
}

const handleNew = () => {
  isEdit.value = false
  dialogVisible.value = true
}

const handleEdit = (row: Menu) => {
  isEdit.value = true
  editMenuForm.id = row.id
  editMenuForm.name = row.name
  editMenuForm.title = row.meta.title
  editMenuForm.path = row.path
  editMenuForm.parentId = row.parentId
  editMenuForm.sort = row.sort
  editMenuForm.icon = row.meta.icon
  editMenuForm.isEnable = row.meta.isEnable ? 1 : 0 // 类型转换
  editMenuForm.isAffix = row.meta.isAffix ? 1 : 0
  editMenuForm.isKeepAlive = row.meta.isKeepAlive ? 1 : 0
  editMenuForm.isLink = row.meta.isLink ? 1 : 0
  dialogVisible.value = true
}

defineExpose({
  handleNew,
  handleEdit
})

const handleClose = () => {
  menuFormRef.value?.resetFields()
  editMenuFormRef.value?.resetFields()
  dialogVisible.value = false
}

const handleCancel = () => {
  dialogVisible.value = false
}

const emits = defineEmits(['refresh'])

const handleConfirm = () => {
  if (!isEdit.value) {
    menuFormRef.value?.validate(async (valid) => {
      if (valid) {
        // 新增用户
        const res = await addMenu(toRaw(menuForm))
        if (res.code !== 200) {
          ElMessage.error(res.msg)
        } else {
          menuFormRef.value?.resetFields()
          dialogVisible.value = false
          emits('refresh')
          ElMessage.success(res.msg)
        }
      }
    })
  } else {
    editMenuFormRef.value?.validate(async (valid) => {
      if (valid) {
        const res = await editMenu(toRaw(editMenuForm))
        if (res.code !== 200) {
          ElMessage.error(res.msg)
        } else {
          editMenuFormRef.value?.resetFields()
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
