import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MatrixPreview from '@/components/matrix/matrix-preview';
import { openModal } from '@/store/slices/modal/slice';
import { modals } from '@/constants/modals';

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const dispatch = useDispatch();

  const handleDeleteProject = () => {
    dispatch(
      openModal({
        name: modals.deleteProject,
        payload: { projectId: project.id },
      }),
    );
  };

  return (
    <div className="flex flex-col justify-center p-6 rounded-lg shadow-sm bg-gray-200 dark:bg-gray-800 hover:shadow-md transition-shadow">
      <div className="p-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{project.name}</h2>
      </div>
      <div className="p-2 pb-4">
        <p className="text-gray-700 dark:text-gray-300 text-md">{project.description}</p>
      </div>
      <div className="w-full flex justify-center">
        <MatrixPreview />
      </div>
      <div className="p-2 pt-4 flex justify-between gap-4">
        <button
          onClick={handleDeleteProject}
          className="text-red-900 dark:text-red-200 hover:text-red-400 rounded-lg transition-colors hover:cursor-pointer"
        >
          Delete Project
        </button>
        <Link
          to={`/dashboard/projects/${project.id}`}
          className="text-blue-900 dark:text-blue-200 hover:text-blue-400 rounded-lg transition-colors"
        >
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
