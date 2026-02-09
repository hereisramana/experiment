import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'bottom',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Position logic
  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div 
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className={`
            absolute z-[60] px-2 py-1.5 
            bg-[var(--color-ink)] text-[var(--color-paper)] 
            text-[10px] font-mono font-medium tracking-wider uppercase 
            rounded-[2px] whitespace-nowrap pointer-events-none 
            animate-in fade-in zoom-in-95 duration-200
            shadow-lg border border-[var(--color-paper-dim)]/20
            ${positionClasses[position]}
          `}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};