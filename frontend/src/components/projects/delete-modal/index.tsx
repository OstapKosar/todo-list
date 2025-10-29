import Modal from '@/components/modal';
import { modals } from '@/constants/modals';
import { removeProject } from '@/store/slices/projects/slice';
import { closeModal } from '@/store/slices/modal/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectModal } from '@/store/slices/modal/selectors';

const Content = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { payload } = useSelector(selectModal);

  const handleCloseModal = () => {
    dispatch(closeModal({ name: modals.deleteProject }));
  };

  const handleDeleteProject = () => {
    const projectId = (payload as { projectId: string }).projectId;
    dispatch(removeProject({ id: projectId }));
    dispatch(closeModal({ name: modals.deleteProject }));
    navigate('/dashboard');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md flex flex-col gap-4 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col pb-4">
        <h3 className="text-lg pb-2 font-semibold text-gray-800 dark:text-gray-100">Delete Project</h3>
        <p className="text-gray-600 dark:text-gray-400">Are you sure you want to delete this project?</p>
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={handleCloseModal}
          className="text-gray-900 dark:text-gray-200 hover:text-gray-400 rounded-lg transition-colors hover:cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteProject}
          className="text-red-900 dark:text-red-200 hover:text-red-400 rounded-lg transition-colors hover:cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const DeleteProjectModal = () => {
  return (
    <Modal modalName={modals.deleteProject}>
      <Content />
    </Modal>
  );
};

export default DeleteProjectModal;
