import { createAsyncThunk } from '@reduxjs/toolkit';
import { markTaskAsDone } from '@/entities/contents';

export const markAsDone = createAsyncThunk<
  void,
  { userId: string; taskId: string }
>('cont/markAsDone', async ({ userId, taskId }) => {
  return await markTaskAsDone(userId, taskId);
});
