<template>
  <table-layout title="人员列表">
    <!-- 搜索表单 -->
    <template #form>
      <el-form :model="listQuery" :inline="true" label-width="120px" label-suffix=":">
        <el-form-item label="人员名称">
          <el-input v-model="listQuery.name" placeholder="请输入人员名称" />
        </el-form-item>
        <el-form-item label="奖品名称">
          <el-select v-model="listQuery.prizeId" placeholder="请输入奖品名称">
            <el-option v-for="item in prizes" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="useRenderIcon('search')" @click="handleSearch">搜索</el-button>
          <el-button type="primary" :icon="useRenderIcon('refresh-left')" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <!--按钮组-->
    <template #button>
      <el-button type="primary" :icon="useRenderIcon('plus')" @click="handleDetail()">新增人员</el-button>
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
        <el-table-column label="头像" align="center">
          <template #default="scope">
            <table-image :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="人员名称" align="center">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="人员描述" align="center">
          <template #default="scope">
            <span>{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="奖品图片" align="center">
          <template #default="scope">
            <table-image :src="scope.row.prizeImage" />
          </template>
        </el-table-column>
        <el-table-column label="奖品名称" align="center">
          <template #default="scope">
            <span>{{ scope.row.prizeName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" align="center">
          <template #default="scope">
            <span>{{ scope.row.operateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template #default="scope">
            <el-button type="primary" size="small" circle :icon="useRenderIcon('edit')" @click="handleDetail(scope.row)" title="编辑" />
            <el-button type="danger" size="small" circle :icon="useRenderIcon('delete')" @click="handleDelete(scope.row)" title="删除" />
          </template>
        </el-table-column>
      </table-list>
      <!-- dialog表单 -->
      <el-dialog
        :title="user.id ? '修改人员' : '新增人员'"
        v-model="dialogFormVisible"
        @close="handleFormClose"
      >
        <el-form ref="dialogForm" :model="user" :rules="userRules" label-width="120px" label-suffix=":">
          <el-form-item label="人员头像" prop="avatar">
            <upload-image :image-url="user.avatar" @upload-path="uploadFilePath" />
          </el-form-item>
          <el-form-item label="人员名称" prop="name">
            <el-input v-model="user.name" placeholder="请输入人员名称" @blur="handleCheck" />
          </el-form-item>
          <el-form-item label="人员描述" prop="desc">
            <el-input v-model="user.desc" placeholder="请输入人员描述" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleFormClose">取消</el-button>
            <el-button type="primary" @click="handleFormSubmit">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <!--导入表格 -->
      <el-dialog
        :title="'导入Excel'"
        v-model="dialogUploadVisible"
        @close="handleUploadClose"
      >
        <upload-excel :header="headers" @on-success="handleUploadSuccess" />
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
  name: 'User',
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
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  fetchUserList, fetchUser, checkUser,
  createUser, updateUser, deleteUser,
  batchCreateUser, fetchUserAll
} from '@/pages/lottery/api/user'
import { fetchPrizeAll } from '@/pages/lottery/api/prize'
import { writeExcel } from '@/utils/components/excel'

const route = useRoute()
// 生命周期
onMounted(() => {
  const { prizeId } = route.query
  if (prizeId) {
    listQuery.value.prizeId = prizeId
  }
  getList()
  getPrizes()
})
// 搜索部分
const listQuery = ref({
  pageNum: 1,
  pageSize: 10,
  sort: '',
  name: '',
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
    name: '',
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
  fetchUserList(listQuery.value).then(res => {
    list.value = res.data.list
    total.value = res.data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      listLoading.value = false
    }, 1.5 * 1000)
  })
}

const prizes = ref([])
function getPrizes() {
  fetchPrizeAll().then(res => {
    prizes.value = res.data
    prizes.value = prizes.value.sort((a, b) => {
      return a.number - b.number
    })
  })
}

function handleDelete(row) {
  ElMessageBox.confirm('确定要删除吗？', '删除提示', {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning'
  }).then(() => {
    if (row && row.id) {
      deleteUser(row.id).then(res => {
        getList()
      })
    } else {
      const keys = tableListDom.value.getSelectedRowKeys()
      deleteUser(keys.join(',')).then(res => {
        getList()
      })
    }
  })
}

// 表单部分
const dialogFormVisible = ref(false)
const user = ref({
  id: '',
  prizeId: '',
  prizeImage: '',
  prizeName: '',
  avatar: '',
  name: '',
  desc: '',
  operateTime: ''
})
const userRules = ref({
  name: [{ required: true, message: '人员名称不能为空', trigger: 'blur' }],
  desc: [{ required: true, message: '人员描述不能为空', trigger: 'blur' }]
})

function handleDetail(row) {
  user.value = {}
  dialogFormVisible.value = true
  if (row && row.id) {
    fetchUser(row.id).then(res => {
      user.value = res.data
    })
  }
}

function handleCheck() {
  if (user.value.name && user.value.desc) {
    checkUser(user.value).then(res => {
      if (res.data) {
        ElMessage.error('人员已存在')
      }
    })
  }
}

function uploadFilePath(imageUrl) {
  user.value.avatar = imageUrl
}

const dialogForm = ref(null)

function handleFormClose() {
  dialogForm.value.resetFields()
  dialogFormVisible.value = false
  user.value = {}
}

function handleFormSubmit() {
  dialogForm.value.validate(valid => {
    if (valid) {
      if (!user.value.id) {
        createUser(user.value).then(res => {
          dialogFormVisible.value = false
          getList()
        })
      } else {
        updateUser(user.value).then(res => {
          dialogFormVisible.value = false
          getList()
        })
      }
    }
  })
}
// 表格部分
const headers = ref([
  { field: 'name', name: '人员名称' },
  { field: 'desc', name: '人员描述' }
])
function handleDocument() {
  writeExcel({ header: headers.value, filename: '人员管理' })
}
function handleDownload() {
  headers.value.push({ field: 'prizeName', name: '奖品名称' })
  fetchUserAll().then((res) => {
    const data = res.data
    writeExcel({ data: data, header: headers.value, filename: '人员管理' })
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
const userList = ref([])
function handleUploadSuccess(data) {
  userList.value = data
}
function handleUploadSubmit() {
  batchCreateUser(userList.value).then(() => {
    dialogUploadVisible.value = false
    getList()
  }).catch(() => {
    getList()
  })
}
</script>

<style scoped>

</style>
