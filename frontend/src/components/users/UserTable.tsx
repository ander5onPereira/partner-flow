import React from 'react';
import { User } from '../../types';
import Link from 'next/link';
import { Badge } from '../ui/Badge';
import { tUserStatus, tRole } from '../../lib/i18n';
import { Button } from '../ui/Button';
import { Eye } from 'lucide-react';

export const UserTable: React.FC<{
  users: User[];
  onToggle: (id: string, status: string) => void;
}> = ({ users, onToggle }) => {
  if (users.length === 0) return <div>Nenhum usuário encontrado</div>;
  return (
    <table className='w-full table-auto bg-white dark:bg-slate-800 border-collapse'>
      <thead>
        <tr className='text-left'>
          <th className='p-2 dark:text-slate-200'>Nome</th>
          <th className='p-2 dark:text-slate-200'>Email</th>
          <th className='p-2 dark:text-slate-200'>Tipo</th>
          <th className='p-2 dark:text-slate-200'>País</th>
          <th className='p-2 dark:text-slate-200'>Status</th>
          <th className='p-2 dark:text-slate-200'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr
            key={u.id}
            className='border-t border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
          >
            <td className='p-2'>{u.name}</td>
            <td className='p-2'>{u.email}</td>
            <td className='p-2'>{tRole(u.role)}</td>
            <td className='p-2'>{u.country}</td>
            <td className='p-2'>
              <Badge variant={u.status === 'active' ? 'success' : 'danger'}>
                {tUserStatus(u.status)}
              </Badge>
            </td>
            <td className='p-1 flex gap-2 justify-end'>
              <div className='flex items-center justify-center w-full'>
                <Button
                  size='sm'
                  className='w-full flex items-center justify-center'
                  variant={u.status === 'active' ? 'danger' : 'primary'}
                  onClick={() => onToggle(u.id, u.status)}
                >
                  {u.status === 'active' ? 'Desativar' : 'Ativar'}
                </Button>
              </div>
              <Link
                href={`/users/${u.id}`}
                className='p-1 border rounded flex items-center justify-center dark:border-slate-600'
                aria-label={`Ver detalhes de ${u.name}`}
              >
                <Eye className='h-4 w-4 text-gray-700 dark:text-slate-200' />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
