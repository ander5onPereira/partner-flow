import { useCallback, useEffect, useState } from 'react';
import { useOrderDetail } from './useOrderDetail';
import { toastSuccess, toastError } from '../../function/notifications';

export const useOrderEditor = (id?: string | string[] | null) => {
  const { order, user, total, loading, error, save } = useOrderDetail(id);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (order) setStatus(order.status);
  }, [order]);

  const handleSave = useCallback(async () => {
    if (!order) return;
    try {
      await save({ status: status as any });
      toastSuccess({ content: 'Pedido atualizado' });
    } catch (err: any) {
      toastError({ content: err?.message || 'Erro ao atualizar pedido' });
      throw err;
    }
  }, [save, status, order]);

  return {
    order,
    user,
    total,
    loading,
    error,
    status,
    setStatus,
    handleSave,
  } as const;
};

export default useOrderEditor;
