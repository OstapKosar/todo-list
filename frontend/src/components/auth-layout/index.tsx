import AuthHeader from '../header/auth-header';
import { Outlet } from 'react-router-dom';
import Footer from '../footer';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
