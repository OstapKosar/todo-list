import { createSlice } from '@reduxjs/toolkit';
import type { ProjectsState } from './types';

const initialState: ProjectsState = {
  projects: [],
  isCreateModalOpen: false,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },

    addTask: (state, action) => {
      const { projectId, task } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.tasks.push(task);
      }
    },
    toggleTaskCompletion: (state, action) => {
      const { projectId, taskId } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        const task = project.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
    removeTask: (state, action) => {
      const { projectId, taskId } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.tasks = project.tasks.filter((task) => task.id !== taskId);
      }
    },

    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
    },
  },
});

export const { addProject, openCreateModal, closeCreateModal } = projectsSlice.actions;
export default projectsSlice.reducer;
