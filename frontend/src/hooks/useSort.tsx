import { useState } from 'react';

export const useSort = <T extends string>(
  initialSortBy: T,
  initialDir: 'asc' | 'desc' = 'desc',
) => {
  const [sortBy, setSortBy] = useState<T>(initialSortBy);
  const [dir, setDir] = useState<'asc' | 'desc'>(initialDir);

  const toggleDir = () => setDir((d) => (d === 'desc' ? 'asc' : 'desc'));

  return { sortBy, setSortBy, dir, setDir, toggleDir } as const;
};

export default useSort;
