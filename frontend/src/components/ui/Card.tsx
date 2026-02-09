import React from 'react';

export const Card: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-sm p-4 ${
        className
      }`}
    >
      {children}
    </div>
  );
};
