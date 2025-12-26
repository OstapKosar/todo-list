export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export type Project = {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  urgent: boolean;
  important: boolean;
  status: TaskStatus;
};

export type ProjectsState = {
  projects: Project[];
  allProjectsLoading: boolean;
  projectLoading: boolean;
  error: string | null;
};
