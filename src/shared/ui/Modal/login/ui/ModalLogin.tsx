'use client';
import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { fetchTasks } from '@/entities/contents';
import { useAppDispatch } from '@/shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { login, returnError } from '@/entities/auth';
import useValidateInput from '@/shared/lib/hooks/useValidateInput';
import { ButtonClose } from '@/shared/ui/ButtonClose/ui/ButtonClose';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalLogin: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, userId, errorMessage } = useAppSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    dispatch(fetchTasks(userId));
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose, dispatch]);

  const loginUser = async (email: string, password: string) => {
    const inputError = useValidateInput(email, 'email', '');
    const inputError2 = useValidateInput(password, '', '');

    if (inputError || inputError2) {
      if (inputError || inputError2) {
        if (inputError) setError(inputError);
        else setError(inputError2);
      }
    } else {
      try {
        setError('');
        await dispatch(login({ email, password }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const modalRoot = document.getElementById('modal-root');
  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={() => {
        dispatch(returnError());
        onClose();
      }}
    >
      <div
        className="z-11 relative mx-auto flex w-11/12 max-w-xl flex-col items-center rounded-lg bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-5 text-xl font-medium">Log in</h1>
        <ButtonClose
          onPress={() => {
            dispatch(returnError());
            onClose();
          }}
        />

        <div className="form-control mb-4 w-4/5">
          <Input
            isInvalid={!!error || !!errorMessage}
            variant="bordered"
            color={error || errorMessage ? 'danger' : 'primary'}
            label="Email"
            type="text"
            errorMessage={error || errorMessage}
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control mb-4 w-4/5">
          <Input
            isInvalid={!!error || !!errorMessage}
            variant="bordered"
            color={error || errorMessage ? 'danger' : 'primary'}
            type="password"
            label="Password"
            className="input input-bordered w-full"
            value={password}
            errorMessage={error || errorMessage}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex w-4/5 justify-end">
          <Button color="primary" onClick={() => loginUser(email, password)}>
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Sign in'
            )}
          </Button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
