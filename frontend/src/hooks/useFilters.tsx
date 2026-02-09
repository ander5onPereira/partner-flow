import { useState } from 'react';
import { useDebounce } from './useDebounce';

type UseFiltersOpts = {
  initialStatus?: string;
  initialRole?: string;
  debounceMs?: number;
};

export const useFilters = ({
  initialStatus = 'all',
  initialRole = 'all',
  debounceMs = 300,
}: UseFiltersOpts = {}) => {
  const [status, setStatus] = useState(initialStatus);
  const [role, setRole] = useState(initialRole);
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, debounceMs);

  return { status, setStatus, role, setRole, q, setQ, debouncedQ } as const;
};

export default useFilters;
