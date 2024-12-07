import { createAsyncThunk } from '@reduxjs/toolkit';
import { editTask, Task } from '@/entities/contents';

export const editTaskThunk = createAsyncThunk<
  void,
  {
    userId: string;
    taskId: string;
    data: Partial<Task>;
  }
>('cont/editTask', async ({ userId, taskId, data }) => {
  return await editTask(userId, taskId, data);
});
