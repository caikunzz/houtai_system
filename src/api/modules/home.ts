import service from '@/api/http';

const homeApi = {
  // 验证首页实例
  getVerification: () => service.get(`http://192.168.122.36:1024/api/v1/menus/user_menus`),
  getUserInfo: () => service.get(`http://192.168.122.36:1024/api/v1/users/user_info`),
};
export default homeApi;
