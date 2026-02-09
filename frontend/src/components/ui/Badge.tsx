import React from 'react';

export const Badge: React.FC<{
  variant?: 'default' | 'success' | 'warning' | 'danger';
  children?: React.ReactNode;
}> = ({ variant = 'default', children }) => {
  const bg =
    variant === 'success'
      ? 'bg-green-100 text-green-800'
      : variant === 'warning'
        ? 'bg-yellow-100 text-yellow-800'
        : variant === 'danger'
          ? 'bg-red-100 text-red-800'
          : 'bg-gray-100 text-gray-800';
  return (
    <span className={`px-2 py-0.5 rounded text-sm ${bg}`}>{children}</span>
  );
};
