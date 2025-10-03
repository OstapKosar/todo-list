import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../pages/login';
import Signup from '../pages/sign-up';
import MainPage from '../index';
import Layout from '../components/layout';
import DashboardPage from '../pages/dashboard';

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
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
