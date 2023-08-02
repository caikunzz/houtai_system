import service from '@/api/http';

const homeApi = {
  // 验证首页实例
  getVerification: () => service.get(`http://192.168.122.36:1024/api/v1/menus/user_menus`),
  getUserInfo: () => service.get(`http://192.168.122.36:1024/api/v1/users/user_info`),
  RequestContent: () => service.get(`http://192.168.122.36:1024/api/v1/projects/list?is_recycle=0&is_archived=0`),
  // 我执行的
  IexecutedIt: () =>
    service.get(
      `http://192.168.122.36:1024/api/v1/tasks/list?limit=10&offset=0&is_done=0&is_recycle=0&executor_ids=58`,
    ),
  // 我参与的
  IparticipatedIn: () =>
    service.get(
      `http://192.168.122.36:1024/api/v1/tasks/list?limit=10&offset=0&is_done=0&is_recycle=0&participator_id=58`,
    ),
};
export default homeApi;
