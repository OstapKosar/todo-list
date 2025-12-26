import { useDispatch } from 'react-redux';

import Modal from '@/components/modal';
import { modals } from '@/constants/modals';
import { TaskCard } from '@/utils/tasks/task-card';
import { filterTasksByPriority } from '@/utils/tasks/priority-filter';
import type { Task } from '@/store/slices/projects/types';
import type { AppDispatch } from '@/store/store';
import { closeModal, openModal } from '@/store/slices/modal/slice';

const Content = ({ tasks }: { tasks: Task[] }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModal = () => {
    dispatch(closeModal({ name: modals.projectTasks }));
  };

  const handleOpenAddTaskModal = () => {
    dispatch(closeModal({ name: modals.projectTasks }));
    dispatch(openModal({ name: modals.createProjectTask }));
  };

  const { importantButNotUrgent, urgentAndImportant, notImportantAndNotUrgent, notImportantButUrgent } =
    filterTasksByPriority(tasks);
  const allTasks = [
    ...urgentAndImportant,
    ...importantButNotUrgent,
    ...notImportantButUrgent,
    ...notImportantAndNotUrgent,
  ];

  const handleTaskClick = (task: Task) => {
    dispatch(openModal({ name: modals.taskDetails, payload: { task } }));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg min-w-[350px]">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Tasks</h1>
        <div className="flex flex-col gap-3 w-full max-h-80 overflow-y-auto">
          {allTasks.length > 0 ? (
            allTasks.map((task) => <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full justify-between items-center mt-8 gap-4">
        <button
          onClick={handleCloseModal}
          className="m-3 text-gray-400 dark:text-gray-500 rounded-lg hover:text-gray-500 dark:hover:text-gray-400 transition-colors cursor-pointer"
        >
          Back to Project
        </button>
        <button
          className="m-3 text-blue-900 dark:text-blue-200 hover:text-blue-400 rounded-lg transition-colors hover:cursor-pointer"
          onClick={handleOpenAddTaskModal}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};
const TasksModal = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Modal modalName={modals.projectTasks}>
      <Content tasks={tasks} />
    </Modal>
  );
};
export default TasksModal;
