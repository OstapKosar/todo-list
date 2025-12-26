import type { Task } from '@/store/slices/projects/types';

export type TaskCardProps = {
  task: Task;
  onClick?: () => void;
};
