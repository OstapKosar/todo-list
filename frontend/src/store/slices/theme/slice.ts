import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Theme } from './types';

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark =
      savedTheme !== 'light' && (window.matchMedia('(prefers-color-scheme: dark)').matches || savedTheme === 'dark');

    document.documentElement.classList.toggle('dark', isDark);

    return isDark ? 'dark' : 'light';
  })(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;

      localStorage.setItem('theme', action.payload);
      document.documentElement.classList.toggle('dark', action.payload === 'dark');
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
