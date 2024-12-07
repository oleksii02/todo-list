import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '@/entities/auth';

export const login = createAsyncThunk<
  string,
  { email: string; password: string }
>(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    return await loginUser(email, password);
  }
);
