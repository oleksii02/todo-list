'use client';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import TaskList from '@/shared/ui/TaskList/ui/TaskList';
import { TaskSkeleton } from '@/shared/ui/TaskSkeleton';
import { NewTask } from '@/shared/ui/NewTask';

export const Content = () => {
  const { taskList, isLoadingTasks } = useAppSelector(
    (state) => state.contents
  );
  return (
    <>
      <div className="my-5 flex flex-col gap-4 text-center">
        <NewTask />
      </div>
      {taskList && !isLoadingTasks ? <TaskList /> : <TaskSkeleton />}
    </>
  );
};
