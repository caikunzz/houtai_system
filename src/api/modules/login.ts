import service from '@/api/http';

const loginApi = {
  // 验证登录实例
  getVerification: (params: object) =>
    service.get(`http://192.168.122.36:1024/api/v1/users/exists_user_unique_fields`, params),
  postVerification: (params: object) => service.post(`http://192.168.122.36:1024/api/v1/users/login`, params),
  postLogin: (params: object) => service.post(`http://192.168.122.36:1024/api/v1/users`, params),
  postVerificationCodes: (params: object) =>
    service.post(`http://192.168.122.36:1024/api/v1/verification_codes`, params),
  putVerificationSetpassword: (params: object) =>
    service.put(`http://192.168.122.36:1024/api/v1/users/password`, params),
  getVerificationInfo: () => service.get(`http://192.168.122.36:1024/api/v1/users/user_info`),
};
export default loginApi;
