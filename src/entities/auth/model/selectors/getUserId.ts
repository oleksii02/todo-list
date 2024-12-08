import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getUserId = (state: RootState) => state.auth.userId;
