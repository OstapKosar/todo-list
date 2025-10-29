import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme/slice';
import projectsReducer from './slices/projects/slice';
import modalReducer from './slices/modal/slice';
import authReducer from './slices/auth/slice';
import userReducer from './slices/user/slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectsReducer,
    modal: modalReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
