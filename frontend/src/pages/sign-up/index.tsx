import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Input from '@/components/form/input';
import { signupSchema } from './validation';
import type { SignupForm } from './types';
import { extractErrorMessage } from '@/utils/errors';
import ErrorMessage from '@/components/error-message';
import { makeRequest } from '@/utils/api/make-request';
import { setUser } from '@/store/slices/user/slice';
import { setIsAuthenticated } from '@/store/slices/auth/slice';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await makeRequest('/auth/sign-up', 'POST', data);
      const user = response.data.user;

      dispatch(setUser({ user }));
      dispatch(setIsAuthenticated(true));

      toast.success('User created successfully. Please check your email for verification code.');
      navigate('/verify-email');
    } catch (error) {
      setErrorMessage(extractErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Account</h1>
        <p className="text-base text-gray-600 dark:text-gray-400">Sign up to get started with your account</p>
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <Input label="Full Name" name="name" type="text" placeholder="Enter your full name" />
          <Input label="Email Address" name="email" type="email" placeholder="Enter your email" />
          <Input label="Password" name="password" type="password" placeholder="Create a password" />
          <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password" />

          <div className="flex space-x-4 mt-8">
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
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-default"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={handleLoginClick}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default SignupPage;
