import service from '@/api/http';
// 项目页面
import type { ProjectTemplate } from '@/views/myProject/type';

type T = {
  code: number;
  data: {
    count: number;
    rows: ProjectTemplate[];
  };
  msg: string;
};

const projectApi = {
  putProjects: (params: object) => service.put(`http://192.168.122.36:1024/api/v1/projects`, params),
  getProject_template_tasks: (params: object) =>
    service.get<T>(`http://192.168.122.36:1024/api/v1/project_template_tasks/list`, params),
  postProject_template: (params: object) =>
    service.post<T>(`http://192.168.122.36:1024/api/v1/project_template_tasks`, params),
  deleteProject_template: (params: object) =>
    service.delete<T>(`http://192.168.122.36:1024/api/v1/project_template_tasks`, params),
  putProject_template: (params: object) =>
    service.put<T>(`http://192.168.122.36:1024/api/v1/project_template_tasks`, params),
  newPutProjects: (params: object) => service.post(`http://192.168.122.36:1024/api/v1/projects`, params),
  getUser_info: () => service.get(`http://192.168.122.36:1024/api/v1/users/user_info`),
  getUserslist: (params: object) => service.get<T>(`http://192.168.122.36:1024/api/v1/users/list`, params),
  getProjectsList: (params: object) => service.get<T>(`http://192.168.122.36:1024/api/v1/projects/list`, params),
  getprojectTemplates: (params: object) =>
    service.get<T>(`http://192.168.122.36:1024/api/v1/project_templates/list`, params),
  getimg: (params: any) => service.post<T>(`http://192.168.122.36:1024/api/v1/uploads`, params),
  postProject_templates: (params: any) =>
    service.post<T>(`http://192.168.122.36:1024/api/v1/project_templates`, params),
  deleteTem: (params: any) => service.delete(`http://192.168.122.36:1024/api/v1/project_templates`, params),
  putTem: (params: any) => service.put(`http://192.168.122.36:1024/api/v1/project_templates`, params),
  postChange: (params: any) =>
    service.post<T>(`http://192.168.122.36:1024/api/v1/user_project_collects/change`, params),
};
export default projectApi;
