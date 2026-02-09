import React from 'react';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';

export const UserFilters: React.FC<{
  status: string;
  role: string;
  q: string;
  onStatus: (v: string) => void;
  onRole: (v: string) => void;
  onQuery: (v: string) => void;
}> = ({ status, role, q, onStatus, onRole, onQuery }) => {
  return (
    <div className='flex gap-2 items-center mb-4'>
      <Select value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value='all'>Todos</option>
        <option value='active'>Ativo</option>
        <option value='inactive'>Inativo</option>
      </Select>
      <Select value={role} onChange={(e) => onRole(e.target.value)}>
        <option value='all'>Todos</option>
        <option value='admin'>Admin</option>
        <option value='seller'>Seller</option>
        <option value='customer'>Customer</option>
      </Select>
      <Input
        placeholder='Buscar por nome ou email'
        value={q}
        onChange={(e) => onQuery(e.target.value)}
      />
    </div>
  );
};
