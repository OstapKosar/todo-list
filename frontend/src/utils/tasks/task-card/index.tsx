import { cn } from '@/utils/tailwind';
import { filterSingleTaskByPriority } from '@/utils/tasks/priority-filter';
import type { TaskCardProps } from './types';

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const { importantButNotUrgent, urgentAndImportant, notImportantAndNotUrgent, notImportantButUrgent } =
    filterSingleTaskByPriority(task);

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-lg p-3 flex flex-col items-center justify-center border-2 transition-colors hover:cursor-pointer',
        {
          'bg-yellow-100 dark:bg-yellow-100/80 border-yellow-800 dark:border-yellow-800/50 hover:bg-yellow-200 dark:hover:bg-yellow-100/50':
            importantButNotUrgent,
          'bg-red-100 dark:bg-red-100/80 border-red-800 dark:border-red-800/50 hover:bg-red-200 dark:hover:bg-red-100/50':
            urgentAndImportant,
          'bg-green-100 dark:bg-green-100/80 border-green-800 dark:border-green-800/50 hover:bg-green-200 dark:hover:bg-green-100/50':
            notImportantAndNotUrgent,
          'bg-orange-100 dark:bg-orange-100/80 border-orange-800 dark:border-orange-800/50 hover:bg-orange-200 dark:hover:bg-orange-100/50':
            notImportantButUrgent,
        },
      )}
    >
      <h3
        className={cn('font-semibold text-lg text-center', {
          'text-yellow-800 dark:text-yellow-800/50': importantButNotUrgent,
          'text-red-800 dark:text-red-800/50': urgentAndImportant,
          'text-green-800 dark:text-green-800/50': notImportantAndNotUrgent,
          'text-orange-800 dark:text-orange-800/50': notImportantButUrgent,
        })}
      >
        {task.title}
      </h3>
    </div>
  );
};

export default TaskCard;
