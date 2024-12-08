import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getLoadingRegister = (state: RootState) => state.register.isLoadingRegister