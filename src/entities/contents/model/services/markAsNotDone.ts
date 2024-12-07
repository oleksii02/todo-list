import { createAsyncThunk } from '@reduxjs/toolkit';
import { markTaskAsNotDone } from '@/entities/contents';

export const markAsNotDone = createAsyncThunk<
  void,
  { userId: string; taskId: string }
>('cont/markAsNotDone', async ({ userId, taskId }) => {
  return await markTaskAsNotDone(userId, taskId);
});
