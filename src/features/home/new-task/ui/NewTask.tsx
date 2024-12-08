import { AddTaskModal } from '@/shared/ui/Modal/add-task';

export const NewTask = () => {

  return (
    <div className="my-5 flex flex-col gap-4 text-center">
      <div className="flex justify-end">
        <AddTaskModal />
      </div>
    </div>
  );
};
