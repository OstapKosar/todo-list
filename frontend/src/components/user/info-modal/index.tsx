import { useDispatch } from 'react-redux';

import Modal from '@/components/modal';
import { modals } from '@/constants/modals';
import { closeModal, openModal } from '@/store/slices/modal/slice';
import type { UserState } from '@/store/slices/user/types';
import AccountStatus from './account-status';

export type UserProps = {
  user: NonNullable<UserState['user']>;
};

const Content = ({ user }: UserProps) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal({ name: modals.userInfo }));
  };

  const handleEditUser = () => {
    dispatch(openModal({ name: modals.editUser }));
    dispatch(closeModal({ name: modals.userInfo }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="mb-6">
        <AccountStatus textSize="lg" />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCloseModal}
          className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium hover:cursor-pointer"
        >
          Close
        </button>
        <button
          onClick={handleEditUser}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium hover:cursor-pointer"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const UserInfoModal = ({ user }: UserProps) => {
  return (
    <Modal modalName={modals.userInfo}>
      <Content user={user} />
    </Modal>
  );
};

export default UserInfoModal;
