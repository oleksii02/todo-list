'use client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import useValidateInput from '@/shared/lib/hooks/useValidateInput';
import { editTaskThunk, fetchTasks, Task } from '@/entities/contents';
import { ButtonClose } from '@/shared/ui/ButtonClose/ui/ButtonClose';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const EditTaskModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  if (task === null) return;
  const modalRoot = document.getElementById('modal-root');
  if (!isOpen || !modalRoot) return null;

  const dispatch = useAppDispatch();
  const { userId, isAuthenticated } = useAppSelector((state) => state.auth);
  const [name, setName] = useState(task.taskName);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState('');

  const HandleEditTask = async () => {
    const inputError = useValidateInput(name, '', '');
    const inputError2 = useValidateInput(description, '', '');

    if (
      inputError ||
      inputError2 ||
      name === task.taskName ||
      description === task.description
    ) {
      if (inputError) setError(inputError);
      if (inputError2) setError(inputError2);
      if (name === task.taskName) setError('You have to change something!');
      if (description === task.description)
        setError('You have to change something!');
    } else {
      try {
        await dispatch(
          editTaskThunk({
            userId,
            taskId: task.taskId,
            data: {
              taskName: name,
              description: description,
              timeCreation: task.timeCreation,
              status: task.status,
            },
          })
        );
        await dispatch(fetchTasks(userId));
        onClose();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative mx-auto flex min-h-[250px] w-2/3 max-w-xl flex-col items-center justify-center rounded-md border-2 border-primary bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-4 text-2xl font-medium">Edit Task</h1>

        <ButtonClose onPress={onClose} />
        {isAuthenticated ? (
          <>
            <div className="mb-4 w-4/5">
              <Input
                type="text"
                label="Task"
                color={error ? 'danger' : 'primary'}
                variant="bordered"
                value={name}
                isInvalid={!!error}
                errorMessage={error}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered input-primary mb-4 w-full"
              />
              <Textarea
                disableAnimation
                disableAutosize
                color={error ? 'danger' : 'primary'}
                variant="bordered"
                classNames={{
                  input: 'resize-y min-h-[40px]',
                }}
                label="Description"
                isClearable
                isInvalid={!!error}
                errorMessage={error}
                value={description}
                onClear={() => setDescription('')}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex w-4/5 justify-end">
              <Button color="primary" onClick={HandleEditTask}>
                Edit Task
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>,
    modalRoot
  );
};