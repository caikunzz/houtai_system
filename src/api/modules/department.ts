import service from '@/api/http';

const DepartmentApi = {
  // 搜索人员
  getPeople: (params: object) => service.get(`/api/v1/users/list`, params),
  // 获取部门
  getDepartments: () => service.get(`/api/v1/departments/list`),
  // 人员详情信息
  getUserDetail: (params: object) => service.get('/api/v1/users', params),
};

export default DepartmentApi;
