import React from 'react';
import { Order } from '../../types';
import { formatCurrency, formatDate } from '../../lib/utils';
import Link from 'next/link';
import { Badge } from '../ui/Badge';
import { tOrderStatus } from '../../lib/i18n';

export const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  if (orders.length === 0) return <div>Nenhum pedido encontrado</div>;
  return (
    <table className='w-full table-auto bg-white dark:bg-slate-800 border-collapse'>
      <thead>
        <tr className='text-left'>
          <th className='p-2 dark:text-slate-200'>ID</th>
          <th className='p-2 dark:text-slate-200'>Usuário</th>
          <th className='p-2 dark:text-slate-200'>Status</th>
          <th className='p-2 dark:text-slate-200'>Valor</th>
          <th className='p-2 dark:text-slate-200'>Data</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr
            key={o.id}
            className='border-t border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
          >
            <td className='p-2'>
              <Link
                href={`/orders/${o.id}`}
                className='underline text-blue-600 dark:text-blue-300'
              >
                {o.id}
              </Link>
            </td>
            <td className='p-2'>{o.userId}</td>
            <td className='p-2'>
              <Badge
                variant={
                  o.status === 'completed'
                    ? 'success'
                    : o.status === 'pending'
                      ? 'warning'
                      : 'default'
                }
              >
                {tOrderStatus(o.status)}
              </Badge>
            </td>
            <td className='p-2'>{formatCurrency(o.total)}</td>
            <td className='p-2'>{formatDate(o.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
