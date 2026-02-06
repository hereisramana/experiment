import React, { useEffect } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, ArrowDown } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-12 bg-[var(--color-paper)]">
        
        {/* LEFT COLUMN: PURE SIMULATOR (Sticky) */}
        <div className="lg:col-span-5 bg-[var(--color-ink)] text-[var(--color-paper)] p-6 md:p-8 lg:h-screen lg:sticky lg:top-0 flex flex-col items-center justify-center border-r border-[var(--color-paper)]/10 overflow-hidden relative z-20">
          
          {/* Back Button - Simple */}
          <button 
            onClick={onBack}
            className="absolute top-8 left-8 group flex items-center py-2 pr-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:bg-[var(--color-paper)]/10"
            aria-label="Back"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-paper)] opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all">
                ← Back
            </span>
          </button>

          {/* THE SIMULATOR: Video in iPhone 16 Frame */}
          {/* iPhone 16 Aspect Ratio is roughly 19.5:9 (~2.16) */}
          <div className="relative w-full max-w-[340px] flex flex-col items-center">
             
             {/* Device Bezel */}
             <div className="relative w-full aspect-[9/19.5] bg-black rounded-[46px] border-[8px] border-[var(--color-ink-subtle)]/30 shadow-2xl overflow-hidden ring-1 ring-white/10 transform transition-transform duration-700 hover:scale-[1.01]">
                
                {/* Dynamic Island Hint */}
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
             
             {/* Live Prototype Link */}
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
        <div className="lg:col-span-7 bg-[var(--color-paper)] relative h-screen">
           
           {/* Scroll Indicator - Floating above content */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none animate-bounce z-10 mix-blend-multiply hidden lg:block">
              <ArrowDown className="w-5 h-5 text-[var(--color-ink)] opacity-30" />
           </div>

           <div className="h-full overflow-y-auto p-6 md:p-12 lg:p-24 no-scrollbar">
               <div className="max-w-2xl mx-auto space-y-20 animate-in slide-in-from-bottom-4 duration-700 ease-soft pb-24">
                  
                  {/* HEADER INFO: Minimal */}
                  <div className="pb-12 border-b border-[var(--color-paper-dark)]">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-2 leading-[1.1] text-[var(--color-ink)]">
                      {project.title} <span className="block md:inline md:text-[0.6em] text-[var(--color-ink-subtle)] font-light mt-2 md:mt-0 md:ml-2">— Case Study</span>
                     </h1>
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
                        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Back
                     </span>
                  </div>

               </div>
           </div>
        </div>
    </div>
  );
};