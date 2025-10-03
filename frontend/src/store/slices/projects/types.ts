export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type ProjectsState = {
  projects: Project[];
  isCreateModalOpen: boolean;
};
