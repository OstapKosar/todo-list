import { Outlet } from 'react-router-dom';
import MainNavigation from '@/components/header';
import Footer from '@/components/footer';
import GlobalLoader from '@/components/global-loader';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <GlobalLoader />
      <MainNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
