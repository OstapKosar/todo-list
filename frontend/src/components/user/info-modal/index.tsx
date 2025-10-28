import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';

import Modal from '@/components/modal';
import { modals } from '@/constants/modals';
import { closeModal, openModal } from '@/store/slices/modal/slice';
import AccountStatus from './account-status';
import { makeRequest } from '@/utils/api/make-request';
import { updateUser } from '@/store/slices/user/slice';
import type { UserProps } from './types';

const Content = ({ user }: UserProps) => {
  const dispatch = useDispatch();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(user.name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isVerified = user.status === 'VERIFIED';

  const handleCloseModal = () => {
    dispatch(closeModal({ name: modals.userInfo }));
  };

  const handleChangePassword = () => {
    dispatch(openModal({ name: modals.changePassword }));
    dispatch(closeModal({ name: modals.userInfo }));
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (nameValue === user.name) {
      toast.warning('No changes to save');
      return;
    }

    setIsSubmitting(true);
    try {
      await makeRequest('/user/update-user-info', 'PATCH', { name: nameValue });

      dispatch(updateUser({ name: nameValue }));

      toast.success('Name updated successfully!');
      setIsEditingName(false);
    } catch {
      toast.error('Failed to update name');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setNameValue(user.name);
    setIsEditingName(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          {isEditingName ? (
            <div className="flex items-center gap-3 w-full justify-between">
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                className="text-2xl w-full font-bold text-gray-800 dark:text-gray-100 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-600"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                disabled={isSubmitting}
                className="text-blue-900 dark:text-blue-200 hover:text-blue-400 rounded-lg transition-colors font-medium hover:cursor-pointer disabled:text-gray-400 dark:disabled:text-gray-500 disabled:hover:text-gray-400 dark:disabled:hover:text-gray-500 disabled:cursor-default"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg transition-colors font-medium hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h1>
              <button
                disabled={!isVerified}
                onClick={handleEditName}
                className="text-blue-900 dark:text-blue-200 hover:text-blue-400 rounded-lg transition-colors font-medium hover:cursor-pointer disabled:text-gray-400 dark:disabled:text-gray-500 disabled:hover:text-gray-400 dark:disabled:hover:text-gray-500 disabled:cursor-default"
              >
                Edit Name
              </button>
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-400 mt-2">{user.email}</p>
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
          onClick={handleChangePassword}
          disabled={!isVerified || isEditingName}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium hover:cursor-pointer disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:hover:bg-gray-400 dark:disabled:hover:bg-gray-600 disabled:cursor-default"
        >
          Change Password
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
