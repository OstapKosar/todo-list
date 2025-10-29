import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

export const useGlobalLoading = () => {
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const projectsLoading = useSelector((state: RootState) => state.projects.loading);

  const isLoading = userLoading || projectsLoading;

  return isLoading;
};
