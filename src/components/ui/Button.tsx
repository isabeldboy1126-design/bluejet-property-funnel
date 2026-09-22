import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-[#0052FF] hover:bg-[#0042D0] text-white shadow-sm hover:shadow-md active:scale-[0.99] border border-[#0052FF]',
    secondary:
      'bg-surface-card hover:bg-surface-muted text-ink-dark border border-surface-border shadow-sm hover:shadow active:scale-[0.99]',
    outline:
      'bg-transparent hover:bg-blue-50 text-[#0052FF] border border-[#0052FF] active:scale-[0.99]',
    ghost:
      'bg-transparent hover:bg-surface-muted text-ink-muted hover:text-ink-dark',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full',
    md: 'text-sm px-5 py-2.5 rounded-full',
    lg: 'text-base px-8 py-3.5 rounded-full font-semibold',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
