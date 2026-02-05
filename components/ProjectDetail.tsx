import React, { useEffect } from 'react';
import { Project } from '../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from './Button';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <article className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      
      {/* Navigation Line */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO INDEX
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-48">
        
        {/* Header: Pure Typography */}
        <header className="mb-24">
          <h1 className="text-8xl font-bold text-slate-900 mb-8 tracking-tighter leading-[0.9] font-heading">
            {project.title}
          </h1>
          <p className="text-3xl text-slate-500 leading-tight max-w-4xl font-light">
            {project.tagline}
          </p>
        </header>

        {/* Hero: Fixed height for wide screens so content is visible */}
        <div className="w-full h-[70vh] bg-[#F5F5F5] rounded-xl overflow-hidden mb-24 shadow-ethereal-sm">
          {project.videoUrl ? (
            <video 
              src={project.videoUrl}
              poster={project.heroUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={project.heroUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Info Grid: Fixed 4 columns */}
        <div className="grid grid-cols-4 gap-12 mb-32 border-t border-slate-100 pt-10">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Role</span>
            <span className="block font-medium text-slate-900 text-lg">{project.role}</span>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Timeline</span>
            <span className="block font-medium text-slate-900 text-lg">{project.duration}</span>
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Focus</span>
            <span className="block font-medium text-slate-900 text-lg">{project.tags[0]}</span>
          </div>
          {project.liveUrl && (
            <div className="flex items-start">
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#2B6B7C] font-semibold hover:underline flex items-center gap-2 text-lg"
              >
                Visit Live <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>

        {/* Narrative Section: Fixed 12 column layout */}
        <div className="grid grid-cols-12 gap-16">
          
          <div className="col-span-8 space-y-24">
            <section>
              <h3 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">The Context</h3>
              <p className="text-xl text-slate-600 leading-relaxed">{project.description}</p>
            </section>

            <section className="grid grid-cols-2 gap-16">
               <div>
                 <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Challenge</h4>
                 <p className="text-lg text-slate-800 leading-relaxed">{project.challenge}</p>
               </div>
               <div>
                 <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Solution</h4>
                 <p className="text-lg text-slate-800 leading-relaxed">{project.solution}</p>
               </div>
            </section>

            <section>
              <h3 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Interaction Logic</h3>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">{project.interactionNotes}</p>
            </section>
          </div>

          <div className="col-span-4 space-y-8">
             <div className="sticky top-32 p-10 bg-[#F9FAFB] rounded-2xl">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Outcome</h4>
                <p className="text-slate-700 leading-relaxed font-medium text-lg">
                  "{project.outcome}"
                </p>
             </div>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="mt-40 pt-20 border-t border-slate-100 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Next Project?</h2>
            <Button onClick={onBack} variant="secondary">
                Back to Index
            </Button>
        </div>

      </div>
    </article>
  );
};