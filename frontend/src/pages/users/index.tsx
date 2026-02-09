import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { UserFilters } from '../../components/users/UserFilters';
import { UserTable } from '../../components/users/UserTable';
import { useUsersPage } from '../../hooks/User/useUsersPage';

export default function UsersPage() {
  const {
    filtered,
    status,
    role,
    q,
    setStatus,
    setRole,
    setQ,
    loading,
    error,
    handleToggle,
    retry,
  } = useUsersPage();

  return (
    <Layout title='Usuários'>
      <Breadcrumb
        items={[{ label: 'Início', href: '/' }, { label: 'Usuários' }]}
      />
      {loading && <div>Carregando...</div>}
      {error && (
        <div className='text-red-600'>
          {error}{' '}
          <button onClick={() => retry()} className='ml-2 underline'>
            Tentar novamente
          </button>
        </div>
      )}
      <UserFilters
        status={status}
        role={role}
        q={q}
        onStatus={setStatus}
        onRole={setRole}
        onQuery={setQ}
      />
      <UserTable users={filtered} onToggle={handleToggle} />
    </Layout>
  );
}
