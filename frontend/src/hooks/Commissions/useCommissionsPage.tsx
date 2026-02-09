import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';

export const useCommissionsPage = () => {
  const {
    data: commissions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['commissions'],
    queryFn: () => api.getCommissions(),
    retry: 2,
  });
  const [status, setStatus] = useState('all');

  const filtered = useMemo(
    () =>
      (commissions || []).filter((c) =>
        status === 'all' ? true : c.status === status,
      ),
    [commissions, status],
  );

  const totals = useMemo(() => {
    const paid = (commissions || [])
      .filter((c) => c.status === 'paid')
      .reduce((s, c) => s + c.amount, 0);
    const pending = (commissions || [])
      .filter((c) => c.status === 'pending')
      .reduce((s, c) => s + c.amount, 0);
    const total = (commissions || []).reduce((s, c) => s + c.amount, 0);
    return { paid, pending, total };
  }, [commissions]);

  const retry = () => refetch();

  return {
    filtered,
    status,
    setStatus,
    totals,
    loading: isLoading,
    error: (error as any)?.message || undefined,
    retry,
  } as const;
};

export default useCommissionsPage;
