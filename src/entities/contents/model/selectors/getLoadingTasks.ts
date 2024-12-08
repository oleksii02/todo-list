import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getLoadingTasks = (state: RootState) => state.contents.isLoadingTasks