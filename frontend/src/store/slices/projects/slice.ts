import { createSlice } from '@reduxjs/toolkit';
import type { ProjectsState } from './types';
import { getProject, getAllProjects } from './thunk';

const initialState: ProjectsState = {
  projects: [],
  allProjectsLoading: false,
  projectLoading: false,
  error: null,
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
          task.isCompleted = !task.isCompleted;
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
  },

  extraReducers: (builder) => {
    // Get Projects
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.allProjectsLoading = false;
      state.error = null;
    });

    builder.addCase(getAllProjects.pending, (state) => {
      state.allProjectsLoading = true;
      state.error = null;
    });

    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.error = action.payload as string | null;
      state.allProjectsLoading = false;
    });

    // Get Project
    builder.addCase(getProject.fulfilled, (state, action) => {
      const existingIdx = state.projects.findIndex((project) => project.id === action.payload.id);
      if (existingIdx !== -1) {
        state.projects[existingIdx] = action.payload;
      } else {
        state.projects.push(action.payload);
      }
      state.projectLoading = false;
      state.error = null;
    });

    builder.addCase(getProject.pending, (state) => {
      state.projectLoading = true;
      state.error = null;
    });

    builder.addCase(getProject.rejected, (state, action) => {
      state.error = action.payload as string | null;
      state.projectLoading = false;
    });
  },
});
export const { addProject, addTask, toggleTaskCompletion, removeTask, removeProject } = projectsSlice.actions;
export default projectsSlice.reducer;
