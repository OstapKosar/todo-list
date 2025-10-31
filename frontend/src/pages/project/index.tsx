import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProjectTasksGrid from '@/components/tasks/grid';
import TasksModal from '@/components/tasks/modal';
import CreateTaskModal from '@/components/tasks/create-modal';
import { modals } from '@/constants/modals';
import { openModal } from '@/store/slices/modal/slice';
import { getProject } from '@/store/slices/projects/thunk';
import type { AppDispatch, RootState } from '@/store/store';

const ProjectDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const project = useSelector((state: RootState) => state.projects.projects.find((p) => p.id === id));
  const error = useSelector((state: RootState) => state.projects.error);

  useEffect(() => {
    if (id && !project) {
      dispatch(getProject(id));
    }
  }, [dispatch, id, project]);

  const handleOpenTasksModal = () => {
    dispatch(openModal({ name: modals.projectTasks }));
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-full min-h-[60vh]">
        <p className="text-red-500 dark:text-red-400">An error occurred while loading project: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen flex justify-center items-center">
      <TasksModal tasks={project?.tasks || []} />
      <CreateTaskModal projectId={id as string} />
      <div className="flex flex-col h-full bg-gray-200 dark:bg-gray-800 p-10 rounded-lg w-full max-w-[85%]">
        <div className="flex items-center justify-between w-full mb-6">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{project?.name}</h1>
          <div className="flex justify-between items-center gap-4">
            <Link
              to={'/dashboard'}
              className="text-gray-900 dark:text-gray-300 hover:text-gray-400 text-md rounded-lg transition-colors hover:cursor-pointer"
            >
              All Projects
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
          <ProjectTasksGrid tasks={project?.tasks || []} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
