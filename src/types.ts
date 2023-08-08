// 项目列表
export interface projectList {
  collector: [];
  cover: string;
  created_at: string;
  creator: object;
  id: number;
  intro: string;
  is_archived: number;
  is_auto_progress: number;
  is_private: number;
  is_recycle: number;
  manager_id: number;
  member: [];
  name: string;
  parent_id: number;
  progress: number;
  project_template_id: number;
  state: number;
  updated_at: string;
}

export interface RouteRecordRaw {
  path?: string;
  name?: string;
  component?: any;
  meta?: {
    id?: number;
    parent_id?: number;
    icon?: string;
    hidden?: boolean;
    title?: string;
  };
  children?: object[];
}

export interface InfoType {
  avatar: string;
  city: string;
  company: string;
  created_at: string;
  department_id: number;
  email: string;
  id: number;
  last_login: string;
  nickname: string;
  permissions: string[];
  phone: string;
  roles: object[];
  state: number;
  updated_at: string;
  user_id_github: number;
  username: string;
  menu: object[];
}
