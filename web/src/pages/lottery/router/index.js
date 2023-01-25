import Layout from '@/layout/index.vue'
import { createNameComponent } from '@/router/createNode'

const route = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: '首页', icon: 'home', hideClose: true },
    children: [
      {
        path: 'home',
        component: createNameComponent(() => import('@/pages/lottery/views/home/index.vue')),
        meta: { title: '首页', icon: 'home', cache: true }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/prize',
    meta: { title: '奖品管理', icon: 'user-level' },
    children: [
      {
        path: 'prize',
        component: createNameComponent(() => import('@/pages/lottery/views/prize/index.vue')),
        meta: { title: '奖品管理', icon: 'user-level', cache: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/user',
    meta: { title: '人员管理', icon: 'user-setting' },
    children: [
      {
        path: 'user',
        component: createNameComponent(() => import('@/pages/lottery/views/user/index.vue')),
        meta: { title: '人员管理', icon: 'user-setting', cache: true }
      }
    ]
  }
]

export default route
