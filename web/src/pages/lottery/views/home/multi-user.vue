<template>
  <div class="multi-user">
    <user-item
      v-for="(item) in props.prizeUser"
      :key="item.id"
      :user="item"
      :index="props.userIndex"
      :user-item-style="userItemStyle"
      :username-style="usernameStyle"
      :description-style="descriptionStyle"
    />
  </div>
</template>

<script>
import UserItem from './user-item.vue'
export default {
  name: 'MultiUser',
  components: {
    UserItem
  }
}
</script>

<script setup>
import { defineProps, ref, onUpdated } from 'vue'
// props
const props = defineProps({
  prizeUser: {
    type: Array,
    required: true
  },
  userIndex: {
    type: Number,
    default: 0
  }
})
const userItemStyle = ref('width: 100%; height: 100%;')
const usernameStyle = ref('font-size: 36px;')
const descriptionStyle = ref('font-size: 18px;')
onUpdated(() => {
  if (props.prizeUser.length === 1) {
    userItemStyle.value = 'width: 100%; height: 100%'
    usernameStyle.value = 'font-size: 36px;'
    descriptionStyle.value = 'font-size: 18px;'
  } else if (props.prizeUser.length === 2) {
    userItemStyle.value = 'width: 50%; height: 50%'
    usernameStyle.value = 'font-size: 18px;'
    descriptionStyle.value = 'font-size: 9px;'
  } else if (props.prizeUser.length === 3) {
    userItemStyle.value = 'width: 33.33%; height: 33.33%'
    usernameStyle.value = 'font-size: 12px;'
    descriptionStyle.value = 'font-size: 6px;'
  } else if (props.prizeUser.length === 4) {
    userItemStyle.value = 'width: 50%; height: 50%'
    usernameStyle.value = 'font-size: 18px;'
    descriptionStyle.value = 'font-size: 9px;'
  } else if (props.prizeUser.length === 5) {
    userItemStyle.value = 'width: 33.33%; height: 33.33%'
    usernameStyle.value = 'font-size: 12px;'
    descriptionStyle.value = 'font-size: 6px;'
  } else if (props.prizeUser.length === 6) {
    userItemStyle.value = 'width: 33.33%; height: 33.33%'
    usernameStyle.value = 'font-size: 12px;'
    descriptionStyle.value = 'font-size: 6px;'
  } else if (props.prizeUser.length === 7) {
    userItemStyle.value = 'width: 25%; height: 25%'
    usernameStyle.value = 'font-size: 9px;'
    descriptionStyle.value = 'font-size: 6px;'
  } else if (props.prizeUser.length === 8) {
    userItemStyle.value = 'width: 25%; height: 25%'
    usernameStyle.value = 'font-size: 9px;'
    descriptionStyle.value = 'font-size: 6px;'
  } else if (props.prizeUser.length === 9) {
    userItemStyle.value = 'width: 33.33%; height: 33.33%'
    usernameStyle.value = 'font-size: 12px;'
    descriptionStyle.value = 'font-size: 6px;'
  } else if (props.prizeUser.length >= 10) {
    userItemStyle.value = 'width: 25%; height: 25%'
    usernameStyle.value = 'font-size: 9px;'
    descriptionStyle.value = 'font-size: 6px;'
  }
})
</script>

<style scoped>
  .multi-user {
    padding: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    /*overflow-y: auto;*/
  }
</style>
