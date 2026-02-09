import React from 'react';

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (
  props,
) => {
  return <select className='border rounded px-2 py-1' {...props} />;
};
