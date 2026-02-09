import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../../services/api';

export const useOrderDetail = (id?: string | string[] | null) => {
  const orderId = id ? String(id) : undefined;
  const queryClient = useQueryClient();

  const {
    data: order,
    isLoading: loadingOrder,
    error: orderError,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => api.getOrderById(orderId as string),
    enabled: !!orderId,
    retry: 2,
  });

  const { data: user } = useQuery({
    queryKey: ['user', order?.userId],
    queryFn: () => api.getUserById(order?.userId as string),
    enabled: !!order?.userId,
  });

  const total = useMemo(
    () => order?.items.reduce((s, i) => s + i.price * i.quantity, 0) || 0,
    [order],
  );

  const mutation = useMutation({
    mutationFn: (data: any) => api.updateOrder(orderId as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['order', orderId],
      });
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
  });

  const save = async (data: any) => {
    if (!orderId) return;
    await mutation.mutateAsync(data);
  };

  const loading = loadingOrder || mutation.isPending;
  const error = orderError as any;

  return {
    order,
    user,
    total,
    loading,
    error: error?.message || null,
    save,
  } as const;
};

export default useOrderDetail;
