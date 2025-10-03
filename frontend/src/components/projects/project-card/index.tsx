import { Link } from 'react-router-dom';
import MatrixPreview from '../../matrix/matrix-preview';

const ProjectCard = ({ project }: { project: { id: number; name: string; description: string } }) => (
  <div className="flex flex-col justify-center p-6 rounded-lg shadow-sm bg-gray-200 dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer">
    <div className="p-2">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{project.name}</h2>
    </div>
    <div className="p-2 pb-4">
      <p className="text-gray-700 dark:text-gray-300 text-sm">{project.description}</p>
    </div>
    <div className="w-full flex justify-center">
      <MatrixPreview />
    </div>
    <div className="p-4">
      <Link
        to={`/projects/${project.id}`}
        className="text-gray-800 dark:text-gray-200 hover:text-blue-500 rounded-lg transition-colors"
      >
        View Project
      </Link>
    </div>
  </div>
);

export default ProjectCard;
