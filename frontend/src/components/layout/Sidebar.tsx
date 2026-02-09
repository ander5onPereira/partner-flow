import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { Home, Users, ShoppingCart, DollarSign } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { pathname } = useRouter();

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  };

  const Item: React.FC<{ href: string; label: string; Icon: any }> = ({
    href,
    label,
    Icon,
  }) => {
    const active = isActive(href);
    const base = 'flex items-center gap-2 px-2 py-2 rounded';
    const activeClass = active
      ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900 dark:text-blue-300'
      : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-slate-700 dark:text-slate-200';
    const iconClass = active
      ? 'h-5 w-5 text-blue-700 dark:text-blue-300'
      : 'h-5 w-5 text-gray-600 dark:text-slate-400';

    return (
      <Link
        href={href}
        className={`${base} ${activeClass}`}
        aria-current={active ? 'page' : undefined}
      >
        <Icon className={iconClass} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <aside className='w-56 h-screen border-r p-4 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 fixed'>
      <h2 className='text-lg font-bold mb-4'>Backoffice</h2>
      <nav className='flex flex-col gap-2'>
        <Item href='/' label='Dashboard' Icon={Home} />
        <Item href='/users' label='Usuários' Icon={Users} />
        <Item href='/orders' label='Pedidos' Icon={ShoppingCart} />
        <Item href='/commissions' label='Comissões' Icon={DollarSign} />
      </nav>
    </aside>
  );
};
