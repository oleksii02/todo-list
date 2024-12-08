import { createSlice } from '@reduxjs/toolkit';
import { register, registerState } from '@/entities/register';

const initialState: registerState = {
  userId: '',
  errorRegister: undefined,
  isLoadingRegister: false,
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
        state.isLoadingRegister = true;
        state.errorRegister = undefined;
      })
      .addCase(register.fulfilled, (state: registerState, action) => {
        state.userId = action.payload;
        state.isLoadingRegister = false;
      })
      .addCase(register.rejected, (state: registerState, action) => {
        state.errorRegister = action.error.message;
        state.isLoadingRegister = false;
      });
  },
});

export const { returnError } = registerSlice.actions;

export const registerReducer = registerSlice.reducer;
