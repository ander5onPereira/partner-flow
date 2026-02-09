import React from 'react';
import Link from 'next/link';

export type Crumb = { label: string; href?: string };

export const Breadcrumb: React.FC<{ items: Crumb[] }> = ({ items }) => {
  return (
    <nav className='text-sm text-gray-600 mb-4' aria-label='breadcrumb'>
      <ol className='flex items-center gap-2'>
        {items.map((it, idx) => (
          <li key={idx} className='flex items-center gap-2'>
            {it.href ? (
              <Link href={it.href} className='hover:underline text-gray-600'>
                {it.label}
              </Link>
            ) : (
              <span className='text-gray-700 font-medium'>{it.label}</span>
            )}
            {idx < items.length - 1 && <span className='text-gray-400'>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
