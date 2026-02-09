import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { CommissionTable } from '../../components/commissions/CommissionTable';
import { useCommissionsPage } from '../../hooks/Commissions/useCommissionsPage';
import { formatCurrency } from '../../lib/utils';

export default function CommissionsPage() {
  const { filtered, status, setStatus, totals } = useCommissionsPage();

  return (
    <Layout title='Comissões'>
      <Breadcrumb
        items={[{ label: 'Início', href: '/' }, { label: 'Comissões' }]}
      />
      <div className='flex gap-4 mb-4'>
        <div className='p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-200'>
          Pagas: {formatCurrency(totals.paid)}
        </div>
        <div className='p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-200'>
          Pendentes: {formatCurrency(totals.pending)}
        </div>
        <div className='p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-200'>
          Total: {formatCurrency(totals.total)}
        </div>
      </div>

      <div className='mb-4'>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='border rounded px-2 py-1'
        >
          <option value='all'>Todos</option>
          <option value='paid'>Pago</option>
          <option value='pending'>Pendente</option>
        </select>
      </div>

      <CommissionTable items={filtered} />
    </Layout>
  );
}
