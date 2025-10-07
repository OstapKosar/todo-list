import { useDispatch } from 'react-redux';

import Modal from '@/components/modal';
import { modals } from '@/constants/modals';
import { closeModal } from '@/store/slices/modal/slice';
import { tasks } from '@/constants/demo-data';

const Content = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal({ name: modals.tasks }));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg min-w-[350px]">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Tasks</h1>
        <div className="flex flex-col gap-3 w-full max-h-80 overflow-y-auto">
          {tasks.map((task) => (
            <div key={task.id} className="flex flex-col items-start bg-gray-300 dark:bg-gray-700 p-4 w-full rounded-lg">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{task.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between items-center mt-8 gap-4">
        <button
          onClick={handleCloseModal}
          className="m-3 text-gray-400 dark:text-gray-500 rounded-lg hover:text-gray-500 dark:hover:text-gray-400 transition-colors cursor-pointer"
        >
          Go Back
        </button>
        <button className="px-6 mx-3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
          Add Task
        </button>
      </div>
    </div>
  );
};
const TasksModal = () => {
  return (
    <Modal modalName={modals.tasks}>
      <Content />
    </Modal>
  );
};
export default TasksModal;
