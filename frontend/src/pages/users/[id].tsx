import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/Layout';
import { useUserEditor } from '../../hooks/User/useUserEditor';
import { UserForm } from '../../components/users/UserForm';
import { Card } from '../../components/ui/Card';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import Link from 'next/link';
import { toastSuccess, toastError } from '../../function/notifications';
import { Button } from '../../components/ui/Button';
import { Edit2, ArrowLeft } from 'lucide-react';
import { tUserStatus } from '../../lib/i18n';

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const {
    user,
    relatedOrders,
    loading,
    error,
    editing,
    startEditing,
    cancelEditing,
    handleSave,
  } = useUserEditor(id);

  if (loading) return <Layout title='Usuário'>Carregando...</Layout>;
  if (error)
    return (
      <Layout title='Usuário'>
        <div className='text-red-600'>{error}</div>
      </Layout>
    );
  if (!user)
    return (
      <Layout title='Usuário'>
        <div>Nenhum usuário encontrado</div>
      </Layout>
    );

  return (
    <Layout title={`Usuário: ${user.name}`}>
      <Breadcrumb
        items={[
          { label: 'Início', href: '/' },
          { label: 'Usuários', href: '/users' },
          { label: user.name },
        ]}
      />
      <Card>
        <div className='flex justify-between items-start'>
          <div>
            <div className='text-lg font-bold dark:text-slate-100'>
              {user.name}
            </div>
            <div className='text-sm text-gray-600 dark:text-slate-400'>
              {user.email}
            </div>
            <div className='text-sm dark:text-slate-200'>Role: {user.role}</div>
            <div className='text-sm dark:text-slate-200'>
              País: {user.country}
            </div>
            <div className='text-sm dark:text-slate-200'>
              Status: {tUserStatus(user.status)}
            </div>
          </div>
          <div className='flex gap-2'>
            <Button
              size='sm'
              variant='ghost'
              leftIcon={<Edit2 className='size-4' />}
              onClick={startEditing}
            >
              Editar
            </Button>
            <Button
              size='sm'
              variant='secondary'
              leftIcon={<ArrowLeft className='size-4' />}
              onClick={() => router.push('/users')}
            >
              Voltar
            </Button>
          </div>
        </div>
      </Card>

      {editing && (
        <Card className='mt-4'>
          <UserForm user={user} onCancel={cancelEditing} onSave={handleSave} />
        </Card>
      )}

      <h3 className='mt-6 mb-2 text-lg dark:text-slate-100'>
        Pedidos relacionados
      </h3>
      {relatedOrders.length === 0 ? (
        <div className='dark:text-slate-200'>Nenhum pedido</div>
      ) : (
        <ul className='space-y-2'>
          {relatedOrders.map((o) => (
            <li
              key={o.id}
              className='p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-200'
            >
              <Link
                href={`/orders/${o.id}`}
                className='underline text-blue-600 dark:text-blue-300'
              >
                {o.id} - {o.status} - {o.total}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
