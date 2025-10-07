import { useDispatch } from 'react-redux';

import ProjectTasksGrid from '@/components/projects/tasks/grid';
import TasksModal from '@/components/projects/tasks/modal';
import { modals } from '@/constants/modals';
import { openModal } from '@/store/slices/modal/slice';
import { Link } from 'react-router-dom';

const ProjectDetailsPage = () => {
  const dispatch = useDispatch();

  const handleOpenTasksModal = () => {
    dispatch(openModal({ name: modals.projectTasks }));
  };

  return (
    <div className="p-10 min-h-screen flex justify-center items-center">
      <TasksModal />
      <div className="flex flex-col h-full bg-gray-200 dark:bg-gray-800 p-10 rounded-lg w-full max-w-[85%]">
        <div className="flex items-center justify-between w-full mb-6">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{'project-name'}</h1>
          <div className="flex justify-between items-center gap-4">
            <Link
              to={'/dashboard'}
              className="text-gray-900 dark:text-gray-300 hover:text-gray-400 text-md rounded-lg transition-colors hover:cursor-pointer"
            >
              Go Back
            </Link>
            <button
              className="text-blue-900 dark:text-blue-200 hover:text-blue-400 text-lg rounded-lg transition-colors hover:cursor-pointer"
              onClick={handleOpenTasksModal}
            >
              Tasks List
            </button>
          </div>
        </div>
        <div className="h-full w-full">
          <ProjectTasksGrid />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
