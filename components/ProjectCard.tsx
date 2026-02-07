import React from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (id: string) => void;
  onHover: (id: string | null) => void;
  isActive?: boolean;
  onNavigate?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  onClick, 
  onHover,
  isActive = false,
  onNavigate 
}) => {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  // Inject the specific accent color as a CSS variable for the hover/active state
  const style = {
    '--hover-bg': project.accentColor || 'var(--color-paper-dark)'
  } as React.CSSProperties;

  return (
    <div 
      className={`
        group relative cursor-pointer block text-left touch-manipulation rounded-[var(--radius-md)]
        transition-all duration-300 ease-soft overflow-hidden
        ${isActive ? 'bg-[var(--hover-bg)]' : 'bg-transparent'}
      `}
      onClick={(e) => {
        e.preventDefault();
        onClick(project.id);
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      style={style}
    >
      <div className={`
          flex items-center w-full py-5 px-4 
          relative z-10
          ${!isActive && 'group-hover:bg-[var(--hover-bg)]'}
          transition-colors duration-200
      `}>
        
        {/* Col 1: ID */}
        <div className={`
           w-12 md:w-16 font-mono text-xs transition-colors
           ${isActive ? 'opacity-100 text-[var(--color-ink)]' : 'opacity-30 text-[var(--color-ink)] group-hover:opacity-100'}
        `}>
          {formattedIndex}
        </div>

        {/* Col 2: Title & Mobile Action */}
        <div className="flex-1 pr-4 md:pr-32">
          <h3 className="text-xl md:text-4xl font-medium tracking-tight text-[var(--color-ink)] transition-transform duration-300 group-hover:translate-x-2">
            {project.title}
          </h3>
          
          {/* Mobile "View Case Study" Trigger - Only visible when Active */}
          {isActive && onNavigate && (
            <div className="mt-4 animate-in slide-in-from-top-2 fade-in duration-300">
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   onNavigate(project.id);
                 }}
                 className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[var(--color-ink)] bg-white/20 hover:bg-white/30 px-4 py-3 rounded-[var(--radius-sm)] w-full md:w-auto"
               >
                 <span>View Case Study</span>
                 <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          )}
        </div>

        {/* Desktop Hover Guidance (Hidden on Mobile) */}
        <div className="absolute right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-soft hidden md:block">
           <span className="text-[10px] uppercase font-medium tracking-widest text-[var(--color-ink)] flex items-center gap-2">
             View Case Study →
           </span>
        </div>
      </div>
    </div>
  );
};