import { useState } from 'react';
import { AddTaskModal } from '@/shared/ui/Modal/add-task';
import { Button } from '@nextui-org/button';

export const NewTask = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenAddModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="my-5 flex flex-col gap-4 text-center">
      {isOpen && (
        <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      <div className="flex justify-end">
        <Button
          color="primary"
          className="rounded-md"
          onClick={handleOpenAddModal}
        >
          New Task
        </Button>
      </div>
    </div>
  );
};
