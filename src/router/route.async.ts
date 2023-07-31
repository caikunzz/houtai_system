// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/projectView',
    name: 'projectView',
    meta: {
      title: '全部项目-Arco',
      icon: '',
      // requiresAuth: true,
    },
    component: () => import('@/views/myProject/projectView.vue'),
  },
];

export default asyncRoutes;
