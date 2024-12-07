import { TaskSkeleton } from '@/shared/ui/TaskSkeleton';
import { NewTask } from '@/shared/ui/NewTask';

export const Login = () => {
  return (
    <>
      <div className="my-5 flex flex-col gap-4 text-center">
        <NewTask />
      </div>
      <TaskSkeleton />
    </>
  );
};
