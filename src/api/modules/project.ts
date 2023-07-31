import service from '@/api/http';
// 项目页面
const projectApi = {
  getProjectsList: (params: object) => service.get(`http://192.168.122.36:1024/api/v1/projects/list`, params),
};
export default projectApi;
