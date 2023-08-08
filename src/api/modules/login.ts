import service from '@/api/http';

const loginApi = {
  getVerification: (params: object) => service.get(`/api/v1/users/exists_user_unique_fields`, params),
  postVerification: (params: object) => service.post(`/api/v1/users/login`, params),
  postLogin: (params: object) => service.post(`/api/v1/users`, params),
  postVerificationCodes: (params: object) => service.post(`/api/v1/verification_codes`, params),
  putVerificationSetpassword: (params: object) => service.put(`/api/v1/users/password`, params),
  getVerificationInfo: () => service.get(`/api/v1/users/user_info`),
  getMenus: () => service.get('/api/v1/menus/user_menus'),
  postLogout: () => service.post('/api/v1/users/logout'),
};
export default loginApi;
