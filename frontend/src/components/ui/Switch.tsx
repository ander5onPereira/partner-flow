import React from 'react';
import { Sun, Moon } from 'lucide-react';

type SwitchProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel?: string;
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  ariaLabel = 'Toggle theme',
}) => {
  return (
    <button
      role='switch'
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center h-7 w-14 rounded-full p-1 transition-colors focus:outline-none focus:ring-0 focus:ring-offset-2 ${
        checked
          ? 'bg-slate-700 focus:ring-transparent'
          : 'bg-gray-200 dark:bg-gray-700 focus:ring-transparent'
      }`}
    >
      <span className={`sr-only`}>{ariaLabel}</span>
      <span
        className={`flex items-center justify-center w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
          checked ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {checked ? (
          <Moon className='w-3 h-3 text-gray-700' />
        ) : (
          <Sun className='w-3 h-3 text-yellow-500' />
        )}
      </span>
    </button>
  );
};

export default Switch;
