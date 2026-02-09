import React, { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { useStore } from '../store/useStore';
import { MetricCard } from '../components/dashboard/MetricCard';
import { formatCurrency } from '../lib/utils';

export default function DashboardPage() {
  const { users, orders, commissions, fetchAll, loading, error } = useStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 'active').length;
  const totalOrders = orders.length;
  const totalOrdersValue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const totalCommissions = commissions.reduce((s, c) => s + (c.amount || 0), 0);

  return (
    <Layout title='Dashboard'>
      {loading && <div>Carregando...</div>}
      {error && <div className='text-red-600'>{error}</div>}
      <Breadcrumb
        items={[{ label: 'Início', href: '/' }, { label: 'Dashboard' }]}
      />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <MetricCard title='Total de usuários' value={String(totalUsers)} />
        <MetricCard title='Usuários ativos' value={String(activeUsers)} />
        <MetricCard title='Total de pedidos' value={String(totalOrders)} />
        <MetricCard
          title='Valor total dos pedidos'
          value={formatCurrency(totalOrdersValue)}
        />
        <MetricCard
          title='Valor total de comissões'
          value={formatCurrency(totalCommissions)}
        />
      </div>
    </Layout>
  );
}
