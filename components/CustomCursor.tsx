import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse)
    // This prevents the cursor from appearing on touch devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Use translate3d for hardware acceleration
        // Combine with translate(-50%, -50%) to center the cursor on the pointer
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect if we are hovering over an interactive element
      const interactive = target.closest('button, a, input, textarea, [role="button"], .cursor-pointer');
      setIsHovering(!!interactive);
    };

    // Handle cursor visibility when leaving/entering the window
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
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
      className={`
        fixed top-0 left-0 z-[9999] pointer-events-none 
        bg-white rounded-full mix-blend-difference
        transition-[width,height,opacity] duration-200 ease-soft
        ${isHovering ? 'w-8 h-8' : 'w-3 h-3'}
      `}
      style={{ 
        willChange: 'transform',
        // Ensure the cursor is visually centered
        marginTop: 0,
        marginLeft: 0
      }}
    />
  );
};