import { ModalRegister } from '@/shared/ui/Modal/register';
import { ModalLogin } from '@/shared/ui/Modal/login';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { getAuthenticatedStatus } from '@/entities/auth/model/selectors/getAuthenticatedStatus';
import { UserIcon } from '@/shared/ui/Icon';

export const Header = () => {
  const isAuthenticated = useAppSelector(getAuthenticatedStatus);

  return (
    <main className="mx-auto mt-4 flex w-full items-center justify-between rounded-md bg-primary px-6 py-3 shadow-custom">
      <h1 className="select-none text-2xl font-bold text-white">Todo-List</h1>
      {isAuthenticated ? (
        <div
          className={
            'flex h-9 w-9 items-center justify-center rounded-full border-2 border-white'
          }
        >
          <UserIcon color={'#fff'} width={24} height={24} />
        </div>
      ) : (
        <ul className="ml-auto flex gap-3">
          <li>
            <ModalLogin />
          </li>
          <li>
            <ModalRegister />
          </li>
        </ul>
      )}
    </main>
  );
};
