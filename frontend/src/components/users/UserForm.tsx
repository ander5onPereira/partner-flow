import React from 'react';
import { User } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Save, X } from 'lucide-react';
import { useUserForm } from '../../hooks/User/useUserForm';

export const UserForm: React.FC<{
  user: User;
  onCancel: () => void;
  onSave: (u: Partial<User>) => void;
}> = ({ user, onCancel, onSave }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    role,
    setRole,
    country,
    setCountry,
    status,
    setStatus,
    error,
    handleSave,
  } = useUserForm(user);

  return (
    <div className='space-y-2'>
      {error && <div className='text-red-600'>{error}</div>}
      <div>
        <label className='block text-sm'>Nome</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className='block text-sm'>Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='flex gap-2'>
        <div>
          <label className='block text-sm'>Role</label>
          <Select value={role} onChange={(e) => setRole(e.target.value as any)}>
            <option value='admin'>Admin</option>
            <option value='seller'>Seller</option>
            <option value='customer'>Customer</option>
          </Select>
        </div>
        <div>
          <label className='block text-sm'>País</label>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <Button
          size='sm'
          variant='primary'
          leftIcon={<Save className='size-4' />}
          onClick={() => handleSave(onSave)}
        >
          Salvar
        </Button>
        <Button
          size='sm'
          variant='secondary'
          leftIcon={<X className='size-4' />}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};
