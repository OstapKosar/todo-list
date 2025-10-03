import { useState } from 'react';
import ProjectCard from '../../components/projects/project-card';
import { openCreateModal } from '../../store/slices/projects/slice';
import { useDispatch } from 'react-redux';
import CreateProjectModal from '../../components/projects/create-project-modal';

const DashboardPage = () => {
  const dispatch = useDispatch();

  const [projects] = useState([
    {
      id: 1,
      name: 'Todo App',
      description: 'Manage your daily tasks efficiently.',
    },
    { id: 2, name: 'Notes App', description: 'Take and organize notes.' },
    {
      id: 3,
      name: 'Workout Tracker',
      description: 'Track your workouts and progress.',
    },
  ]);

  const handleCreateProject = () => {
    dispatch(openCreateModal());
  };

  return (
    <div className="flex flex-col p-10 min-h-screen">
      <CreateProjectModal />
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Your Projects</h1>
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
