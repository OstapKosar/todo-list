import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '@/pages/login';
import Signup from '@/pages/sign-up';
import MainPage from '@/index';
import Layout from '@/components/layout';
import DashboardPage from '@/pages/dashboard';
import ProjectDetailsPage from '@/pages/project';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sign-up',
        element: <Signup />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/dashboard/projects/:id',
        element: <ProjectDetailsPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
