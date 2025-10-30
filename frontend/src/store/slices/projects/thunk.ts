import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '@/utils/api/make-request';
import { extractErrorMessage } from '@/utils/errors';

export const getAllProjects = createAsyncThunk('/projects/getProjects', async (_, { rejectWithValue }) => {
  try {
    const response = await makeRequest('/projects', 'GET');
    return response.data;
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e));
  }
});

export const getProject = createAsyncThunk('/projects/getProject', async (projectId: string, { rejectWithValue }) => {
  try {
    const response = await makeRequest(`/projects/${projectId}`, 'GET');
    return response.data;
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e));
  }
});
