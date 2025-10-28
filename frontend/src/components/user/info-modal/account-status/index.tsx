import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';
import { cn } from '@/utils/tailwind';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

const AccountStatus = ({ textSize = 'lg' }: { textSize: TextSize }) => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex items-center gap-2">
      <span className={cn(`text-${textSize} font-medium text-gray-700 dark:text-gray-300`)}>Account Status:</span>
      <span
        className={cn('px-3 py-1 rounded-full text-lg font-medium', {
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': user?.status === 'VERIFIED',
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': user?.status === 'UNVERIFIED',
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': user?.status === 'PENDING',
          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200': !user?.status,
        })}
      >
        {user?.status || 'UNKNOWN'}
      </span>
    </div>
  );
};

export default AccountStatus;
