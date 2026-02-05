import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
  onHover?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onHover }) => {
  return (
    <article 
      className="
        group relative cursor-pointer flex flex-col gap-6 p-6 rounded-2xl 
        transition-all duration-200 ease-snap 
        /* Phantom Structure */
        bg-slate-50 border border-slate-200/60
        /* Hover State */
        hover:bg-white hover:border-transparent hover:shadow-ethereal hover:-translate-y-1
        /* Focus State */
        focus-visible:bg-white focus-visible:border-transparent focus-visible:shadow-ethereal focus-visible:translate-y-[-4px]
      "
      onClick={() => onClick(project.id)}
      onMouseEnter={onHover}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project.id);
        }
      }}
    >
      {/* Image Container: Unique View Transition Name */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#E5E5E5]">
        <img 
          src={project.thumbnailUrl} 
          alt={`Thumbnail for ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
          loading="lazy"
          style={{ viewTransitionName: `project-image-${project.id}` } as React.CSSProperties}
        />
        <div className="absolute inset-0 bg-[#2B6B7C]/0 transition-colors duration-200 group-hover:bg-[#2B6B7C]/10 group-focus-visible:bg-[#2B6B7C]/10" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {project.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                className="text-[11px] font-bold uppercase tracking-widest text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 transition-all duration-200 group-hover:text-[#2B6B7C] group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>

        {/* Title: Unique View Transition Name */}
        <h3 
          className="text-3xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-[#2B6B7C] transition-colors duration-200"
          style={{ viewTransitionName: `project-title-${project.id}` } as React.CSSProperties}
        >
          {project.title}
        </h3>
        
        <p className="text-slate-600 leading-relaxed text-lg max-w-md">
          {project.tagline}
        </p>
      </div>
      
      <div className="absolute inset-0 z-0 pointer-events-none rounded-2xl" aria-hidden="true" />
    </article>
  );
};