import { Outlet, useLocation } from 'react-router-dom';
import MainNavigation from '../header';

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <MainNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-900 dark:bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 My Website</p>
      </footer>
    </div>
  );
};

export default Layout;
