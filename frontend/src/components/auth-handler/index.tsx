import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchPath } from 'react-router';
import { setAuthHandlers } from '@/utils/api/make-request';
import { setIsAuthenticated } from '@/store/slices/auth/slice';
import { clearUser } from '@/store/slices/user/slice';
import { store } from '@/store/store';
import { optionalAuthenticatedRoutes } from '@/constants/routes';

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setAuthHandlers({
      onLogout: () => {
        const isOptionalAuthenticatedRoute = optionalAuthenticatedRoutes.some((route) =>
          matchPath(route, window.location.pathname),
        );

        store.dispatch(setIsAuthenticated(false));
        store.dispatch(clearUser());

        if (!isOptionalAuthenticatedRoute) navigate('/login');
      },
    });
  }, [navigate]);

  return null;
};

export default AuthHandler;
