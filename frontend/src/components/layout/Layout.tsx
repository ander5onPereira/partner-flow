import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout: React.FC<React.PropsWithChildren<{ title?: string }>> = ({
  children,
  title,
}) => {
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-slate-200'>
      <Sidebar />
      <div className='ml-56'>
        <Header title={title} />
        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
};
