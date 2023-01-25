<template>
  <el-dialog
    ref="layerDom"
    v-model="dialogVisible"
    :before-close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
      <el-form-item label="用户名：" prop="name">
        <span>管理员</span>
      </el-form-item>
      <el-form-item label="原密码：" prop="old">
        <el-input v-model="form.old" placeholder="请输入原密码" show-password />
      </el-form-item>
      <el-form-item label="新密码：" prop="new">
        <el-input v-model="form.new" placeholder="请输入新密码" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { passwordChange } from '@/api/system/user'
export default defineComponent({
  name: 'PasswordLayer',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  setup(props, ctx) {
    const dialogVisible = ref(props.show)
    const ruleForm = ref(null)
    const layerDom = ref(null)
    const store = useStore()
    const form = ref({
      userId: '123465',
      name: '',
      old: '',
      new: ''
    })
    const rules = {
      old: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
      new: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
    }
    function handleClose() {
      dialogVisible.value = false
      ctx.emit('close', dialogVisible.value)
    }
    function handleSubmit() {
      if (ruleForm.value) {
        ruleForm.value.validate((valid) => {
          if (valid) {
            const params = {
              id: form.value.userId,
              old: form.value.old,
              new: form.value.new
            }
            passwordChange(params)
              .then(res => {
                ElMessage({
                  type: 'success',
                  message: '密码修改成功，即将跳转到登录页面'
                })
                handleClose()
                setTimeout(() => {
                  store.dispatch('user/loginOut')
                }, 2000)
              })
          } else {
            return false
          }
        })
      }
    }
    return {
      dialogVisible,
      form,
      rules,
      layerDom,
      ruleForm,
      handleClose,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
