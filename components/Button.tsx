import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  
  // Base styles: Soft technical feel, small radius
  const baseStyles = `
    inline-flex items-center justify-center 
    font-mono text-xs uppercase tracking-wider
    border
    transition-all duration-200 ease-soft
    h-10 px-6
    rounded-[var(--radius-sm)]
    disabled:opacity-40 disabled:cursor-not-allowed
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] focus:outline-none
  `;

  // Variants: Low Eyestrain / Calm
  const variants = {
    // Primary: Dark Green -> Slightly lighter
    primary: `
      bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]
      hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]
      shadow-sm
    `,
    // Secondary: Transparent -> Soft Sage Fill
    secondary: `
      bg-transparent text-[var(--color-ink)] border-[var(--color-paper-dark)]
      hover:bg-[var(--color-paper-dim)] hover:border-[var(--color-paper-dark)]
    `,
    // Ghost: Text only -> Soft background
    ghost: `
      bg-transparent text-[var(--color-ink)] border-transparent
      hover:bg-[var(--color-paper-dim)]
    `
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="mr-3" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
};