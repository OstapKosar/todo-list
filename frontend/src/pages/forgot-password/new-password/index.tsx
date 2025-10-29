import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';

import PasswordInput from '@/components/form/password-input';
import ErrorMessage from '@/components/error-message';
import { extractErrorMessage } from '@/utils/errors';
import { makeRequest } from '@/utils/api/make-request';
import { newPasswordSchema } from '../validation';
import type { NewPasswordForm } from '../types';

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<NewPasswordForm>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!state?.email) {
      toast.error('No reset session found. Please start the password reset process again.');
      navigate('/forgot-password');
    }
  }, [navigate, state]);

  const onSubmit = async (data: NewPasswordForm) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await makeRequest('/auth/reset-password', 'POST', {
        password: data.password,
        email: state.email,
      });

      toast.success('Password reset successfully! You can now log in with your new password.');

      navigate('/login');
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Set New Password</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">Enter your new password below</p>
      </div>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4">
          <PasswordInput label="New Password" name="password" placeholder="Enter your new password" />
          <PasswordInput label="Confirm Password" name="confirmPassword" placeholder="Confirm your new password" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer focus:outline-none font-medium shadow-lg hover:shadow-xl transition-colors duration-150 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-blue-600"
          >
            {isSubmitting ? 'Setting Password...' : 'Set New Password'}
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default NewPasswordPage;
