import { useCallback, useState } from 'react';
import { useUserDetail } from './useUserDetail';
import { toastSuccess, toastError } from '../../function/notifications';

export const useUserEditor = (id?: string | string[] | null) => {
  const { user, relatedOrders, loading, error, save } = useUserDetail(id);
  const [editing, setEditing] = useState(false);

  const startEditing = useCallback(() => setEditing(true), []);
  const cancelEditing = useCallback(() => setEditing(false), []);

  const handleSave = useCallback(
    async (data: any) => {
      if (!user) return;
      try {
        await save(data);
        setEditing(false);
        toastSuccess({ content: 'Salvo com sucesso' });
      } catch (err: any) {
        toastError({ content: err?.message || 'Erro ao salvar' });
        throw err;
      }
    },
    [save, user],
  );

  return {
    user,
    relatedOrders,
    loading,
    error,
    editing,
    startEditing,
    cancelEditing,
    handleSave,
  } as const;
};

export default useUserEditor;
