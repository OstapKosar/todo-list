import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setGlobalLoading } from '@/store/slices/global-loading/slice';
import type { AppDispatch, RootState } from '@/store/store';

export const useGlobalLoading = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const projectsLoading = useSelector((state: RootState) => state.projects.loading);

  useEffect(() => {
    const isLoading = userLoading || projectsLoading;
    dispatch(setGlobalLoading(isLoading));
  }, [userLoading, projectsLoading, dispatch]);
};
