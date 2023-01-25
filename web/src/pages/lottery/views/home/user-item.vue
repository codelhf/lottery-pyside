<template>
  <div class="user-item" :style="props.userItemStyle">
    <div class="user-item-left">
      <img v-if="props.index % 2 === 0" class="user-item-img" :src="props.user.avatar ? props.user.avatar : nullImage" alt="" />
      <div v-else class="user-item-div">
        <span class="username" :style="props.usernameStyle">{{ props.user.name }}</span>
        <span class="description" :style="props.descriptionStyle">{{ props.user.desc }}</span>
      </div>
    </div>
    <div class="user-item-right">
      <img v-if="props.index % 2 !== 0" class="user-item-img" :src="props.user.avatar ? props.user.avatar : nullImage" alt="" />
      <div v-else class="user-item-div">
        <span class="username" :style="props.usernameStyle">{{ props.user.name }}</span>
        <span class="description" :style="props.descriptionStyle">{{ props.user.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserItem'
}
</script>

<script setup>
import { defineProps } from 'vue'
import nullImage from '@/pages/lottery/assets/img/null.jpg'
// props
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  userItemStyle: {
    type: String,
    required: true
  },
  usernameStyle: {
    type: String,
    required: true
  },
  descriptionStyle: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
  .user-item {
    float: left;
  }
  .user-item .user-item-left,
  .user-item .user-item-right {
    display: inline-block;
    width: 50%;
    height: 100%;
    float: left;
  }
  .user-item .user-item-img,
  .user-item .user-item-div{
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border: 1px solid #eeeeee;
    background-color: #000000;
    opacity: 0.6;
  }
  .user-item-left .user-item-img,
  .user-item-left .user-item-div{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .user-item-right .user-item-img,
  .user-item-right .user-item-div{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .user-item .user-item-div .username,
  .user-item .user-item-div .description {
    display: flex;
    padding: 20px;
    width: calc(100% - 40px);
    height: calc(50% - 40px);
  }
  .user-item .user-item-div .username {
    font-weight: bold;
    color: #ffffff;
    align-items: center;
    justify-content: center;
  }
  .user-item .user-item-div .description {
    font-weight: bold;
    color: #eeeeee;
    align-items: flex-start;
    justify-content: center;
  }
</style>
