import service from '@/api/http';

const loginApi = {
  // 验证登录实例
  // 用户名验证
  postVerification: (params: object) => service.get(`/api/v1/users/exists_user_unique_fields`, params),
  // 密码验证
  postpassword: (params: object) => service.post(`/api/v1/users/login`, params),
};



export default loginApi;
