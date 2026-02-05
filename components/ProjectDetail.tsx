import React, { useEffect } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      {/* Top Bar Navigation - DARK MODE for seamless integration with Left Column */}
      <div className="sticky top-0 z-50 bg-[var(--color-ink)] border-b border-[var(--color-paper)]/10 flex justify-between items-center px-4 md:px-8 h-16 text-[var(--color-paper)]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:text-[var(--color-accent-light)] transition-colors opacity-80 hover:opacity-100"
        >
          <ArrowLeft className="w-3 h-3" />
          Index
        </button>
        <span className="font-mono text-xs uppercase tracking-wider hidden md:block opacity-40">
          Ref: {project.id.toUpperCase()}
        </span>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      <div className="flex-1 lg:grid lg:grid-cols-12 min-h-[calc(100vh-64px)]">
        
        {/* LEFT COLUMN: The Simulator / Control Panel (Sticky) - DARK MASS */}
        <div className="lg:col-span-5 bg-[var(--color-ink)] text-[var(--color-paper)] p-6 md:p-12 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] flex flex-col border-r border-[var(--color-paper)]/10 overflow-hidden">
          
          {/* Header Info */}
          <div className="mb-6 relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-2 leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-[var(--color-paper-dim)] text-sm md:text-base font-light opacity-70 max-w-xs leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* THE SIMULATOR: Video in Mobile Frame */}
          <div className="flex-1 relative flex flex-col justify-center items-center w-full min-h-[400px]">
             {/* Device Bezel */}
             <div className="relative w-[260px] md:w-[280px] aspect-[9/19] bg-black rounded-[3rem] border-[6px] border-[var(--color-ink-subtle)]/30 shadow-2xl overflow-hidden ring-1 ring-white/5 transform transition-transform duration-700 hover:scale-[1.02]">
                {/* Screen Content */}
                {project.videoUrl ? (
                   <video 
                     src={project.videoUrl} 
                     autoPlay 
                     muted 
                     loop 
                     playsInline 
                     className="w-full h-full object-cover opacity-90" 
                   />
                ) : (
                   <img 
                     src={project.heroUrl} 
                     alt="Prototype Preview" 
                     className="w-full h-full object-cover opacity-90" 
                   />
                )}
                
                {/* Glare/Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20" />
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDFoNHYxSDB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LDI1NSwgMC4wNSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-20 pointer-events-none z-10" />
             </div>
             
             <div className="mt-4 font-mono text-[9px] uppercase tracking-widest opacity-30">
                Fig. 01 — Device Simulation
             </div>
          </div>

          {/* Action Module */}
          <div className="mt-6 relative z-10">
             {project.liveUrl ? (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex items-center justify-center gap-3 w-full py-4 bg-[var(--color-paper)] text-[var(--color-ink)] font-mono text-xs uppercase tracking-wider rounded-[var(--radius-sm)] hover:bg-[var(--color-accent-light)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                   <span>Launch Live Prototype</span>
                   <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
             ) : (
                <div className="w-full py-4 border border-[var(--color-paper)]/20 text-[var(--color-paper)] font-mono text-xs uppercase tracking-wider rounded-[var(--radius-sm)] text-center opacity-50 cursor-not-allowed">
                   Prototype Offline
                </div>
             )}

             {/* Meta Data Grid */}
             <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[var(--color-paper)]/10 font-mono text-[10px] uppercase tracking-wider text-[var(--color-paper-dim)]">
                <div>
                   <span className="block opacity-40 mb-1">Role</span>
                   <span>{project.role}</span>
                </div>
                <div>
                   <span className="block opacity-40 mb-1">Duration</span>
                   <span>{project.duration}</span>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Manual / Spec Sheet (Scrollable) - LIGHT SURFACE */}
        <div className="lg:col-span-7 bg-[var(--color-paper)] p-6 md:p-12 lg:p-24 overflow-y-auto">
           <div className="max-w-2xl mx-auto space-y-24 animate-in slide-in-from-bottom-4 duration-700 ease-soft">
              
              {/* SECTION: CONTEXT */}
              <section>
                 <div className="flex items-baseline gap-4 mb-8 border-b border-[var(--color-paper-dark)] pb-4">
                    <span className="font-mono text-xs text-[var(--color-accent)] font-bold">01</span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40">System Context</h3>
                 </div>
                 <p className="text-xl md:text-2xl leading-relaxed font-light text-[var(--color-ink)] text-balance">
                    {project.description}
                 </p>
              </section>

              {/* SECTION: ARCHITECTURE (Challenge/Solution) */}
              <section className="grid gap-12">
                 <div className="flex items-baseline gap-4 mb-2 border-b border-[var(--color-paper-dark)] pb-4">
                    <span className="font-mono text-xs text-[var(--color-accent)] font-bold">02</span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40">Architecture</h3>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <span className="font-mono text-[10px] uppercase tracking-wider bg-[var(--color-paper-dark)]/20 px-2 py-1 rounded-sm text-[var(--color-ink-subtle)]">Problem Space</span>
                       <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">
                          {project.challenge}
                       </p>
                    </div>
                    <div className="space-y-4">
                       <span className="font-mono text-[10px] uppercase tracking-wider bg-[var(--color-paper-dark)]/20 px-2 py-1 rounded-sm text-[var(--color-ink-subtle)]">Resolution</span>
                       <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">
                          {project.solution}
                       </p>
                    </div>
                 </div>
              </section>

              {/* SECTION: LOGIC (Interaction) */}
              <section>
                 <div className="flex items-baseline gap-4 mb-8 border-b border-[var(--color-paper-dark)] pb-4">
                    <span className="font-mono text-xs text-[var(--color-accent)] font-bold">03</span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40">Interaction Logic</h3>
                 </div>
                 
                 <div className="bg-[var(--color-paper-dim)]/30 border-l-2 border-[var(--color-ink)] pl-8 py-2 pr-4 relative">
                    <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                       {project.interactionNotes}
                    </p>
                    {/* Decorative quote marks */}
                    <span className="absolute -left-3 top-0 text-4xl text-[var(--color-ink)] leading-none opacity-20 font-serif">“</span>
                 </div>
                 
                 <div className="mt-8 pt-8 border-t border-dashed border-[var(--color-paper-dark)] flex justify-between items-end">
                    <div className="font-mono text-[10px] uppercase opacity-40 max-w-[200px]">
                       *Note: Logic defined for v1.0 release. Subject to user testing iteration.
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider opacity-40 text-right">
                       Fig. 02 — Behavioral Spec
                    </div>
                 </div>
              </section>

              {/* FOOTER: Sign-off */}
              <div 
                 className="pt-24 mt-12 opacity-40 hover:opacity-100 transition-opacity cursor-pointer flex justify-between items-center group"
                 onClick={onBack}
              >
                 <div className="h-px bg-[var(--color-ink)] flex-1 mr-6 opacity-30 group-hover:opacity-100 transition-all origin-left scale-x-50 group-hover:scale-x-100"></div>
                 <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-[var(--color-accent)]">
                    Return to Index <ArrowLeft className="w-3 h-3 rotate-180 transition-transform group-hover:translate-x-1" />
                 </span>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};
