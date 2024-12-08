import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getLoading = (state: RootState) => state.auth.isLoading