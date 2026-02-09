import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { useSort } from '../useSort';
import { useFilters } from '../useFilters';
import { formatDate } from '../../lib/utils';

export const useOrdersPage = () => {
  const { status, setStatus } = useFilters({
    initialStatus: 'all',
    debounceMs: 0,
  });
  const { sortBy, setSortBy, dir, toggleDir } = useSort<'date' | 'value'>(
    'date',
  );

  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => api.getOrders(),
    retry: 2,
  });

  const filtered = useMemo(() => {
    let list = (orders || []).slice();
    if (status !== 'all') list = list.filter((o) => o.status === status);
    if (sortBy === 'date')
      list.sort((a, b) =>
        dir === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    if (sortBy === 'value')
      list.sort((a, b) =>
        dir === 'desc' ? b.total - a.total : a.total - b.total,
      );
    return list;
  }, [orders, status, sortBy, dir]);

  const total = (orders || []).reduce((s, o) => s + o.total, 0);

  const retry = () => refetch();

  return {
    filtered,
    status: status,
    setStatus,
    sortBy,
    setSortBy,
    dir,
    toggleDir,
    total,
    loading: isLoading,
    error: (error as any)?.message || undefined,
    retry,
  } as const;
};

export default useOrdersPage;
