import React from 'react';
import { useStore } from '../../store/useStore';
import Switch from '../ui/Switch';

export const Header: React.FC<{ title?: string }> = ({ title = '' }) => {
  const theme = useStore((s) => s.theme);
  const toggle = useStore((s) => s.toggleTheme);

  return (
    <header className='flex items-center justify-between py-4 px-6 border-b bg-white dark:bg-slate-900 dark:border-slate-700'>
      <h1 className='text-xl font-semibold'>{title}</h1>
      <div className='flex items-center gap-3'>
        <Switch
          checked={theme === 'dark'}
          onChange={() => toggle()}
          ariaLabel='Alternar tema claro/escuro'
        />
      </div>
    </header>
  );
};
