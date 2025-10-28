import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from './types';
import { getMe } from './thunk';
import { logout } from './thunk';
const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },

  // Get Me
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.error = action.payload as string | null;
      state.isAuthenticated = false;
    });
    builder.addCase(getMe.pending, (state) => {
      state.error = null;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload as string | null;
    });
    builder.addCase(logout.pending, (state) => {
      state.error = null;
    });
  },
});

export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
