import service from '@/api/http';

const homeApi = {
  // 验证首页实例
  getVerification: () => service.get(`/api/v1/menus/user_menus`),
  getUserInfo: () => service.get(`/api/v1/users/user_info`),
};
export default homeApi;
