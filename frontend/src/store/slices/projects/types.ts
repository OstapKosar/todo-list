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
  urgency: number;
  importance: number;
  isCompleted: boolean;
};

export type ProjectsState = {
  projects: Project[];
};
