'use client';
import { Header } from '@/widgets/Header';
import { Content } from '@/features/home/content';
import { NewTask } from '@/features/home/new-task';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { getAuthenticatedStatus } from '@/entities/auth/model/selectors/getAuthenticatedStatus';
import { TableDisabled } from '@/shared/ui/TableDisabled';

export const Home = () => {
  const  isAuthenticated  = useAppSelector(getAuthenticatedStatus);

  return (
    <main className="mx-auto w-full max-w-4xl pt-4">
      <div id="modal-root"></div>
      <Header />
      <NewTask />
      {isAuthenticated ? <Content /> : <TableDisabled/> }
    </main>
  );
};
