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
      <div className="flex items-baseline w-full py-5 px-4 
                      rounded-[var(--radius-md)]
                      group-hover:bg-[var(--color-paper-dark)]
                      transition-all duration-300 ease-soft">
        
        {/* Col 1: ID - Fixed Width */}
        <div className="w-12 md:w-16 font-mono text-xs opacity-30 text-[var(--color-ink)] group-hover:opacity-100 transition-colors">
          {formattedIndex}
        </div>

        {/* Col 2: Title */}
        <div className="flex-1">
          <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-[var(--color-ink)] transition-colors group-hover:translate-x-2 duration-300">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
};