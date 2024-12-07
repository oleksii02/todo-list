import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '@/entities/register';

export const register = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>('register/registerUser', async ({ email, password }) => {
  return await registerUser(email, password);
});
