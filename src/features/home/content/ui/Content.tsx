'use client';
import TaskList from '@/shared/ui/TaskList/ui/TaskList';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { getAuthenticatedStatus } from '@/entities/auth/model/selectors/getAuthenticatedStatus';
import { getTaskList } from '@/entities/contents/model/selectors/getTaskList';
import { Task } from '@/entities/contents';
import { getLoadingTasks } from '@/entities/contents/model/selectors/getLoadingTasks';
import { TableDisabled } from '@/shared/ui/TableDisabled';

export const Content = () => {
  const  isAuthenticated  = useAppSelector(getAuthenticatedStatus);
  const taskList = useAppSelector(getTaskList) as Task[];
  const isLoadingTasks = useAppSelector(getLoadingTasks);

  return (
    <>
      {taskList && !isLoadingTasks && isAuthenticated ?  <TaskList /> : <TableDisabled /> }
    </>
  );
};
