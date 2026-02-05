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
      className="group relative cursor-pointer border-t-ink transition-colors duration-0"
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
      <div className="flex flex-col md:flex-row items-baseline md:items-center w-full py-6 md:py-8 px-2 group-hover:bg-[#111] group-hover:text-[#FDFCF8] transition-colors duration-100 ease-switch">
        
        {/* Col 1: ID */}
        <div className="w-16 font-mono text-xs opacity-50 mb-2 md:mb-0">
          ({formattedIndex})
        </div>

        {/* Col 2: Title */}
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* Col 3: Role (Desktop) */}
        <div className="hidden md:block w-64 font-mono text-xs uppercase tracking-wide opacity-70">
          {project.role}
        </div>

        {/* Col 4: Tags (Desktop) */}
        <div className="hidden md:block w-64 font-mono text-xs uppercase tracking-wide opacity-70 text-right">
          {project.tags[0]}
        </div>
        
        {/* Mobile Meta */}
        <div className="md:hidden flex justify-between w-full mt-2 font-mono text-[10px] uppercase opacity-60">
           <span>{project.role}</span>
           <span>{project.tags[0]}</span>
        </div>
      </div>
    </div>
  );
};