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
      {/* Top Bar Navigation - DARK MODE */}
      <div className="sticky top-0 z-50 bg-[var(--color-ink)] border-b border-[var(--color-paper)]/10 flex justify-between items-center px-4 md:px-8 h-16 text-[var(--color-paper)]">
        <div className="flex-1">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:text-[var(--color-accent-light)] transition-colors opacity-80 hover:opacity-100"
          >
            <ArrowLeft className="w-3 h-3" />
            Index
          </button>
        </div>
        
        {/* CENTER: Project Title */}
        <div className="flex-1 text-center">
          <span className="font-mono text-sm font-bold uppercase tracking-widest hidden md:block">
            {project.title}
          </span>
        </div>
        
        <div className="flex-1 flex justify-end">
           <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 hidden md:block">
             Ref: {project.id.toUpperCase()}
           </span>
        </div>
      </div>

      <div className="flex-1 lg:grid lg:grid-cols-12 min-h-[calc(100vh-64px)]">
        
        {/* LEFT COLUMN: PURE SIMULATOR (Sticky) */}
        <div className="lg:col-span-5 bg-[var(--color-ink)] text-[var(--color-paper)] p-6 md:p-8 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] flex flex-col items-center justify-center border-r border-[var(--color-paper)]/10 overflow-hidden">
          
          {/* THE SIMULATOR: Video in iPhone 16 Frame */}
          {/* iPhone 16 Aspect Ratio is roughly 19.5:9 (~2.16) */}
          <div className="relative w-full max-w-[340px] flex flex-col items-center">
             
             {/* Device Bezel */}
             <div className="relative w-full aspect-[9/19.5] bg-black rounded-[46px] border-[8px] border-[var(--color-ink-subtle)]/30 shadow-2xl overflow-hidden ring-1 ring-white/10 transform transition-transform duration-700 hover:scale-[1.01]">
                
                {/* Dynamic Island Hint (Optional aesthetic touch) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[30%] h-7 bg-black rounded-full z-30 pointer-events-none"></div>

                {/* Screen Content */}
                {project.videoUrl ? (
                   <video 
                     src={project.videoUrl} 
                     autoPlay 
                     muted 
                     loop 
                     playsInline 
                     className="w-full h-full object-cover opacity-95" 
                   />
                ) : (
                   <img 
                     src={project.heroUrl} 
                     alt="Prototype Preview" 
                     className="w-full h-full object-cover opacity-95" 
                   />
                )}
                
                {/* Glare/Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20" />
             </div>
             
             {/* Live Prototype Link - Strictly below video */}
             <div className="mt-8 w-full">
                {project.liveUrl ? (
                   <a 
                     href={project.liveUrl} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="group flex items-center justify-center gap-3 w-full py-4 bg-[var(--color-paper)] text-[var(--color-ink)] font-mono text-xs uppercase tracking-wider rounded-[var(--radius-sm)] hover:bg-[var(--color-accent-light)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                   >
                      <span>Launch Prototype</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                   </a>
                ) : (
                   <div className="w-full py-4 border border-[var(--color-paper)]/20 text-[var(--color-paper)] font-mono text-xs uppercase tracking-wider rounded-[var(--radius-sm)] text-center opacity-50 cursor-not-allowed">
                      Prototype Offline
                   </div>
                )}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Manual / Spec Sheet (Scrollable) */}
        <div className="lg:col-span-7 bg-[var(--color-paper)] p-6 md:p-12 lg:p-24 overflow-y-auto">
           <div className="max-w-2xl mx-auto space-y-20 animate-in slide-in-from-bottom-4 duration-700 ease-soft">
              
              {/* HEADER INFO (Moved from Left Pane) */}
              <div className="pb-12 border-b border-[var(--color-paper-dark)]">
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1.1] text-[var(--color-ink)]">
                  {project.title}
                 </h1>
                 <p className="text-xl font-light text-[var(--color-ink-subtle)] leading-relaxed text-balance">
                  {project.tagline}
                 </p>
                 
                 {/* Meta Data Row */}
                 <div className="flex gap-8 mt-8 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] opacity-60">
                    <div>
                       <span className="opacity-50 mr-2">Role:</span>
                       {project.role}
                    </div>
                    <div>
                       <span className="opacity-50 mr-2">Time:</span>
                       {project.duration}
                    </div>
                 </div>
              </div>

              {/* SECTION: CONTEXT */}
              <section>
                 <div className="flex items-baseline gap-4 mb-8">
                    <span className="font-mono text-xs text-[var(--color-accent)] font-bold">01</span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40">System Context</h3>
                 </div>
                 <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                    {project.description}
                 </p>
              </section>

              {/* SECTION: ARCHITECTURE */}
              <section className="grid gap-12">
                 <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-mono text-xs text-[var(--color-accent)] font-bold">02</span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40">Architecture</h3>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-12 bg-[var(--color-paper-dim)]/20 p-6 rounded-[var(--radius-md)] border border-[var(--color-paper-dark)]/50">
                    <div className="space-y-4">
                       <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">Problem Space</span>
                       <p className="text-base leading-relaxed text-[var(--color-ink-subtle)]">
                          {project.challenge}
                       </p>
                    </div>
                    <div className="space-y-4">
                       <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">Resolution</span>
                       <p className="text-base leading-relaxed text-[var(--color-ink-subtle)]">
                          {project.solution}
                       </p>
                    </div>
                 </div>
              </section>

              {/* SECTION: LOGIC */}
              <section>
                 <div className="flex items-baseline gap-4 mb-8">
                    <span className="font-mono text-xs text-[var(--color-accent)] font-bold">03</span>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40">Interaction Logic</h3>
                 </div>
                 
                 <div className="pl-6 border-l-2 border-[var(--color-ink)] relative">
                    <p className="text-lg leading-relaxed text-[var(--color-ink)] italic">
                       {project.interactionNotes}
                    </p>
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