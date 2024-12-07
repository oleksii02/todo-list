import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAddTask } from '@/entities/contents';

export const addTask = createAsyncThunk<
  boolean,
  { userId: string; name: string; descr: string },
  { rejectValue: string }
>('cont/addCont', async ({ userId, name, descr }) => {
  return await fetchAddTask(userId, name, descr);
});
