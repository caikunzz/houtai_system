import service from '@/api/http';

const loginApi = {
  // 验证登录实例
  postVerification: (params: object) => service.post(`/login`, params),
  RegUserinfo: (params: object) => service.get('/api/v1/users/exists_user_unique_fields', params),
  RegLogin: (params: object) => service.post('/api/v1/users/login', params),
  GetRegCode: (params: object) => service.post('/verification_codes', params),
};

export default loginApi;

// export const RegUserinfo = async (data: { username: string }) =>
//   (await service.get<{ code: 0 | 404; data: null; msg: string }>('/api/v1/users/exists_user_unique_fields', data)).data;
