import { defineStore } from 'pinia';
import store from 'store';
import loginApi from '@/api/modules/login';

const user = defineStore('user', {
  state: () => {
    return {
      token: '',
    };
  },
  // pinia 放弃了 mutations 只使用 actions
  actions: {
    // 获取用户信息
    getInfo() {
      return new Promise<void>((resolve, reject) => {
        loginApi
          .getVerificationInfo()
          .then((res) => {
            store.set('user_info', res.data);
            console.log(res.data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 登录 赋值token令牌
    login(Form: NonNullable<unknown>) {
      return new Promise<void>((resolve, reject) => {
        loginApi
          .postVerification(Form)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出登录
    logout() {
      return new Promise<void>((resolve, reject) => {
        loginApi
          .postLogout()
          .then(() => {
            // 清除当前用户信息
            store.remove('user_token');
            store.remove('user_info');
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

export default user;
