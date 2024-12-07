import { createSlice } from '@reduxjs/toolkit';
import { AuthState, login } from '@/entities/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  userId: '',
  errorMessage: undefined,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    returnError: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      .addCase(login.fulfilled, (state: AuthState, action) => {
        state.isAuthenticated = true;
        state.userId = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state: AuthState) => {
        state.errorMessage = 'Invalid Email or Password!!!';
        state.isLoading = false;
      });
  },
});

export const { returnError } = authSlice.actions;

export const authReducer = authSlice.reducer;
