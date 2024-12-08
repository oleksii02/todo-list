import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getErrorMessage = (state: RootState) => state.auth.errorMessage