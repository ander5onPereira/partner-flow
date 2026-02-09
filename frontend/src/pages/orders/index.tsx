import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { OrderTable } from '../../components/orders/OrderTable';
import { useOrdersPage } from '../../hooks/Order/useOrdersPage';
import { formatCurrency } from '../../lib/utils';

export default function OrdersPage() {
  const {
    filtered,
    status,
    setStatus,
    sortBy,
    setSortBy,
    dir,
    toggleDir,
    total,
  } = useOrdersPage();

  return (
    <Layout title='Pedidos'>
      <Breadcrumb
        items={[{ label: 'Início', href: '/' }, { label: 'Pedidos' }]}
      />
      <div className='flex gap-2 items-center mb-4'>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='border rounded px-2 py-1'
        >
          <option value='all'>Todos</option>
          <option value='pending'>Pendente</option>
          <option value='processing'>Em processamento</option>
          <option value='completed'>Concluído</option>
          <option value='cancelled'>Cancelado</option>
        </select>
        <div className='ml-auto'>Total: {formatCurrency(total)}</div>
      </div>

      <div className='flex gap-2 items-center mb-4'>
        <button
          onClick={() => {
            setSortBy('date');
            toggleDir();
          }}
          className='px-3 py-1 border rounded'
        >
          Ordenar por data
        </button>
        <button
          onClick={() => {
            setSortBy('value');
            toggleDir();
          }}
          className='px-3 py-1 border rounded'
        >
          Ordenar por valor
        </button>
      </div>

      <OrderTable orders={filtered} />
    </Layout>
  );
}
