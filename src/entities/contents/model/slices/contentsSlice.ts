import { createSlice } from '@reduxjs/toolkit';
import { addTask, contentsState, fetchTasks } from '@/entities/contents';

const initialState: contentsState = {
  taskList: [],
  errorMessage: undefined,
  isLoading: false,
  isLoadingTasks: false,
};

export const contentsSlice = createSlice<contentsState>({
  name: 'contents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state: contentsState) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      .addCase(addTask.fulfilled, (state: contentsState) => {
        state.isLoading = false;
      })
      .addCase(addTask.rejected, (state: contentsState, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchTasks.pending, (state: contentsState) => {
        state.isLoadingTasks = true;
        state.errorMessage = undefined;
      })
      .addCase(fetchTasks.fulfilled, (state: contentsState, action) => {
        state.isLoadingTasks = false;
        if (action.payload) {
          state.taskList = action.payload;
        }
      })
      .addCase(fetchTasks.rejected, (state: contentsState, action) => {
        state.errorMessage = action.error.message;
        state.isLoadingTasks = false;
      });
  },
});

export const contentsReducer = contentsSlice.reducer;
