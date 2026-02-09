import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../../services/api';
import { useFilters } from '../useFilters';

export const useUsersPage = () => {
  const queryClient = useQueryClient();
  const { status, setStatus, role, setRole, q, setQ, debouncedQ } =
    useFilters();

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUsers(),
    retry: 2,
  });

  const mutation = useMutation({
    mutationFn: (payload: { id: string; data: any }) =>
      api.updateUser(payload.id, payload.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const filtered = useMemo(() => {
    return (users || []).filter((u) => {
      if (status !== 'all' && u.status !== status) return false;
      if (role !== 'all' && u.role !== role) return false;
      if (
        debouncedQ &&
        !`${u.name} ${u.email}`.toLowerCase().includes(debouncedQ.toLowerCase())
      )
        return false;
      return true;
    });
  }, [users, status, role, debouncedQ]);

  const handleToggle = async (id: string, current: string) => {
    await mutation.mutateAsync({
      id,
      data: { status: current === 'active' ? 'inactive' : 'active' },
    });
  };

  const retry = () => refetch();

  return {
    filtered,
    status,
    role,
    q,
    setStatus,
    setRole,
    setQ,
    loading: isLoading,
    error: (error as any)?.message || undefined,
    handleToggle,
    retry,
  } as const;
};

export default useUsersPage;
