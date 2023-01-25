<template>
  <div class="home-container">
    <!--奖品区-->
    <el-row style="text-align: center; padding-top: 30px">
      <el-col :span="8" :offset="8">
        <el-carousel
          class="carousel-prize"
          arrow="always"
          trigger="click"
          indicator-position="none"
          :height="(screenHeight * 0.1) + 'px'"
          :autoplay="false"
          @change="currentPrize"
        >
          <el-carousel-item v-for="item in allPrize" :key="item.id">
            <img v-if="item.image" class="prize-image" :src="item.image" alt="" />
            <div v-else class="prize-name">{{ item.name }}</div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!--转动区-->
    <el-row style="text-align: center; padding-top: 30px">
      <el-col :span="12" :offset="6">
        <el-carousel
          class="carousel-user"
          direction="vertical"
          indicator-position="none"
          :height="(screenHeight * 0.6) + 'px'"
          :autoplay="autoplay"
          :interval="interval"
          @change="currentUser"
        >
          <el-carousel-item v-for="(item, index) in noPrizeUser" :key="index">
            <multi-user v-show="showMultiple" :prize-user="prizeUser" />
            <multi-user v-show="!showMultiple" :prize-user="[item]" :user-index="index" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <audio v-if="musicPlay" :src="musicUrl" autoplay="autoplay" loop="loop"></audio>
    </el-row>
    <!--操控区-->
    <el-row style="text-align: center; padding-top: 30px">
      <el-col :span="4" :offset="10">
        <div style="margin-top: 10px">
          <el-button v-if="showButton" type="primary" round style="width: 100%;" :loading="showLoading" @click="startRun">开始</el-button>
          <el-button v-if="!showButton" type="primary" round style="width: 100%;" :loading="showLoading" @click="stopRun">停止</el-button>
        </div>
        <div style="margin-top: 10px">
          <el-button-group v-model="isSingle" size="small">
            <el-button :type="isSingle ? 'primary' : 'default'" @click="isSingle = true">单抽</el-button>
            <el-button :type="!isSingle ? 'primary' : 'default'" @click="isSingle = false">全抽</el-button>
            <el-button type="default" @click="toReset">重置</el-button>
            <el-button type="default" @click="toPrize">管理</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MultiUser from './multi-user.vue'
export default {
  name: 'Home',
  components: {
    MultiUser
  }
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  selectPrize, selectUser, startCheck,
  startOne, startAll, resetStock
} from '@/pages/lottery/api/lottery'
// import { clearImage } from '@/pages/lottery/api/upload'
// import LangSelect from '@/components/LangSelect'
import action from '@/pages/lottery/assets/media/action.mp3'
import jump from '@/pages/lottery/assets/media/jump.mp3'

onMounted(() => {
  getAllPrize()
  getNoPrizeUser()
  window.onresize = () => {
    this.screenHeight = window.innerHeight
  }
})

const allPrize = ref([])
const curPrize = ref([])
const allUser = ref([])
async function getAllPrize() {
  const imageList = []
  await selectPrize().then(res => {
    allPrize.value = res.data
    curPrize.value = allPrize.value[0]
    allPrize.value.map(item => {
      if (item.image) {
        imageList.push(item.image)
      }
    })
  })
  await selectUser().then(res => {
    allUser.value = res.data
    allUser.value.map(item => {
      if (item.avatar) {
        imageList.push(item.avatar)
      }
    })
  })
  console.log(imageList)
  // clearImage(imageList)
}

function currentPrize(index) {
  curPrize.value = allPrize.value[index]
  console.log(index, curPrize.value.name)
}

const noPrizeUser = ref([])
function getNoPrizeUser() {
  const prizeId = curPrize.value.id
  if (!prizeId) {
    return
  }
  startCheck(prizeId).then(res => {
    noPrizeUser.value = res.data
  })
}

const stopUserIndex = ref(null)
const prizeUserIndex = ref(null)
const showMultiple = ref(false)
// 跑马灯
const autoplay = ref(false)
const interval = ref(1000)
// 背景音乐
const musicPlay = ref(false)
const musicUrl = ref(null)
//
const showLoading = ref(false)
const showButton = ref(true)
function startRun() {
  const prizeId = curPrize.value.id
  if (!prizeId) {
    return
  }
  // 校验库存和未中奖人员
  startCheck(prizeId).then(res => {
    noPrizeUser.value = res.data
    // 5 对应下面stopRun的5
    if (noPrizeUser.value.length < 5) {
      ElMessage.error('人员数量不能少于5人')
      return
    }
    // 先清空数据
    stopUserIndex.value = null
    prizeUserIndex.value = null
    showMultiple.value = false
    // 转动跑马灯
    autoplay.value = true
    interval.value = 300
    // 播放背景音乐
    musicPlay.value = true
    musicUrl.value = action
    showLoading.value = true
    setTimeout(() => {
      showButton.value = false
      showLoading.value = false
    }, 1.5 * 1000)
  })
}

const isSingle = ref(true)
const prizeUser = ref([])
function stopRun() {
  // 校验奖品
  const prizeId = curPrize.value.id
  if (!prizeId) {
    return
  }
  if (isSingle.value) {
    startOne(prizeId).then(res => {
      // 返回中奖人员
      const user = res.data
      showLoading.value = true
      // 展示中奖人员
      prizeUser.value = [user]
      // 查找中奖人员
      prizeUserIndex.value = noPrizeUser.value.map(item => item.id).indexOf(user.id)
      if (prizeUserIndex.value > 5) {
        stopUserIndex.value = prizeUserIndex.value - 5
      } else {
        stopUserIndex.value = (noPrizeUser.value.length - 5) + prizeUserIndex.value
      }
    })
  } else {
    startAll(prizeId).then(res => {
      // 返回第一个中奖人员
      const user = res.data[0]
      showLoading.value = true
      // 展示中奖人员
      prizeUser.value = res.data
      // 查找第一个中奖人员
      prizeUserIndex.value = noPrizeUser.value.map(item => item.id).indexOf(user.id)
      if (prizeUserIndex.value > 5) {
        stopUserIndex.value = prizeUserIndex.value - 5
      } else {
        stopUserIndex.value = (noPrizeUser.value.length - 5) + prizeUserIndex.value
      }
    })
  }
}

function slowRun() {
  // 1000 < 5 * 200 + 300
  if (interval.value <= 1000) {
    autoplay.value = false
    interval.value = interval.value + 200
    setTimeout(() => {
      autoplay.value = true
      setTimeout(slowRun, interval.value + 100)
    }, 100)
  }
}

function currentUser(index) {
  console.log(index, prizeUserIndex.value, stopUserIndex.value, interval.value)
  if (index === stopUserIndex.value) {
    // 开始减速
    slowRun()
    // 更换背景音乐
    musicUrl.value = jump
  }
  if (index === prizeUserIndex.value && interval.value > 1000) {
    // 减速后停止转动
    autoplay.value = false
    showMultiple.value = true
    // 停止背景音乐
    musicPlay.value = false
    setTimeout(() => {
      showButton.value = true
      showLoading.value = false
    }, 1.5 * 1000)
  }
}

// 重置奖品
function toReset() {
  // 校验奖品
  const prizeId = curPrize.value.id
  if (!prizeId) {
    return
  }
  ElMessageBox.confirm('确定要重置该奖品吗？', '警告', {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning'
  }).then(() => {
    resetStock(prizeId).then(() => {
      ElMessage.success('重置成功')
    })
  })
}

// 跳转奖品管理
const router = useRouter()
function toPrize() {
  router.push('/prize')
}

const screenHeight = ref(window.innerHeight)
</script>

<style lang="scss" scoped>
  .home-container {
    width: 100%;
    height: 100vh;
    background: url("../../assets/img/bg1.jpg") no-repeat top left / 100% 100%;
    .carousel-prize {
      position: relative;
      .prize-image {
        display: inline-block;
        margin: 0;
        width: 160px;
        height: 100%;
        border: 1px solid #eeeeee;
        border-radius: 4px;
      }
      .prize-name {
        position: absolute;
        left: calc(50% - 80px);
        display: flex;
        width: 160px;
        height: 100%;
        color: #FFE9AF;
        font-size: 66px;
        align-items: center;
        justify-content: center;
      }
    }
    .carousel-user {
      position: relative;
      ::v-deep .el-carousel__container {
        background-color: #000000;
        opacity: 0.6;
        border-radius: 8px;
      }
    }
  }
</style>
