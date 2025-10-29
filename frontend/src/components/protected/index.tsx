import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { AppDispatch, RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { getMe } from '@/store/slices/auth/thunk';

const ProtectedRoute = ({ children, optional = false }: { children: ReactNode; optional?: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { user, loading: isLoading } = useSelector((state: RootState) => state.user);
  const isVerifyEmailPage = location.pathname === '/verify-email';

  useEffect(() => {
    const setup = async () => {
      if (!user && !isAuthenticated) {
        try {
          await dispatch(getMe()).unwrap();
        } catch {
          if (!optional) {
            navigate('/login');
          }
        }
      }
    };

    setup();
  }, [dispatch, user, isAuthenticated, optional]);

  useEffect(() => {
    if (!optional && !isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, optional]);

  useEffect(() => {
    if (!isLoading && user) {
      if (isVerifyEmailPage) {
        if (user.status === 'VERIFIED') navigate('/dashboard');

        return;
      }

      if (optional) return;

      if (user.status !== 'VERIFIED') navigate('/verify-email');
    }
  }, [user, isLoading, navigate, isVerifyEmailPage]);

  if (!isAuthenticated && !optional) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
