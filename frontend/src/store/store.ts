import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme/slice';
import projectsReducer from './slices/projects/slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
