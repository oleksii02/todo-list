'use client';
import { Header } from '@/widgets/Header';
import { useAppSelector } from '@/shared/lib/state/selector/useAppSelector';
import { Content } from '@/features/home/content';
import { Login } from '@/features/home/login';

export const Home = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <main className="mx-auto w-full max-w-4xl pt-4">
      <div id="modal-root"></div>
      <Header />
      {isAuthenticated ? <Content /> : <Login />}
    </main>
  );
};
