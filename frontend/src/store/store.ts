import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme/slice';
import projectsReducer from './slices/projects/slice';
import modalReducer from './slices/modal/slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
