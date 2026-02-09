import { useState } from 'react';
import { Role, User } from '../../types';
import { validateEmail } from '../../lib/utils';

export const useUserForm = (initial: User) => {
  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [role, setRole] = useState<Role>(initial.role);
  const [country, setCountry] = useState(initial.country);
  const [status, setStatus] = useState(initial.status);
  const [error, setError] = useState<string | null>(null);

  const validate = (): boolean => {
    if (!name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!validateEmail(email)) {
      setError('Email inválido');
      return false;
    }
    setError(null);
    return true;
  };

  const getChanges = (): Partial<User> => ({
    name,
    email,
    role,
    country,
    status,
  });

  const handleSave = (onSave: (u: Partial<User>) => void) => {
    if (!validate()) return;
    onSave(getChanges());
  };

  return {
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
  } as const;
};

export default useUserForm;
