'use client';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { getTaskList } from '@/entities/contents/model/selectors/getTaskList';
import { getLoadingTasks } from '@/entities/contents/model/selectors/getLoadingTasks';
import { TableDisabled } from '@/shared/ui/TableDisabled';
import { TaskList } from '@/shared/ui/TaskList';

export const Content = () => {
  const taskList = useAppSelector(getTaskList);
  const isLoadingTasks = useAppSelector(getLoadingTasks);
  return (
    <>
      {taskList && !isLoadingTasks   ?  <TaskList /> : <TableDisabled /> }
    </>
  );
};
