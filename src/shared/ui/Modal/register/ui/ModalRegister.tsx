import ReactDOM from 'react-dom';
import React, { FC, useLayoutEffect, useState } from 'react';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { useAppDispatch } from '@/shared/lib/state/dispatch/useAppDispatch';
import { register, returnError } from '@/entities/register';
import { fetchTasks } from '@/entities/contents';
import useValidateInput from '@/shared/lib/hooks/useValidateInput';
import { login } from '@/entities/auth';
import { ButtonClose } from '@/shared/ui/ButtonClose/ui/ButtonClose';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { getUserId } from '@/entities/auth/model/selectors/getUserId';
import { getAuthenticatedStatus } from '@/entities/auth/model/selectors/getAuthenticatedStatus';
import { getLoadingRegister } from '@/entities/register/model/selectors/getLoadingRegister';
import { getErrorRegister } from '@/entities/register/model/selectors/getErrorRegister';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  error?: string;
  registerUser?: () => void;
  isLoading?: boolean;
}

export const ModalRegister: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const errorRegister = useAppSelector(getErrorRegister);
  const isLoadingRegister = useAppSelector(getLoadingRegister);
  const userId = useAppSelector(getUserId);
  const isAuthenticated = useAppSelector(getAuthenticatedStatus);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(fetchTasks(userId));
    if (isAuthenticated) {
      dispatch(returnError());
      onClose();
    }
  }, [isAuthenticated, onClose]);

  const registerUser = async (email: string, password: string) => {
    const inputError = useValidateInput(email, 'email', '');
    const inputError2 = useValidateInput(password, '', 'password');

    if (inputError || inputError2) {
      if (inputError || inputError2) {
        if (inputError) setError(inputError);
        else setError(inputError2);
      }
    } else {
      try {
        setError('');
        await dispatch(register({ email, password }));
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
        <h1 className="mb-5 text-xl font-medium">Sign up</h1>
        <ButtonClose
          onPress={() => {
            dispatch(returnError());
            onClose();
          }}
        />

        <div className="form-control mb-4 w-4/5">
          <Input
            isInvalid={!!error || !!errorRegister}
            variant="bordered"
            color={error || errorRegister ? 'danger' : 'primary'}
            label="Email"
            type="text"
            errorMessage={error || errorRegister}
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control mb-4 w-4/5">
          <Input
            isInvalid={!!error || !!errorRegister}
            variant="bordered"
            color={error || errorRegister ? 'danger' : 'primary'}
            type="password"
            label="Password"
            className="input input-bordered w-full"
            value={password}
            errorMessage={error || errorRegister}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex w-4/5 justify-end">
          <Button color="primary" onPress={() => registerUser(email, password)}>
            {isLoadingRegister ? (
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
