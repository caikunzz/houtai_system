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

interface Task {
  id: number | null;
  name: string | '';
  project_template_id: number | null;
  sort: number | null;
}
export interface ProjectTemplate {
  cover: string | '';
  created_at: string | '';
  id: number | null;
  intro: string | '';
  is_custom: number;
  name: string | '';
  project_template_tasks: Task[];
  updated_at: string | '';
}
