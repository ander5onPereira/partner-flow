import React from 'react';
import { Commission } from '../../types';
import { formatCurrency, formatDate } from '../../lib/utils';
import Link from 'next/link';
import { Badge } from '../ui/Badge';
import { tCommissionStatus } from '../../lib/i18n';

export const CommissionTable: React.FC<{ items: Commission[] }> = ({
  items,
}) => {
  if (items.length === 0) return <div>Nenhuma comissão encontrada</div>;
  return (
    <table className='w-full table-auto bg-white dark:bg-slate-800 border-collapse'>
      <thead>
        <tr className='text-left'>
          <th className='p-2 dark:text-slate-200'>Usuário</th>
          <th className='p-2 dark:text-slate-200'>Pedido</th>
          <th className='p-2 dark:text-slate-200'>Valor</th>
          <th className='p-2 dark:text-slate-200'>Status</th>
          <th className='p-2 dark:text-slate-200'>Data</th>
        </tr>
      </thead>
      <tbody>
        {items.map((c) => (
          <tr
            key={c.id}
            className='border-t border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
          >
            <td className='p-2'>
              <Link
                href={`/users/${c.userId}`}
                className='underline text-blue-600 dark:text-blue-300'
              >
                {c.userId}
              </Link>
            </td>
            <td className='p-2'>
              <Link
                href={`/orders/${c.orderId}`}
                className='underline text-blue-600 dark:text-blue-300'
              >
                {c.orderId}
              </Link>
            </td>
            <td className='p-2'>{formatCurrency(c.amount)}</td>
            <td className='p-2'>
              <Badge variant={c.status === 'paid' ? 'success' : 'warning'}>
                {tCommissionStatus(c.status)}
              </Badge>
            </td>
            <td className='p-2'>{formatDate(c.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
