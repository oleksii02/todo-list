'use client';
import { Header } from '@/widgets/Header';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { Content } from '@/features/home/content';
import { Login } from '@/features/home/login';
import { UserIcon } from '@/shared/ui/Icon';
import { getAuthenticatedStatus } from '@/entities/auth/model/selectors/getAuthenticatedStatus';
import { NewTask } from '@/shared/ui/NewTask';

export const Home = () => {
  return (
    <main className="mx-auto w-full max-w-4xl pt-4">
      <div id="modal-root"></div>
      <Header />
      <NewTask />
      <Content />
    </main>
  );
};
