import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTask } from '@/entities/contents';

export const deleteTaskThunk = createAsyncThunk<
  void,
  { userId: string; taskId: string }
>('cont/deleteTask', async ({ userId, taskId }) => {
  return await deleteTask(userId, taskId);
});
