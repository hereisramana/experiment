import React, { useEffect } from 'react';
import { Project } from '../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from './Button';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  playHover?: () => void;
  playClick?: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, playHover, playClick }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <article className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      
      <div className="max-w-7xl mx-auto px-8 py-12">
        <button 
          onClick={() => {
            playClick?.();
            onBack();
          }}
          onMouseEnter={playHover}
          className="group flex items-center gap-3 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B6B7C]"
          aria-label="Back to project index"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO INDEX
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-48">
        
        <header className="mb-24">
          <h1 
            className="text-7xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tighter leading-[0.9] font-heading"
            style={{ viewTransitionName: `project-title-${project.id}` } as React.CSSProperties}
          >
            {project.title}
          </h1>
          <p className="text-2xl md:text-3xl text-slate-600 leading-tight max-w-4xl font-light">
            {project.tagline}
          </p>
        </header>

        {/* Hero: Matches Card Image Transition */}
        <div className="w-full h-[50vh] md:h-[70vh] bg-[#F5F5F5] rounded-xl overflow-hidden mb-24 shadow-ethereal-sm border border-slate-100">
          {project.videoUrl ? (
            <video 
              src={project.videoUrl}
              poster={project.heroUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover motion-reduce:hidden"
              style={{ viewTransitionName: `project-image-${project.id}` } as React.CSSProperties}
            />
          ) : null}
          <img 
            src={project.heroUrl} 
            alt={project.title}
            className={`w-full h-full object-cover ${project.videoUrl ? 'hidden motion-reduce:block' : ''}`}
            style={{ viewTransitionName: `project-image-${project.id}` } as React.CSSProperties}
          />
        </div>

        <div className="flex flex-wrap gap-x-16 gap-y-10 mb-32 border-t border-slate-200 pt-10">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Role</span>
            <span className="block font-medium text-slate-900 text-lg">{project.role}</span>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Timeline</span>
            <span className="block font-medium text-slate-900 text-lg">{project.duration}</span>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Focus</span>
            <span className="block font-medium text-slate-900 text-lg">{project.tags[0]}</span>
          </div>
          {project.liveUrl && (
            <div className="flex flex-col justify-between">
               <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 opacity-0">Link</span>
               <a 
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="text-[#2B6B7C] font-semibold hover:underline flex items-center gap-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#2B6B7C] rounded-md px-1 -ml-1"
              >
                Visit Live <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-24">
            <section>
              <h3 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">The Context</h3>
              <p className="text-xl text-slate-600 leading-relaxed max-w-[65ch]">{project.description}</p>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
               <div>
                 <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Challenge</h4>
                 <p className="text-lg text-slate-800 leading-relaxed">{project.challenge}</p>
               </div>
               <div>
                 <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Solution</h4>
                 <p className="text-lg text-slate-800 leading-relaxed">{project.solution}</p>
               </div>
            </section>
            <section>
              <h3 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Interaction Logic</h3>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-[65ch]">{project.interactionNotes}</p>
            </section>
          </div>
          <div className="lg:col-span-4 space-y-8">
             <div className="sticky top-32 p-10 bg-[#F9FAFB] rounded-2xl border border-slate-100">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Outcome</h4>
                <p className="text-slate-700 leading-relaxed font-medium text-lg">
                  "{project.outcome}"
                </p>
             </div>
          </div>
        </div>

        <div className="mt-40 pt-20 border-t border-slate-200 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Next Project?</h2>
            <Button 
              onClick={() => {
                playClick?.();
                onBack();
              }} 
              onMouseEnter={playHover}
              variant="secondary"
            >
                Back to Index
            </Button>
        </div>
      </div>
    </article>
  );
};