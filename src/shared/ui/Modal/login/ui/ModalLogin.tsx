'use client';
import React, { FC, useLayoutEffect } from 'react';
import { useState } from 'react';
import { fetchTasks } from '@/entities/contents';
import { useAppDispatch } from '@/shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { login, returnError } from '@/entities/auth';
import useValidateInput from '@/shared/lib/hooks/useValidateInput';
import { ButtonClose } from '@/shared/ui/ButtonClose/ui/ButtonClose';
import {Button, Input, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { getUserId } from '@/entities/auth/model/selectors/getUserId';
import { getAuthenticatedStatus } from '@/entities/auth/model/selectors/getAuthenticatedStatus';
import { getLoading } from '@/entities/auth/model/selectors/getLoading';
import { getErrorMessage } from '@/entities/auth/model/selectors/getErrorMessage';
export const ModalLogin: FC = () => {
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  // const userId = useAppSelector(getUserId)
  // const isAuthenticated = useAppSelector(getAuthenticatedStatus)
  // const isLoading = useAppSelector(getLoading)
  // const errorMessage = useAppSelector(getErrorMessage)
  const { isAuthenticated, isLoading, userId, errorMessage } = useAppSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    console.log('useLayoutEffect', userId, 'userId')
    dispatch(fetchTasks(userId));
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, isOpen, dispatch]);

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

  return (
    <>
      <Button
        className="border border-white font-medium"
        color="primary"
        onPress={onOpen}
      >
        Log in
      </Button>
      <Modal
        isOpen={isOpen} onOpenChange={onOpenChange}
        className="z-11 relative mx-auto flex w-11/12 max-w-xl flex-col items-center rounded-lg bg-white p-4"
      >
        <ModalContent>
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
        </ModalContent>
      </Modal>
    </>
  );
};
