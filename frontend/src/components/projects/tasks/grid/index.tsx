import type { Task } from '@/store/slices/projects/types';

const ProjectTasksGrid = ({ tasks }: { tasks: Task[] }) => {
  const importantButNotUrgent = tasks.filter((task) => task.importance && !task.urgency);
  const urgentAndImportant = tasks.filter((task) => task.importance && task.urgency);
  const notImportantAndNotUrgent = tasks.filter((task) => !task.importance && !task.urgency);
  const notImportantButUrgent = tasks.filter((task) => !task.importance && task.urgency);

  return (
    <div className="grid grid-cols-2 gap-4 h-full max-h-1/2 overflow-hidden">
      <div className="bg-yellow-200 dark:bg-yellow-200/80 rounded-lg p-4 flex flex-col items-center justify-start border-6 border-yellow-800 dark:border-yellow-900/50 overflow-hidden">
        <h2 className="text-yellow-800 dark:text-yellow-900/50 font-bold text-2xl text-center mb-4">
          Important but not Urgent
        </h2>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll h-48 -gray-400">
          {importantButNotUrgent.map((task) => (
            <div
              key={task.id}
              className="bg-yellow-100 dark:bg-yellow-100/80 rounded-lg p-3 flex flex-col items-center justify-center border-2 border-yellow-800 dark:border-yellow-800/50 hover:cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-100/50 transition-colors"
            >
              <h3 className="text-yellow-800 dark:text-yellow-800/50 font-semibold text-lg text-center">
                {task.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-red-200 dark:bg-pink-200/80 rounded-lg p-4 flex flex-col items-center justify-start border-6 border-red-800 dark:border-red-900/50 overflow-hidden">
        <h2 className="text-red-800 dark:text-pink-900/50 font-bold text-2xl text-center mb-4">Urgent and Important</h2>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll h-48 -gray-400">
          {urgentAndImportant.map((task) => (
            <div
              key={task.id}
              className="bg-red-100 dark:bg-red-100/80 rounded-lg p-3 flex flex-col items-center justify-center border-2 border-red-800 dark:border-red-800/50 hover:cursor-pointer hover:bg-red-200 dark:hover:bg-red-100/50 transition-colors"
            >
              <h3 className="text-red-800 dark:text-red-800/50 font-semibold text-lg text-center">{task.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-green-200 dark:bg-teal-200/80 rounded-lg p-4 flex flex-col items-center justify-start border-6 border-green-800 dark:border-green-900/50 overflow-hidden">
        <h2 className="text-green-800 dark:text-teal-900/50 font-bold text-2xl text-center mb-4">
          Not Important and Not Urgent
        </h2>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll h-48 -gray-400">
          {notImportantAndNotUrgent.map((task) => (
            <div
              key={task.id}
              className="bg-green-100 dark:bg-green-100/80 rounded-lg p-3 flex flex-col items-center justify-center border-2 border-green-800 dark:border-green-800/50 hover:cursor-pointer hover:bg-green-200 dark:hover:bg-green-100/50 transition-colors"
            >
              <h3 className="text-green-800 dark:text-green-800/50 font-semibold text-lg text-center">{task.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-orange-200 dark:bg-orange-200/80 rounded-lg p-4 flex flex-col items-center justify-start border-6 border-orange-800 dark:border-orange-900/50 overflow-hidden">
        <h2 className="text-orange-800 dark:text-orange-900/50 font-bold text-2xl text-center mb-4">
          Not Important but Urgent
        </h2>
        <div className="flex flex-col gap-2 w-full overflow-y-scroll h-48 -gray-400">
          {notImportantButUrgent.map((task) => (
            <div
              key={task.id}
              className="bg-orange-100 dark:bg-orange-100/80 rounded-lg p-3 flex flex-col items-center justify-center border-2 border-orange-800 dark:border-orange-800/50 hover:cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-100/50 transition-colors"
            >
              <h3 className="text-orange-800 dark:text-orange-800/50 font-semibold text-lg text-center">
                {task.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTasksGrid;
