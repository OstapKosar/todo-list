import { useDispatch } from 'react-redux';

import { modals } from '@/constants/modals';
import type { AppDispatch } from '@/store/store';
import { openModal } from '@/store/slices/modal/slice';
import type { Task } from '@/store/slices/projects/types';
import { filterTasksByPriority } from '@/utils/tasks/priority-filter';
import { TaskCard } from '@/utils/tasks/task-card';

const ProjectTasksGrid = ({ tasks }: { tasks: Task[] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { importantButNotUrgent, urgentAndImportant, notImportantAndNotUrgent, notImportantButUrgent } =
    filterTasksByPriority(tasks);

  const handleTaskClick = (task: Task) => {
    dispatch(openModal({ name: modals.taskDetails, payload: { task } }));
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full max-h-1/2 overflow-hidden">
      <div className="bg-yellow-200 dark:bg-yellow-200/80 rounded-lg p-4 flex flex-col items-center justify-start border-6 border-yellow-800 dark:border-yellow-900/50 overflow-hidden">
        <h2 className="text-yellow-800 dark:text-yellow-900/50 font-bold text-2xl text-center mb-4">
          Important but not Urgent
        </h2>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll h-48 -gray-400">
          {importantButNotUrgent.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
          ))}
        </div>
      </div>
      <div className="bg-red-200 dark:bg-pink-200/80 rounded-lg p-4 flex flex-col items-center justify-start border-6 border-red-800 dark:border-red-900/50 overflow-hidden">
        <h2 className="text-red-800 dark:text-pink-900/50 font-bold text-2xl text-center mb-4">Urgent and Important</h2>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll h-48 -gray-400">
          {urgentAndImportant.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
          ))}
        </div>
      </div>
      <div className="bg-green-200 dark:bg-teal-200/80 rounded-lg p-4 flex flex-col items-center justify-start border-6 border-green-800 dark:border-green-900/50 overflow-hidden">
        <h2 className="text-green-800 dark:text-teal-900/50 font-bold text-2xl text-center mb-4">
          Not Important and Not Urgent
        </h2>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll h-48 -gray-400">
          {notImportantAndNotUrgent.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
          ))}
        </div>
      </div>
      <div className="bg-orange-200 dark:bg-orange-200/80 rounded-lg p-4 flex flex-col items-center justify-start border-6 border-orange-800 dark:border-orange-900/50 overflow-hidden">
        <h2 className="text-orange-800 dark:text-orange-900/50 font-bold text-2xl text-center mb-4">
          Not Important but Urgent
        </h2>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll h-48 -gray-400">
          {notImportantButUrgent.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTasksGrid;
