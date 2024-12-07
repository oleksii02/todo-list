import { combineReducers } from 'redux';
import { authReducer } from '@/entities/auth';
import { registerReducer } from '@/entities/register';
import { contentsReducer } from '@/entities/contents';

export const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  contents: contentsReducer,
});
