import Layout from '@/layout/index.vue'
import { createNameComponent } from '@/router/createNode'
const route = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'dashboard', icon: 'home' },
    children: [
      {
        path: 'dashboard',
        component: createNameComponent(() => import('@/views/pages/dashboard/index.vue')),
        meta: { title: '首页', icon: 'home', hideClose: true }
      }
    ]
  }
]

export default route
