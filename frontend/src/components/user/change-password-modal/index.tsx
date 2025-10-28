import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiLoader } from 'react-icons/fi';

import Modal from '@/components/modal';
import Input from '@/components/form/input';
import { modals } from '@/constants/modals';
import { closeModal, openModal } from '@/store/slices/modal/slice';
import { changePasswordSchema } from './validation';
import type { ChangePasswordForm } from './types';
import { makeRequest } from '@/utils/api/make-request';
import { extractErrorMessage } from '@/utils/errors';
import type { RootState } from '@/store/store';
import { useState } from 'react';
import ErrorMessage from '@/components/error-message';

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user.user);

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '' },
  });

  if (!user) {
    return null;
  }

  const { handleSubmit } = form;

  const handleSaveChanges = async (data: ChangePasswordForm) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await makeRequest('/auth/change-password', 'POST', data);

      toast.success('Password updated successfully!');

      dispatch(closeModal({ name: modals.changePassword }));
      dispatch(openModal({ name: modals.userInfo }));
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal({ name: modals.changePassword }));
    dispatch(openModal({ name: modals.userInfo }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Change Password</h1>
        <p className="text-gray-600 dark:text-gray-400">Update your password</p>
      </div>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handleSaveChanges)} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              placeholder="Enter your current password"
            />
            <Input label="New Password" name="newPassword" type="password" placeholder="Enter your new password" />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2 hover:cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin w-4 h-4" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const ChangePasswordModal = () => {
  return (
    <Modal modalName={modals.changePassword}>
      <Content />
    </Modal>
  );
};

export default ChangePasswordModal;
