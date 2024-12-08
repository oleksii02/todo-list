'use client';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import useValidateInput from '@/shared/lib/hooks/useValidateInput';
import { addTask, fetchTasks } from '@/entities/contents';
import { Button } from '@nextui-org/button';
import { ButtonClose } from '@/shared/ui/ButtonClose/ui/ButtonClose';
import { Input, Textarea } from '@nextui-org/input';
import { getUserId } from '@/entities/auth/model/selectors/getUserId';
import { getAuthenticatedStatus } from '@/entities/auth/model/selectors/getAuthenticatedStatus';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal: FC<Props> = ({ isOpen, onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!isOpen || !modalRoot) return null;

  const dispatch = useAppDispatch();
  const userId = useAppSelector(getUserId)
  const  isAuthenticated  = useAppSelector(getAuthenticatedStatus);

  const [name, setName] = useState('');
  const [descr, setDescr] = useState('');
  const [error, setError] = useState('');

  const HandleAddTask = async () => {
    const inputError = useValidateInput(name, '', '');
    const inputError2 = useValidateInput(descr, '', '');
    if (inputError || inputError2) {
      if (inputError) setError(inputError);
      else setError(inputError2);
    } else {
      try {
        await dispatch(addTask({ userId, name, descr }));
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
        <h1 className="mb-4 text-2xl font-medium">New Task</h1>
        <ButtonClose onPress={onClose} />
        {isAuthenticated ? (
          <>
            <div className="w-4/5 mb-4">
              <Input
                type="text"
                label="Task Name"
                color="primary"
                variant="bordered"
                value={name}
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
                value={descr}
                onClear={() => setDescr('')}
                onChange={(e) => setDescr(e.target.value)}
                errorMessage={error}
              />
            </div>
            <div className="w-4/5 flex justify-end">
              <Button color="primary" onClick={HandleAddTask}>
                Add Task
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-6 text-lg font-medium">
              Kindly sign in to use our app!
            </h1>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
};
