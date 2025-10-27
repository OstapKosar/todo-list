import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';

import Input from '@/components/form/input';
import { loginSchema } from './validation';
import type { LoginForm } from './types';
import { extractErrorMessage } from '@/utils/errors';
import { makeRequest } from '@/utils/api/make-request';
import ErrorMessage from '@/components/error-message';
import { setUser } from '@/store/slices/user/slice';
import { setIsAuthenticated } from '@/store/slices/auth/slice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await makeRequest('/auth/login', 'POST', data);
      const user = response.data.user;

      dispatch(setUser({ user }));
      dispatch(setIsAuthenticated(true));

      if (user.status === 'VERIFIED') {
        navigate('/dashboard');
      } else {
        await makeRequest('/auth/request-new-otp', 'POST', {
          email: user.email,
          type: 'VERIFICATION',
        });

        toast.info('A verification email has been sent to your email, verify your email to access the dashboard.');
        navigate('/verify-email');
      }
    } catch (error: unknown) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome Back</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">Sign in to your account</p>
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <Input label="Email Address" name="email" type="email" placeholder="Enter your email" />
          <Input label="Password" name="password" type="password" placeholder="Enter your password" />

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors"
                onClick={handleForgotPasswordClick}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleCancelClick}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none disabled:cursor-default"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={handleSignUpClick}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginPage;
