import type { Task } from '@/store/slices/projects/types';

export type TaskPriorityCategory =
  | 'importantButNotUrgent'
  | 'urgentAndImportant'
  | 'notImportantAndNotUrgent'
  | 'notImportantButUrgent';

export type FilterSingleTaskByPriority = {
  importantButNotUrgent: boolean;
  urgentAndImportant: boolean;
  notImportantAndNotUrgent: boolean;
  notImportantButUrgent: boolean;
};

export type FilterTasksByPriority = {
  importantButNotUrgent: Task[];
  urgentAndImportant: Task[];
  notImportantAndNotUrgent: Task[];
  notImportantButUrgent: Task[];
};
