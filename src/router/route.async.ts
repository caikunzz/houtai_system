// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/LaoutIndex.vue';

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home/index',
  },
  {
    path: '/Home',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/Home/homeView.vue'),
        meta: {
          title: '首页-Arco',
          icon: '',
        },
      },
      {
        path: 'projectView',
        name: 'projectView',
        meta: {
          title: '全部项目-Arco',
          icon: '',
        },
        component: () => import('@/views/myProject/projectView.vue'),
      },
    ],
  },
];

export default asyncRoutes;
