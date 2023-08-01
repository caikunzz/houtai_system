import service from '@/api/http';
// 项目页面
const projectApi = {
  getProjectsList: (params: object) => service.get(`/api/v1/projects/list`, params),
};
export default projectApi;
