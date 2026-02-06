import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (id: string) => void;
  onHover: (id: string | null) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick, onHover }) => {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div 
      className="group relative cursor-pointer transition-colors duration-200"
      onClick={() => onClick(project.id)}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project.id);
        }
      }}
    >
      <div className="flex items-center w-full py-5 px-4 
                      rounded-[var(--radius-md)]
                      group-hover:bg-[var(--color-paper-dark)]
                      transition-all duration-300 ease-soft relative overflow-hidden">
        
        {/* Col 1: ID - Fixed Width */}
        <div className="w-12 md:w-16 font-mono text-xs opacity-30 text-[var(--color-ink)] group-hover:opacity-100 transition-colors">
          {formattedIndex}
        </div>

        {/* Col 2: Title */}
        <div className="flex-1 pr-32">
          <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-[var(--color-ink)] transition-colors group-hover:translate-x-2 duration-300">
            {project.title}
          </h3>
        </div>

        {/* Hover Guidance Label - Appears on right */}
        <div className="absolute right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-soft hidden md:block">
           <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] flex items-center gap-2">
             View Case Study →
           </span>
        </div>
      </div>
    </div>
  );
};