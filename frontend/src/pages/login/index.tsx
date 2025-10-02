import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth-layout';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../components/input';

type IFormInput = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    // Handle login logic here
    console.log('Login submitted:', data);
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Input label="Email Address" id="email" type="email" placeholder="Enter your email" />

          <Input label="Password" id="password" type="password" placeholder="Enter your password" />

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </div>

          <div className="pt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default Login;
