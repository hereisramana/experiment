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
  
  // Base styles: Mechanical, rectangular, instant feedback
  const baseStyles = `
    inline-flex items-center justify-center 
    font-mono text-xs uppercase tracking-wider
    border border-transparent
    transition-colors duration-100 ease-switch
    h-10 px-6
    disabled:opacity-40 disabled:cursor-not-allowed
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black focus:outline-none
  `;

  // Variants: High Contrast / Inversion
  const variants = {
    // Primary: Black -> White on hover
    primary: `
      bg-[#111] text-[#FDFCF8] border-[#111]
      hover:bg-[#FDFCF8] hover:text-[#111]
    `,
    // Secondary: White -> Black on hover
    secondary: `
      bg-transparent text-[#111] border-[#E5E5E5]
      hover:border-[#111] hover:bg-[#111] hover:text-[#FDFCF8]
    `,
    // Ghost: Text only -> Underline effect or block invert
    ghost: `
      bg-transparent text-[#111]
      hover:bg-[#F4F2ED]
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