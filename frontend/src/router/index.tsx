import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/sign-up';
import MainPage from '@/index';
import Layout from '@/components/layout';
import AuthLayout from '@/components/auth-layout';
import DashboardPage from '@/pages/dashboard';
import ProjectDetailsPage from '@/pages/project';
import ProtectedRoute from '@/components/protected';
import AuthHandler from '@/components/auth-handler';
import VerifyEmailPage from '@/pages/verify-email';
import ForgotPasswordPage from '@/pages/forgot-password';
import { routes } from '@/constants/routes';
import VerifyOtpPage from '@/pages/forgot-password/verify-otp';
import NewPasswordPage from '@/pages/forgot-password/new-password';

const router = createBrowserRouter([
  {
    element: (
      <>
        <AuthHandler />
        <Layout />
      </>
    ),
    children: [
      {
        path: routes.main,
        element: (
          <ProtectedRoute optional>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.dashboard,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.dashboardProjects,
        element: (
          <ProtectedRoute>
            <ProjectDetailsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: routes.signUp,
        element: <SignupPage />,
      },
      {
        path: routes.verifyEmail,
        element: (
          <ProtectedRoute optional>
            <VerifyEmailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.forgotPassword,
        element: <ForgotPasswordPage />,
      },
      {
        path: routes.verifyOtp,
        element: <VerifyOtpPage />,
      },
      {
        path: routes.newPassword,
        element: <NewPasswordPage />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
