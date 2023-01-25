<template>
  <table-layout title="奖品列表">
    <!-- 搜索表单 -->
    <template #form>
      <el-form :model="listQuery" :inline="true" label-width="120px" label-suffix=":">
        <el-form-item label="奖品名称">
          <el-input v-model="listQuery.name" placeholder="请输入奖品名称" />
        </el-form-item>
        <el-form-item label="奖品描述">
          <el-input v-model="listQuery.description" placeholder="请输入奖品描述" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="useRenderIcon('search')" @click="handleSearch">搜索</el-button>
          <el-button type="primary" :icon="useRenderIcon('refresh-left')" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <!--按钮组-->
    <template #button>
      <el-button type="primary" :icon="useRenderIcon('plus')" @click="handleDetail()">新增奖品</el-button>
      <el-button type="warning" :icon="useRenderIcon('delete')" @click="handleDelete()">批量删除</el-button>
      <el-button type="" :icon="useRenderIcon('document')" @click="handleDocument()">表格模板</el-button>
      <el-button type="" :icon="useRenderIcon('upload2')" @click="handleUpload()">上传表格</el-button>
      <el-button type="" :icon="useRenderIcon('download')" @click="handleDownload()">下载表格</el-button>
    </template>
    <!-- 列表 -->
    <template #table>
      <table-list
        ref="tableListDom"
        :data="list"
        :loading="listLoading"
        :show-selection="true"
        :show-page="total>0"
        :page-total="total"
        v-model:page-num="listQuery.pageNum"
        v-model:page-size="listQuery.pageSize"
        @pagination="getList"
      >
        <el-table-column label="奖品图片" align="center">
          <template #default="scope">
            <table-image :src="scope.row.image" />
          </template>
        </el-table-column>
        <el-table-column label="奖品名称" align="center">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="奖品描述" align="center">
          <template #default="scope">
            <span>{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="奖品数量" align="center">
          <template #default="scope">
            <span>{{ scope.row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column label="奖品顺序" align="center">
          <template #default="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" align="center">
          <template #default="scope">
            <span>{{ scope.row.operateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template #default="scope">
            <el-button type="primary" size="small" circle :icon="useRenderIcon('user')" @click="handlePrizeUser(scope.row)" title="中奖人员" />
            <el-button type="primary" size="small" circle :icon="useRenderIcon('edit')" @click="handleDetail(scope.row)" title="编辑" />
            <el-button type="danger" size="small" circle :icon="useRenderIcon('delete')" @click="handleDelete(scope.row)" title="删除" />
          </template>
        </el-table-column>
      </table-list>
      <!-- dialog表单 -->
      <el-dialog
        :title="prize.id ? '修改奖品' : '新增奖品'"
        v-model="dialogFormVisible"
        @close="handleFormClose"
      >
        <el-form ref="dialogForm" :model="prize" :rules="prizeRules" label-width="120px" label-suffix=":">
          <el-form-item label="奖品图片" prop="image">
            <upload-image :image-url="prize.image" @upload-path="uploadFilePath" />
          </el-form-item>
          <el-form-item label="奖品名称" prop="name">
            <el-input v-model="prize.name" placeholder="请输入奖品名称" @blur="handleCheck" />
          </el-form-item>
          <el-form-item label="奖品描述" prop="desc">
            <el-input v-model="prize.desc" placeholder="请输入奖品描述" />
          </el-form-item>
          <el-form-item label="奖品数量" prop="stock">
            <el-input-number v-model="prize.stock" :min="1" placeholder="请输入奖品数量" />
          </el-form-item>
          <el-form-item label="奖品顺序" prop="number">
            <el-input-number v-model="prize.number" :min="1" placeholder="请输入奖品顺序" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleFormClose">取消</el-button>
            <el-button type="primary" @click="handleFormSubmit">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 导入表格 -->
      <el-dialog
        :title="'导入Excel'"
        v-model="dialogUploadVisible"
        @close="handleUploadClose"
      >
        <upload-excel :header="header" @on-success="handleUploadSuccess" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleUploadClose">取消</el-button>
            <el-button type="primary" @click="handleUploadSubmit">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </template>
  </table-layout>
</template>

<script>
import TableList from '@/components/TableList/index.vue'
import TableLayout from '@/components/TableList/layout.vue'
import TableImage from '@/components/TableImage/index.vue'
import UploadImage from '@/components/UploadImage/index.vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
export default {
  name: 'Prize',
  components: {
    TableList,
    TableLayout,
    TableImage,
    UploadImage,
    UploadExcel
  }
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  fetchPrizeList, fetchPrize, checkPrize,
  createPrize, updatePrize, deletePrize,
  batchCreatePrize, fetchPrizeAll
} from '@/pages/lottery/api/prize'
import { writeExcel } from '@/utils/components/excel'

const router = useRouter()
// 生命周期
onMounted(() => {
  getList()
})
// 搜索部分
const listQuery = ref({
  pageNum: 1,
  pageSize: 10,
  sort: '',
  username: '',
  prizeId: ''
})

function handleSearch() {
  listQuery.value.pageNum = 1
  getList()
}

function handleReset() {
  listQuery.value = {
    pageNum: 1,
    pageSize: 10,
    sort: '',
    username: '',
    prizeId: ''
  }
}

// 列表部分
const tableListDom = ref(null)
const listLoading = ref(false)
const list = ref([])
const total = ref(0)

function getList() {
  listLoading.value = true
  fetchPrizeList(listQuery.value).then(res => {
    list.value = res.data.list
    total.value = res.data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      listLoading.value = false
    }, 1.5 * 1000)
  })
}

function handleDelete(row) {
  ElMessageBox.confirm('确定要删除吗？', '删除提示', {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning'
  }).then(() => {
    if (row && row.id) {
      deletePrize(row.id).then(res => {
        getList()
      })
    } else {
      const keys = tableListDom.value.getSelectedRowKeys()
      deletePrize(keys.join(',')).then(res => {
        getList()
      })
    }
  })
}

// 表单部分
const dialogFormVisible = ref(false)
const prize = ref({
  id: '',
  image: '',
  name: '',
  desc: '',
  stock: '',
  number: '',
  operateTime: ''
})
const prizeRules = ref({
  name: [{ required: true, message: '奖品名称不能为空', trigger: 'blur' }],
  desc: [{ required: true, message: '奖品描述不能为空', trigger: 'blur' }],
  stock: [{ required: true, message: '奖品数量不能为空', trigger: 'blur' }],
  number: [{ required: true, message: '奖品顺序不能为空', trigger: 'blur' }]
})

function handleDetail(row) {
  prize.value = {}
  dialogFormVisible.value = true
  if (row && row.id) {
    fetchPrize(row.id).then(res => {
      prize.value = res.data
    })
  }
}

function handleCheck() {
  if (prize.value.name && prize.value.desc) {
    checkPrize(prize.value).then(res => {
      if (res.data) {
        ElMessage.error('奖品已存在')
      }
    })
  }
}

function handlePrizeUser(row) {
  router.push(`/user?prizeId=${row.id}`)
}

function uploadFilePath(imageUrl) {
  prize.value.image = imageUrl
}

const dialogForm = ref(null)

function handleFormClose() {
  dialogForm.value.resetFields()
  dialogFormVisible.value = false
  prize.value = {}
}

function handleFormSubmit() {
  dialogForm.value.validate(valid => {
    if (valid) {
      if (!prize.value.id) {
        createPrize(prize.value).then(res => {
          dialogFormVisible.value = false
          getList()
        })
      } else {
        updatePrize(prize.value).then(res => {
          dialogFormVisible.value = false
          getList()
        })
      }
    }
  })
}
// 表格部分
const headers = ref([
  { field: 'name', name: '奖品名称' },
  { field: 'desc', name: '奖品描述' },
  { field: 'stock', name: '奖品数量', type: 'number' },
  { field: 'number', name: '奖品顺序', type: 'number' }
])
function handleDocument() {
  writeExcel({ header: headers.value, filename: '奖品管理'})
}
function handleDownload() {
  fetchPrizeAll().then((res) => {
    const data = res.data
    writeExcel({ data: data, header: headers.value, filename: '奖品管理' })
  })
}
const dialogUploadVisible = ref(false)
// const timer = ref(new Date().getTime())
function handleUpload() {
  dialogUploadVisible.value = true
}
function handleUploadClose() {
  dialogUploadVisible.value = false
}
const prizeList = ref([])
function handleUploadSuccess(data) {
  prizeList.value = data
}
function handleUploadSubmit() {
  batchCreatePrize(prizeList.value).then(() => {
    dialogUploadVisible.value = false
    getList()
  }).catch(() => {
    getList()
  })
}
</script>

<style scoped>

</style>
