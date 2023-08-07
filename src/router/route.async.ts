// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/LaoutIndex.vue';
import MuneEl from '@/views/myProject/MuneList.vue';

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
        path: 'projectManagement',
        name: 'projectManagement',
        meta: {
          title: '全部项目-Arco',
          icon: '',
        },
        component: MuneEl,
        children: [
          {
            path: 'ProjectLists',
            name: 'ProjectLists',
            meta: {
              title: '',
              icon: '',
            },
            component: () => import('@/views/myProject/projectList.vue'),
            children: [
              {
                path: '1',
                name: 'ProjectLists1',
                meta: {
                  title: '全部项目-Arco',
                  icon: '',
                },
                component: () => import('@/views/myProject/projectLists1.vue'),
              },
              {
                path: '2',
                name: 'ProjectLists2',
                meta: {
                  title: '我的收藏-Arco',
                  icon: '',
                },
                component: () => import('@/views/myProject/projectLists2.vue'),
              },
              {
                path: '3',
                name: 'ProjectLists3',
                meta: {
                  title: '已归档项目-Arco',
                  icon: '',
                },
                component: () => import('@/views/myProject/projectLists3.vue'),
              },
              {
                path: '4',
                name: 'ProjectLists4',
                meta: {
                  title: '回收站-Arco',
                  icon: '',
                },
                component: () => import('@/views/myProject/projectLists4.vue'),
              },
            ],
          },
          {
            path: 'ProjectTemplate',
            name: 'ProjectTemplate',
            meta: {
              title: '项目模板-Arco',
              icon: '',
            },
            component: () => import('@/views/myProject/ProjectTemplate.vue'),
          },
          {
            path: 'message',
            name: 'message',
            meta: {
              title: '',
              icon: '',
            },
            children: [
              {
                path: 'mention',
                name: 'mention',
                meta: {
                  title: '@我-Arco',
                  icon: '',
                },
                component: () => import('@/views/myProject/messageMention.vue'),
              },
              {
                path: 'inform',
                name: 'inform',
                meta: {
                  title: '通知-Arco',
                  icon: '',
                },
                component: () => import('@/views/myProject/messageInform.vue'),
              },
              {
                path: 'personal',
                name: 'personal',
                meta: {
                  title: '私信-Arco',
                  icon: '',
                },
                component: () => import('@/views/myProject/messagePersonal.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default asyncRoutes;
