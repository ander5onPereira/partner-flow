import React from 'react';

type Size = 'sm' | 'md';
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantMap: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white text-gray-800 border hover:bg-gray-50',
  ghost: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export const Button: React.FC<Props> = ({
  children,
  size = 'md',
  variant = 'primary',
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}) => {
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-sm' : 'px-3 py-2';
  const variantClass = variantMap[variant] || variantMap.primary;
  return (
    <button
      {...rest}
      className={`inline-flex items-center gap-2 rounded ${variantClass} ${sizeClass} ${className}`}
    >
      {leftIcon && <span className='inline-flex'>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className='inline-flex'>{rightIcon}</span>}
    </button>
  );
};
