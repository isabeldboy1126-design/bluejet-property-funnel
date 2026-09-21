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
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-brand-900 hover:bg-brand-950 text-white shadow-sm hover:shadow-md active:scale-[0.99] border border-brand-900',
    secondary:
      'bg-surface-card hover:bg-surface-muted text-ink-dark border border-surface-border shadow-sm hover:shadow active:scale-[0.99]',
    outline:
      'bg-transparent hover:bg-brand-50 text-brand-900 border border-brand-800 active:scale-[0.99]',
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
