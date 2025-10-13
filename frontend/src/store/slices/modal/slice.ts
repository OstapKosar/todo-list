import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ModalState } from './types';

const initialState: ModalState = {
  isOpened: false,
  modalName: '',
  payload: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ name: string; payload?: Record<string, unknown> }>) => {
      state.modalName = action.payload.name;
      if (action.payload.payload) state.payload = action.payload.payload;
      state.isOpened = true;
    },
    closeModal: (state, action: PayloadAction<{ name?: string }>) => {
      if (action.payload.name && state.modalName !== action.payload.name) {
        return state;
      }

      state.modalName = '';
      state.isOpened = false;
      state.payload = {};

      return state;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
