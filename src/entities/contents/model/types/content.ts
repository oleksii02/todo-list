export type Task = {
  taskId: string;
  taskName: string;
  description: string;
  timeCreation: number;
  status: boolean;
};

export interface contentsState {
  taskList: Task[];
  errorMessage: string | undefined;
  isLoading: boolean;
  isLoadingTasks: boolean;
}
