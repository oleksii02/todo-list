import { RootState } from '@/app/providers/StoreProvider/config/store';

export const getTaskList = (state: RootState) => state.contents.taskList