import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props,
) => {
  return <input className='border rounded px-2 py-1' {...props} />;
};
