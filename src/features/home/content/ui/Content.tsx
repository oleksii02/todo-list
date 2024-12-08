'use client';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { getTaskList } from '@/entities/contents/model/selectors/getTaskList';
import { getLoadingTasks } from '@/entities/contents/model/selectors/getLoadingTasks';
import { TableDisabled } from '@/shared/ui/TableDisabled';
import { TaskList } from '@/shared/ui/TaskList';
import { fetchTasks } from '@/entities/contents';
import { useAppDispatch } from '@/shared/lib/state/dispatch/useAppDispatch';
import { getUserId } from '@/entities/auth/model/selectors/getUserId';

export const Content = () => {
  const taskList = useAppSelector(getTaskList);
  const isLoadingTasks = useAppSelector(getLoadingTasks);

  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserId);




  return (
    <>
      {taskList && !isLoadingTasks   ?  <TaskList /> : <TableDisabled /> }
    </>
  );
};
