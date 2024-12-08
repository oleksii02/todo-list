import { useState } from 'react';
import { ModalRegister } from '@/shared/ui/Modal/register';
import { ModalLogin } from '@/shared/ui/Modal/login';
import { Button } from '@nextui-org/button';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { getAuthenticatedStatus } from '@/entities/auth/model/selectors/getAuthenticatedStatus';
import { UserIcon } from '@/shared/ui/Icon';

export const Header = () => {
  const isAuthenticated = useAppSelector(getAuthenticatedStatus);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalReg, setShowModalReg] = useState(false);

  const handleShowModal = (modalType: string) => {
    if (modalType === 'login') {
      setShowModalLogin(true);
    } else {
      setShowModalReg(true);
    }
  };

  return (
    <main className="mx-auto mt-4 flex w-full items-center justify-between rounded-md bg-primary px-6 py-3 shadow-custom">
      <h1 className="select-none text-2xl font-bold text-white">Todo-List</h1>
      {isAuthenticated ? (
        <div
          className={
            'h-9 w-9 flex items-center justify-center rounded-full border-2 border-white'
          }
        >
          <UserIcon color={'#fff'} width={24} height={24} />
        </div>
      ) : (
        <ul className="ml-auto flex gap-3">
          <li>
            <Button
              className="border border-white font-medium"
              color="primary"
              onPress={() => handleShowModal('login')}
            >
              Log in
            </Button>
          </li>
          <li>
            <Button
              className="border border-white font-medium"
              color="primary"
              onClick={() => handleShowModal('register')}
            >
              Sign up
            </Button>
          </li>
        </ul>
      )}
      {showModalLogin && (
        <ModalLogin
          onClose={() => setShowModalLogin(false)}
          isOpen={showModalLogin}
        />
      )}
      {showModalReg && (
        <ModalRegister
          onClose={() => setShowModalReg(false)}
          isOpen={showModalReg}
        />
      )}
    </main>
  );
};
