import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getAuthenticatedStatus = (state: RootState) => state.auth.isAuthenticated;
