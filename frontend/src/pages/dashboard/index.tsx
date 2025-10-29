import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProjectCard from '@/components/projects/card';
import CreateProjectModal from '@/components/projects/create-modal';
import DeleteProjectModal from '@/components/projects/delete-modal';
import { openModal } from '@/store/slices/modal/slice';
import { modals } from '@/constants/modals';
import type { AppDispatch, RootState } from '@/store/store';
import { getProjects } from '@/store/slices/projects/thunk';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const projects = useSelector((state: RootState) => state.projects.projects);
  const projectsLoading = useSelector((state: RootState) => state.projects.loading);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.projects.error);

  useEffect(() => {
    if (!userLoading && user) {
      dispatch(getProjects());
    }
  }, [dispatch, userLoading, user]);

  const handleCreateProject = () => {
    dispatch(openModal({ name: modals.createProject }));
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500 dark:text-red-400">An error occurred while loading projects: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-10 min-h-screen">
      <CreateProjectModal />
      <DeleteProjectModal />
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{user?.name} Projects</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          onClick={handleCreateProject}
        >
          Create New Project
        </button>
      </div>
      <hr className="border-gray-200 dark:border-gray-700 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.length > 0
          ? projects.map((project) => <ProjectCard key={project.id} project={project} />)
          : !projectsLoading && (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 dark:text-gray-400">No projects found</p>
              </div>
            )}
      </div>
    </div>
  );
};

export default DashboardPage;
