import React, { useEffect, useRef, useState } from 'react';

type CursorType = 'default' | 'pointer' | 'text';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isHidden, setIsHidden] = useState(false);
  const [isActive, setIsActive] = useState(false); // Click state

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Direct transform for performance
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 1. Native Handoff: If in a Dark Zone, hide custom cursor and let CSS cursor:auto take over.
      const darkZone = target.closest('[data-cursor-zone="dark"]');
      if (darkZone) {
        setIsHidden(true);
        return;
      }
      setIsHidden(false);

      // 2. Shape Detection: Check tags since CSS cursor is hidden
      const tagName = target.tagName;
      const role = target.getAttribute('role');
      const isInteractive = 
        tagName === 'BUTTON' || 
        tagName === 'A' || 
        role === 'button' ||
        target.closest('a') || 
        target.closest('button');

      const isText = 
        tagName === 'INPUT' || 
        tagName === 'TEXTAREA';

      if (isInteractive) {
        setCursorType('pointer');
      } else if (isText) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    // Hide when leaving window (or entering iframe context)
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver); // Use bubble to catch elements
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-150 ease-out ${isHidden ? 'opacity-0' : 'opacity-100'}`}
      style={{ 
        willChange: 'transform',
      }}
    >
      <div className={`relative transition-transform duration-100 ease-out ${isActive ? 'scale-90' : 'scale-100'}`}>
        
        {/* DEFAULT: Arrow */}
        {cursorType === 'default' && (
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
             <path d="M5.5 2L18.5 14H10.5L14.5 22L11.5 23.5L7.5 15.5L2.5 20.5V2Z" fill="#1F1F1F" stroke="#F8FDFF" strokeWidth="1.5"/>
           </svg>
        )}

        {/* POINTER: Hand */}
        {cursorType === 'pointer' && (
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm -translate-x-2 -translate-y-1">
             <path fillRule="evenodd" clipRule="evenodd" d="M10.85 2.5C9.69 2.5 8.75 3.44 8.75 4.6V13L5.44 12.45C4.85 12.35 4.26 12.54 3.87 12.95L3.08 13.76L9.09 20.82C9.72 21.57 10.64 22 11.61 22H18.25C19.77 22 21 20.77 21 19.25V12.3C21 11.14 20.06 10.2 18.9 10.2H17.85V4.6C17.85 3.44 16.91 2.5 15.75 2.5H10.85Z" fill="#1F1F1F"/>
             <path d="M10.85 2.5C9.69 2.5 8.75 3.44 8.75 4.6V13L5.44 12.45C4.85 12.35 4.26 12.54 3.87 12.95L3.08 13.76L9.09 20.82C9.72 21.57 10.64 22 11.61 22H18.25C19.77 22 21 20.77 21 19.25V12.3C21 11.14 20.06 10.2 18.9 10.2H17.85V4.6C17.85 3.44 16.91 2.5 15.75 2.5H10.85Z" stroke="#F8FDFF" strokeWidth="1.5" strokeLinejoin="round"/>
           </svg>
        )}

        {/* TEXT: I-Beam */}
        {cursorType === 'text' && (
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-translate-x-1/2 -translate-y-1/2">
             <path d="M12 4V20" stroke="#1F1F1F" strokeWidth="2"/>
             <path d="M8 4H16" stroke="#1F1F1F" strokeWidth="2"/>
             <path d="M8 20H16" stroke="#1F1F1F" strokeWidth="2"/>
             <path d="M12 4V20" stroke="#F8FDFF" strokeWidth="1" strokeOpacity="0.8" style={{ mixBlendMode: 'difference' }}/> 
           </svg>
        )}
      </div>
    </div>
  );
};
