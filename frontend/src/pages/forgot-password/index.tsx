import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Input from '@/components/form/input';
import { forgotPasswordSchema } from './validation';
import type { ForgotPasswordForm } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import ErrorMessage from '@/components/error-message';
import { extractErrorMessage } from '@/utils/errors';
import { makeRequest } from '@/utils/api/make-request';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await makeRequest('/auth/forgot-password', 'POST', {
        email: data.email,
      });

      if (response.status === 201) {
        toast.success('Reset code has been sent to your email!');
        navigate('/verify-otp', { state: { email: data.email } });

        return;
      }
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Forgot Password</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">Enter your email address to reset your password</p>
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4">
          <Input label="Email Address" name="email" type="email" placeholder="Enter your email address" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer focus:outline-none font-medium shadow-lg hover:shadow-xl transition-colors duration-150 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-blue-600"
          >
            {isSubmitting ? 'Sending Reset Code...' : 'Send Reset Code'}
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default ForgotPasswordPage;
