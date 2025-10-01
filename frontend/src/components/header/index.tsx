import { FiMoon, FiSun } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { setTheme } from '../../store/slices/theme/slice';

const MainNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleChangeTheme = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
      >
        Todo App
      </Link>
      <div className="flex items-center gap-4">
        <button
          onClick={handleChangeTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-600 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
        >
          Join Us!
        </button>
      </div>
    </header>
  );
};

export default MainNavigation;
