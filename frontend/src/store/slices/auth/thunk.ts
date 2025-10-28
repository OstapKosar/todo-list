import { createAsyncThunk } from '@reduxjs/toolkit';

import { makeRequest } from '@/utils/api/make-request';
import { clearUser, setUser } from '../user/slice';
import { setIsAuthenticated } from './slice';
import { extractErrorMessage } from '@/utils/errors';

export const getMe = createAsyncThunk('/auth/getMe', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await makeRequest('/auth/me', 'GET');
    const user = response.data.user;

    dispatch(setIsAuthenticated(true));
    dispatch(setUser(user));

    return user;
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e));
  }
});

export const logout = createAsyncThunk('/auth/logout', async (_, { rejectWithValue, dispatch }) => {
  try {
    await makeRequest('/auth/logout', 'POST');

    dispatch(setIsAuthenticated(false));
    dispatch(clearUser());

    return { message: 'Logged out successfully' };
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e));
  }
});
