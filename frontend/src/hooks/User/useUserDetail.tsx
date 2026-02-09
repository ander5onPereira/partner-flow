import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../../services/api';

export const useUserDetail = (id?: string | string[] | null) => {
  const userId = id ? String(id) : undefined;
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: loadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUserById(userId as string),
    enabled: !!userId,
    retry: 2,
  });

  const {
    data: orders,
    isLoading: loadingOrders,
    error: ordersError,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => api.getOrders(),
    retry: 2,
  });

  const relatedOrders = useMemo(
    () => (orders || []).filter((o) => o.userId === userId),
    [orders, userId],
  );

  const mutation = useMutation({
    mutationFn: (data: any) => api.updateUser(userId as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const save = async (data: any) => {
    if (!userId) return;
    await mutation.mutateAsync(data);
  };

  const loading = loadingUser || loadingOrders || mutation.isPending;
  const error = (userError || ordersError) as any;

  return {
    user,
    relatedOrders,
    loading,
    error: error?.message || null,
    save,
  } as const;
};

export default useUserDetail;
