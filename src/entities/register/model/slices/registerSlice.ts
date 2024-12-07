import { createSlice } from '@reduxjs/toolkit';
import { register, registerState } from '@/entities/register';

const initialState: registerState = {
  userId: null,
  errorReg: undefined,
  isLoading: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    returnError: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: registerState) => {
        state.isLoading = true;
        state.errorReg = undefined;
      })
      .addCase(register.fulfilled, (state: registerState, action) => {
        state.userId = action.payload;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state: registerState, action) => {
        state.errorReg = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { returnError } = registerSlice.actions;

export const registerReducer = registerSlice.reducer;
