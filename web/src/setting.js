/**
 * 应用配置
 */
import lottery from '@/pages/lottery/setting'

// 打包应用配置，标题默认第一个
const builds = [lottery]

const systemTitle = builds[0].systemTitle
const systemSubTitle = builds[0].systemSubTitle
const baseURL = builds[0].baseURL

const router = []
const store = []

builds.map(item => {
  router.push(...item.router)
  store.push(item.store)
})

export {
  systemTitle,
  systemSubTitle,
  baseURL,
  router,
  store
}
