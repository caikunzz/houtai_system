// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/LaoutIndex.vue';

const asyncRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/projectView',
  //   name: 'projectView',
  //   meta: {
  //     title: '全部项目-Arco',
  //     icon: '',
  //     // requiresAuth: true,
  //   },
  //   component: () => import('@/views/myProject/projectView.vue'),
  // },
  {
    path: '/Home',
    name: 'Home',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/Home/homeView.vue'),
      },
    ],
  },
];

export default asyncRoutes;
