import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const GlobalLoader = () => {
  const isLoading = useSelector((state: RootState) => state.globalLoading.isLoading);
  const theme = useSelector((state: RootState) => state.theme.theme);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
      <div className="text-center">
        <img src={`/logo-for-${theme}.svg`} alt="Loading" className="w-24 h-24 animate-pulse" />
      </div>
    </div>
  );
};

export default GlobalLoader;
