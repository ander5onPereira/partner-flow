import React from 'react';
import { Card } from '../ui/Card';

export const MetricCard: React.FC<{
  title: string;
  value: string;
  icon?: React.ReactNode;
}> = ({ title, value, icon }) => {
  return (
    <Card className='flex items-center gap-4'>
      <div className='text-2xl'>{icon}</div>
      <div>
        <div className='text-sm text-gray-500 dark:text-slate-400'>{title}</div>
        <div className='text-xl font-semibold dark:text-slate-100'>{value}</div>
      </div>
    </Card>
  );
};
