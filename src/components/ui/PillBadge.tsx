import React from 'react';

interface PillBadgeProps {
  children: React.ReactNode;
  dotColor?: 'amber' | 'green';
  className?: string;
}

export const PillBadge: React.FC<PillBadgeProps> = ({
  children,
  dotColor = 'amber',
  className = '',
}) => {
  const dotStyles = {
    amber: 'bg-amber-500',
    green: 'bg-brand-600',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-50/70 text-ink-dark border border-amber-200/60 shadow-subtle ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[dotColor]}`} />
      <span>{children}</span>
    </div>
  );
};
