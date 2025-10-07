import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '@/components/auth-layout';
import Input from '@/components/form/input';
import { signupSchema, type SignupForm } from './validation';

const Signup = () => {
  const navigate = useNavigate();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupForm) => {
    // Handle signup logic here
    console.log('Signup submitted:', data);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign up to get started with your account</p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Input label="Full Name" name="name" type="text" placeholder="Enter your full name" />
          <Input label="Email Address" name="email" type="email" placeholder="Enter your email" />
          <Input label="Password" name="password" type="password" placeholder="Create a password" />
          <Input label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password" />

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-default"
            >
              Sign Up
            </button>
          </div>

          <div className="pt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default Signup;
