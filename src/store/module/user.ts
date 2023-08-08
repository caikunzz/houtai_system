import { defineStore } from 'pinia';
import store from 'store';

import loginApi from '@/api/modules/login';
import router from '@/router';

const modules = import.meta.glob('@/views/**/*.vue');

const loadView = (RouterName: string) => {
  let module = null;
  if (RouterName.indexOf('/') < 0) {
    const str = RouterName.replace(RouterName[0], RouterName[0].toLowerCase());
    module = modules[`/src/views/${str}/${str}.vue`] as any;
  } else {
    module = modules[`/src/${RouterName}.vue`] as any;
  }
  return module;
};

const user = defineStore('user', {
  state: () => {
    return {
      token: '',
    };
  },
  actions: {
    // 获取存储用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        loginApi
          .getVerificationInfo()
          .then(async (response) => {
            response.data.menu = (await this.getMenu()) as object[];
            store.set('user_info', response.data);
            resolve(response.data);
          })
          .catch((error) => {
            this.logout();
            ElMessage({
              type: 'error',
              message: '用户信息获取失败,请重新登录!',
            });
            reject(error);
          });
      });
    },
    // 登录 赋值token令牌
    login(Form: object) {
      loginApi
        .postVerification(Form)
        .then((res) => {
          store.set('user_token', res.data.accessToken);
          router.push('/').then();
        })
        .catch((error) => {
          ElMessage({
            type: 'error',
            message: '密码错误,请重试',
          });
        });
    },
    // 退出登录
    async logout() {
      store.remove('user_token');
      store.remove('user_info');
      await loginApi.postLogout();
    },
    // 获取动态路由菜单
    getMenu() {
      return new Promise((resolve, reject) => {
        loginApi
          .getMenus()
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 处理动态路由和个人信息
    generate(From: object[]) {
      return new Promise((resolve) => {
        interface RouteType {
          id?: number;
          path?: string;
          name?: string;
          icon?: string;
          title?: string;
          hidden?: boolean;
          component?: any;
          meta?: object;
          role_menus?: object;
          parent_id?: number;
        }
        const NewForm = From.map((item: RouteType) => {
          const data = {
            path: item.path?.startsWith('/') ? item.path?.substring(1, item.path?.length) : item.path,
            name: item.name,
            meta: {
              ...item.role_menus,
              title: item.title,
              id: item.id,
              parent_id: item.parent_id,
              icon: item.icon,
              hidden: item.hidden,
            },
            component: loadView(
              item.component === 'Layout' || item.component === 'EmptyLayout' ? item.name : item.component,
            ),
          };
          return data;
        });
        store.set('menu', NewForm);
        resolve(NewForm);
      });
    },
  },
});

export default user;
