// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/LaoutIndex.vue';

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/Home',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: Layout,
    redirect: '/Home/index',
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
      {
        path: 'department',
        name: 'department',
        meta: {
          title: '人员管理',
          icon: '',
        },
        component: () => import('@/views/Department/departmentView.vue'),
      },
      {
        path: '/information',
        name: 'information',
        meta: {
          title: '个人中心-Arco',
          icon: '',
        },
        component: () => import('@/views/userInformation/userInformation.vue'),
      },
    ],
  },
];

export default asyncRoutes;
