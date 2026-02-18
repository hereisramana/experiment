import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // 'light' means cursor is black (for light bg), 'dark' means cursor is white
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Direct transform for performance
        // We do not center the cursor; the top-left of the SVG should be at the pointer coordinate
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are inside a dark zone
      const darkZone = target.closest('[data-cursor-zone="dark"]');
      setTheme(darkZone ? 'dark' : 'light');
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver); // Use mouseover bubble to detect zone changes
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none transition-none"
      style={{ 
        willChange: 'transform',
      }}
    >
      {/* Standard Pointer SVG */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-200 ease-soft"
      >
        <path 
          d="M5.5 2L18.5 14H10.5L14.5 22L11.5 23.5L7.5 15.5L2.5 20.5V2Z" 
          fill={theme === 'dark' ? '#FFFFFF' : '#1F1F1F'} 
          stroke={theme === 'dark' ? '#1F1F1F' : '#FFFFFF'} 
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
