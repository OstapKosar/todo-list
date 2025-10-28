import { FiGrid, FiMoon, FiSun } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { setTheme } from '../../store/slices/theme/slice';
import UserMenuDropdown from '../user/menu-dropdown';
import UserInfoModal from '../user/info-modal';
import ChangePasswordModal from '../user/change-password-modal';
import HeaderLogo from '../logo/header-logo';
import { toast } from 'react-toastify';

const MainNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { user, loading } = useSelector((state: RootState) => state.user);
  const isNotVerified = user?.status !== 'VERIFIED';

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  const handleDashboardClick = () => {
    if (isNotVerified) {
      toast.error('Verify your email to access the dashboard.');
      navigate('/verify-email');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  if (loading) return null;

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-8 flex justify-between items-center">
        <HeaderLogo />
        <div className="flex items-center gap-4">
          <button
            onClick={handleDashboardClick}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600 transition-colors"
            aria-label="Go to dashboard"
          >
            <FiGrid size={20} />
          </button>
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          {user ? (
            <UserMenuDropdown />
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Join Us!
            </button>
          )}
        </div>
      </header>
      {user && <UserInfoModal user={user} />}
      <ChangePasswordModal />
    </>
  );
};

export default MainNavigation;
