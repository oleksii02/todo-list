import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';

export function UiProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <NextUIProvider className="flex flex-grow flex-col">
      {children}
    </NextUIProvider>
  );
}
