import { projects } from '@/constants/demo-data';
import { useDispatch, useSelector } from 'react-redux';

import ProjectCard from '@/components/projects/card';
import CreateProjectModal from '@/components/projects/create-modal';
import DeleteProjectModal from '@/components/projects/delete-modal';
import { openModal } from '@/store/slices/modal/slice';
import { modals } from '@/constants/modals';
import type { RootState } from '@/store/store';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const handleCreateProject = () => {
    dispatch(openModal({ name: modals.createProject }));
  };

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
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
