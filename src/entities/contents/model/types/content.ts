export type Task = {
  Task: string;
  Description: string;
  TimeStamp: number;
  Done: boolean;
};

export interface contentsState {
  taskList: Task[];
  errorMessage: string | undefined;
  isLoading: boolean;
  isLoadingTasks: boolean;
}
