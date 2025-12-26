import { useFormContext } from 'react-hook-form';

import { cn } from '@/utils/tailwind';

import type { TaskStatus } from '@/store/slices/projects/types';

const STATUS_ORDER: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED'];

const StatusCheckbox = () => {
  const { getValues, setValue, watch } = useFormContext();
  const status = (watch('status') || getValues('status') || 'TODO') as TaskStatus;

  const handleToggle = () => {
    const currentIndex = STATUS_ORDER.indexOf(status);
    const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;
    const nextStatus = STATUS_ORDER[nextIndex];
    setValue('status', nextStatus, { shouldDirty: true, shouldValidate: true, shouldTouch: true });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          'group w-full h-10 border-2 rounded-full relative cursor-pointer transition-all duration-200 shadow',
          {
            'bg-red-200 dark:bg-pink-200/80 border-red-800 text-red-800 dark:text-red-900/50 dark:border-red-900/50':
              status === 'TODO',
            'bg-orange-200 dark:bg-orange-200/80 border-orange-800 text-orange-800 dark:text-orange-900/50 dark:border-orange-900/50':
              status === 'IN_PROGRESS',
            'bg-green-200 dark:bg-teal-200/80 border-2 border-green-800 text-green-800 dark:text-green-900/50 dark:border-green-900/50':
              status === 'COMPLETED',
          },
        )}
      >
        <div
          className={cn(
            'h-8 w-1/3 absolute top-1/2 -translate-y-1/2 left-1 bg-white/70 rounded-full transition-all duration-200 ease flex items-center justify-center text-center group-hover:bg-gray-500/30 dark:group-hover:bg-gray-700/30',
            {
              'left-1': status === 'TODO',
              'left-1/2 -translate-x-1/2': status === 'IN_PROGRESS',
              'left-[calc(100%-2rem)]': status === 'COMPLETED',
            },
          )}
        >
          <span className="flex items-center justify-center select-none transition-transform duration-200 ease-in-out">
            <span
              className={cn('text-green-800 dark:text-green-900/50', {
                'text-red-800 dark:text-red-900/50': status === 'TODO',
                'text-orange-800 dark:text-orange-900/50': status === 'IN_PROGRESS',
                'text-green-800 dark:text-green-900/50': status === 'COMPLETED',
              })}
            >
              {status.toUpperCase()}
            </span>
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full flex items-center justify-between px-2">
            <span
              className={cn(
                'text-xs font-semibold transition-opacity duration-200',
                status === 'TODO' ? 'opacity-100' : 'opacity-30',
              )}
            >
              TODO
            </span>
            <span
              className={cn(
                'text-xs font-semibold transition-opacity duration-200',
                status === 'IN_PROGRESS' ? 'opacity-100' : 'opacity-30',
              )}
            >
              IN PROGRESS
            </span>
            <span
              className={cn(
                'text-xs font-semibold transition-opacity duration-200',
                status === 'COMPLETED' ? 'opacity-100' : 'opacity-30',
              )}
            >
              COMPLETED
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default StatusCheckbox;
