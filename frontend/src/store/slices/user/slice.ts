import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from './types';
import { getMe } from '../auth/thunk';

const initialState: UserState = {
  user: null,
  error: null,
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserState['user'] }>) => {
      state.user = action.payload.user;
      state.loading = false;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.error = action.payload as string | null;
      state.user = null;
      state.loading = false;
    });
    builder.addCase(getMe.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
  },
});

export const { setUser, clearUser, updateUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
