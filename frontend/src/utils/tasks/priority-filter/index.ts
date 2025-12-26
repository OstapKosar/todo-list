import type { Task } from '@/store/slices/projects/types';
import type { TaskPriorityCategory, FilterSingleTaskByPriority, FilterTasksByPriority } from './types';

export const getTaskPriorityCategory = (task: Task): TaskPriorityCategory => {
  if (task.important && !task.urgent) {
    return 'importantButNotUrgent';
  }
  if (task.important && task.urgent) {
    return 'urgentAndImportant';
  }
  if (!task.important && !task.urgent) {
    return 'notImportantAndNotUrgent';
  }
  return 'notImportantButUrgent';
};

export const filterSingleTaskByPriority = (task: Task): FilterSingleTaskByPriority => {
  const category = getTaskPriorityCategory(task);
  return {
    importantButNotUrgent: category === 'importantButNotUrgent',
    urgentAndImportant: category === 'urgentAndImportant',
    notImportantAndNotUrgent: category === 'notImportantAndNotUrgent',
    notImportantButUrgent: category === 'notImportantButUrgent',
  };
};

export const filterTasksByPriority = (tasks: Task[]): FilterTasksByPriority => {
  return {
    importantButNotUrgent: tasks.filter((task) => getTaskPriorityCategory(task) === 'importantButNotUrgent'),
    urgentAndImportant: tasks.filter((task) => getTaskPriorityCategory(task) === 'urgentAndImportant'),
    notImportantAndNotUrgent: tasks.filter((task) => getTaskPriorityCategory(task) === 'notImportantAndNotUrgent'),
    notImportantButUrgent: tasks.filter((task) => getTaskPriorityCategory(task) === 'notImportantButUrgent'),
  };
};
