import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
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
  
  // Base styles: Sharper corners, faster transitions
  const baseStyles = `
    inline-flex items-center justify-center 
    font-semibold text-[15px] leading-none tracking-tight
    rounded-lg transition-all duration-200 ease-snap
    min-h-[44px] px-6 py-3
    disabled:opacity-40 disabled:cursor-not-allowed
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2B6B7C] focus:outline-none
  `;

  // Variants: Luminous Feedback
  const variants = {
    // Primary: Solid -> Glows on hover
    primary: `
      bg-[#111] text-white 
      hover:bg-[#2B6B7C] hover:shadow-[0_0_20px_rgba(43,107,124,0.4)] hover:-translate-y-0.5
      active:translate-y-0 active:shadow-none
    `,
    // Secondary: Outline -> Fills on hover
    secondary: `
      bg-transparent text-[#111] border border-[#E5E5E5]
      hover:border-[#111] hover:bg-[#111] hover:text-white
      active:scale-[0.98]
    `,
    // Text: Pure Typography -> Glows
    text: `
      bg-transparent text-[#4A4A4A] 
      hover:text-[#111] hover:bg-black/5
    `
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
};