// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/LaoutIndex.vue';

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/layout',
  },
  {
    path: '/layout',
    redirect: '/layout',
    component: Layout,
    name: 'Home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '',
        name: 'Layout',
        meta: {
          title: '首页-子页',
        },
        component: () => import('@/views/layout/layout.vue'),
      },
    ],
  },
];

export default asyncRoutes;
