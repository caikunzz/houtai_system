import { defineStore } from 'pinia';
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
    async getInfo() {
      const res = await loginApi.getVerificationInfo();
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
  },
});

export default user;
