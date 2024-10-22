<template>
  <el-dialog
    v-model="dialogVisible"
    :title="!isEdit ? '新增部门' : '编辑部门'"
    width="600"
    :before-close="handleClose"
  >
    <template v-if="!isEdit">
      <el-form ref="deptFormRef" :model="deptForm" label-width="80px" class="dept-form mt20">
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="deptForm.name" placeholder="输入名称" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门父级" prop="parentId">
              <el-tree-select
                v-model="deptForm.parentId"
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
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="deptForm.sort" :min="1" />
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
        ref="editDeptFormRef"
        :model="editDeptForm"
        label-width="80px"
        class="dept-form mt20"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="editDeptForm.name" placeholder="输入名称" clearable />
            </el-form-item>
          </el-col>
          <template v-if="editDeptForm.parentId !== 0">
            <el-col :span="12">
              <el-form-item label="部门父级" prop="parentId">
                <el-tree-select
                  v-model="editDeptForm.parentId"
                  :data="treeData"
                  check-strictly
                  :render-after-expand="false"
                  style="width: 240px"
                  node-key="id"
                  :props="{ label: 'name' }"
                />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="editDeptForm.sort" :min="1" />
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
import { addDept, editDept, getDepartmentsAll } from '@/api/modules/system'
import { Department } from '@/api/interface/system'
const isEdit = ref(false)
const dialogVisible = ref(false)

const deptFormRef = ref<FormInstance>()
const deptForm = reactive({
  name: '',
  sort: 1,
  parentId: 1
})

const editDeptFormRef = ref<FormInstance>()
const editDeptForm = reactive({
  id: 0,
  name: '',
  sort: 1,
  parentId: 1
})

onMounted(() => {
  initDepts()
})

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

const handleEdit = (row: Department) => {
  isEdit.value = true
  editDeptForm.id = row.id
  editDeptForm.name = row.name
  editDeptForm.parentId = row.parentId
  editDeptForm.sort = row.sort
  dialogVisible.value = true
}

defineExpose({
  handleNew,
  handleEdit
})

const handleClose = () => {
  deptFormRef.value?.resetFields()
  editDeptFormRef.value?.resetFields()
  dialogVisible.value = false
}

const handleCancel = () => {
  dialogVisible.value = false
}

const emits = defineEmits(['refresh'])

const handleConfirm = () => {
  if (!isEdit.value) {
    deptFormRef.value?.validate(async (valid) => {
      if (valid) {
        // 新增用户
        const res = await addDept(toRaw(deptForm))
        if (res.code !== 200) {
          ElMessage.error(res.msg)
        } else {
          deptFormRef.value?.resetFields()
          dialogVisible.value = false
          emits('refresh')
          ElMessage.success(res.msg)
        }
      }
    })
  } else {
    editDeptFormRef.value?.validate(async (valid) => {
      if (valid) {
        const res = await editDept(toRaw(editDeptForm))
        if (res.code !== 200) {
          ElMessage.error(res.msg)
        } else {
          editDeptFormRef.value?.resetFields()
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
