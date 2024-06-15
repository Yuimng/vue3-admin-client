<template>
  <div class="table">
    <div class="card search-box">
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-row :gutter="20">
          <el-col :xs="24" :md="12" :lg="8">
            <el-form-item label="菜单名称：" prop="metaName" style="width: 100%">
              <el-input v-model="searchForm.metaName" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <el-form-item label="菜单name：" prop="name" style="width: 100%">
              <el-input v-model="searchForm.name" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <el-form-item label="菜单路径：" prop="path" style="width: 100%">
              <el-input v-model="searchForm.path" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="24">
            <div style="display: flex; align-items: center; justify-content: right">
              <el-button type="primary" @click="onSubmit">
                <i class="iconfont icon-sousuo"></i>搜索
              </el-button>
              <el-button @click="resetForm(searchFormRef)">
                <i class="iconfont icon-shanchu"></i>重置
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="card table-box">
      <el-button type="primary" class="table-button">
        <i class="iconfont icon-quanjia"></i>
        新增菜单
      </el-button>
      <el-table
        class="table"
        :data="authMenuList"
        height="'100%'"
        style="width: 100%; margin-bottom: 20px"
        row-key="name"
        border
      >
        <el-table-column prop="meta.title" label="菜单名称" show-overflow-tooltip />
        <el-table-column prop="meta.icon" label="菜单icon" align="center">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: center">
              <i class="iconfont" :class="'icon-' + scope.row.meta.icon"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="菜单name" align="center" show-overflow-tooltip />
        <el-table-column
          prop="path"
          label="菜单路径"
          width="300"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="component"
          label="组件path"
          width="300"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column fixed="right" prop="operation" label="操作" width="200" align="center">
          <template #default>
            <el-button link type="primary" size="small">
              <i class="iconfont icon-xiugai"></i> 编辑
            </el-button>
            <el-button link type="primary" size="small">
              <i class="iconfont icon-shanchu"></i>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 25, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/modules/auth'
import { FormInstance } from 'element-plus'
import { computed, ref, reactive } from 'vue'

const searchFormRef = ref<FormInstance>()

const searchForm = reactive({
  metaName: '',
  name: '',
  path: ''
})

const onSubmit = () => {
  console.log('submit!')
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const authStore = useAuthStore()
const authMenuList = computed(() => authStore.authMenuListGet)

const currentPage = ref(1)
const pageSize = ref(10)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped lang="scss">
.table {
  display: flex;
  height: 100%;
  flex-direction: column;
  .search-box {
    margin-bottom: 10px;
  }
  .table-box {
    flex: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
    .table-button {
      margin-bottom: 16px;
      width: 150px;
    }
    .table {
      flex: 1;
    }
    .pagination {
      justify-content: right;
    }
  }
}
</style>
