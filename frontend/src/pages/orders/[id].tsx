import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';
import { useOrderEditor } from '../../hooks/Order/useOrderEditor';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { toastSuccess, toastError } from '../../function/notifications';
import { Button } from '../../components/ui/Button';
import { Save, ArrowLeft } from 'lucide-react';
import { tOrderStatus } from '../../lib/i18n';

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { order, user, total, loading, error, status, setStatus, handleSave } =
    useOrderEditor(id);

  if (loading) return <Layout title='Pedido'>Carregando...</Layout>;
  if (error)
    return (
      <Layout title='Pedido'>
        <div className='text-red-600'>{error}</div>
      </Layout>
    );
  if (!order)
    return (
      <Layout title='Pedido'>
        <div>Nenhum pedido encontrado</div>
      </Layout>
    );

  return (
    <Layout title={`Pedido ${order.id}`}>
      <Breadcrumb
        items={[
          { label: 'Início', href: '/' },
          { label: 'Pedidos', href: '/orders' },
          { label: order.id },
        ]}
      />
      <div className='bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded text-slate-900 dark:text-slate-200'>
        <div className='mb-2'>ID: {order.id}</div>
        <div className='mb-2'>
          Usuário:{' '}
          {user ? (
            <a
              className='underline text-blue-600 dark:text-blue-300'
              href={`/users/${user.id}`}
            >
              {user.name}
            </a>
          ) : (
            order.userId
          )}
        </div>
        <div className='mb-2'>Status: {tOrderStatus(order.status)}</div>
        <div className='mb-2'>Data: {formatDate(order.date)}</div>
        <h4 className='mt-4'>Itens</h4>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='dark:text-slate-200'>Nome</th>
              <th className='dark:text-slate-200'>Qtd</th>
              <th className='dark:text-slate-200'>Preço</th>
              <th className='dark:text-slate-200'>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((i) => (
              <tr
                key={i.id}
                className='border-t border-gray-200 dark:border-slate-700'
              >
                <td>{i.name}</td>
                <td>{i.quantity}</td>
                <td>{formatCurrency(i.price)}</td>
                <td>{formatCurrency(i.price * i.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-2 font-semibold'>
          Valor total: {formatCurrency(total)}
        </div>

        <div className='mt-4 flex gap-2 items-center'>
          <select
            className='border rounded px-2 py-1'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='pending'>Pendente</option>
            <option value='processing'>Em processamento</option>
            <option value='completed'>Concluído</option>
            <option value='cancelled'>Cancelado</option>
          </select>
          <Button
            size='sm'
            variant='primary'
            leftIcon={<Save className='size-4' />}
            onClick={handleSave}
          >
            Salvar alterações
          </Button>
          <Button
            size='sm'
            variant='secondary'
            leftIcon={<ArrowLeft className='size-4' />}
            onClick={() => router.push('/orders')}
          >
            Voltar
          </Button>
        </div>
      </div>
    </Layout>
  );
}
