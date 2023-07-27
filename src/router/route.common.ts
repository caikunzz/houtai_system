// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

const commonRoutes: Array<RouteRecordRaw> = [
    {
        path: '/Login',
        component: () => import('@/views/Login/Login.vue'),
    },
];

export default commonRoutes;
