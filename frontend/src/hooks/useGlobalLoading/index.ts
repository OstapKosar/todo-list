import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

export const useGlobalLoading = () => {
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const allProjectsLoading = useSelector((state: RootState) => state.projects.allProjectsLoading);
  const projectLoading = useSelector((state: RootState) => state.projects.projectLoading);

  return userLoading || allProjectsLoading || projectLoading;
};
