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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!isOpen || !modalRoot) return null;

  const dispatch = useAppDispatch();
  const { userId, isAuthenticated } = useAppSelector((state) => state.auth);
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
            <div className="pb-24">
              <input
                type="text"
                placeholder="Task"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered input-primary mb-4 w-full"
              />
              <textarea
                className="textarea textarea-primary w-full"
                placeholder="Description"
                value={descr}
                onChange={(e) => setDescr(e.target.value)}
              ></textarea>
              <label className="label">
                <span className="label-text text-red-400">
                  {error && error}
                </span>
                <span className="label-text-alt"></span>
              </label>
            </div>
            <div className="modal-action absolute bottom-10 right-10">
              <button className="btn btn-primary" onClick={HandleAddTask}>
                Add Task
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-6 text-lg font-medium">
              Please log in to access our app!
            </h1>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
};
