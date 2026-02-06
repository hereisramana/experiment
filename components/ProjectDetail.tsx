import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, ArrowDown } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    // Reset scroll to top of window (for mobile) and container (for desktop)
    window.scrollTo(0, 0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [project.id]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // Hide if we are within 50px of the bottom to prevent clutter
      if (scrollHeight - scrollTop - clientHeight < 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    }
  };

  // Inject the specific accent color for the button hover state
  const buttonStyle = {
    '--button-hover-bg': project.accentColor || 'var(--color-accent-light)'
  } as React.CSSProperties;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-12 bg-[var(--color-paper)] h-screen overflow-hidden">
        
        {/* LEFT COLUMN: PURE SIMULATOR (Sticky) */}
        <div className="lg:col-span-5 bg-[var(--color-ink)] text-[var(--color-paper)] h-full flex flex-col relative z-20 border-r border-[var(--color-paper)]/10">
          
          {/* Back Button - Absolute positioning top-left */}
          <button 
            onClick={onBack}
            className="absolute top-6 left-6 md:top-8 md:left-8 group flex items-center py-2 px-4 rounded-[var(--radius-sm)] transition-all duration-300 hover:bg-[var(--color-paper)]/10 z-30 -ml-4"
            aria-label="Back"
          >
            <span className="text-xs uppercase font-medium tracking-widest text-[var(--color-paper)] opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all">
                ← Back
            </span>
          </button>

          {/* THE SIMULATOR: Flexible Container Layout */}
          {/* pt-24 ensures we clear the Back button. pb-8 gives breathing room at bottom. */}
          <div className="w-full h-full flex flex-col items-center pt-24 pb-8 px-6 md:px-12">
             
             {/* Media Frame - flex-1 min-h-0 allows it to take all remaining vertical space */}
             <div className="flex-1 w-full min-h-0 flex items-center justify-center mb-8 relative">
                <div className="relative w-full h-full bg-black rounded-xl border border-[var(--color-ink-subtle)]/30 shadow-2xl overflow-hidden ring-1 ring-white/10">
                   {/* Screen Content - object-contain ensures 4:5 or 1:1 videos fit perfectly without crop */}
                   {project.videoUrl ? (
                      <video 
                        src={project.videoUrl} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="w-full h-full object-contain opacity-95" 
                      />
                   ) : (
                      <img 
                        src={project.heroUrl} 
                        alt="Prototype Preview" 
                        className="w-full h-full object-contain opacity-95" 
                      />
                   )}
                </div>
             </div>
             
             {/* Live Prototype Link - Rigid footer element */}
             <div className="w-full max-w-[280px] shrink-0">
                {project.liveUrl ? (
                   <a 
                     href={project.liveUrl} 
                     target="_blank" 
                     rel="noreferrer" 
                     style={buttonStyle}
                     className="group flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-[var(--color-paper)] text-[var(--color-ink)] text-[10px] md:text-xs uppercase font-medium tracking-wider rounded-[var(--radius-sm)] hover:bg-[var(--button-hover-bg)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                   >
                      <span>Launch Prototype</span>
                      <ArrowUpRight className="w-3 h-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:stroke-[3px]" />
                   </a>
                ) : (
                   <div className="w-full py-3 md:py-4 border border-[var(--color-paper)]/20 text-[var(--color-paper)] text-[10px] md:text-xs uppercase font-medium tracking-wider rounded-[var(--radius-sm)] text-center opacity-50 cursor-not-allowed">
                      Prototype Offline
                   </div>
                )}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Manual / Spec Sheet (Scrollable) */}
        <div className="lg:col-span-7 bg-[var(--color-paper)] relative h-full overflow-hidden">
           
           {/* Scroll Indicator - Vanishes on scroll end */}
           <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 z-10 mix-blend-multiply hidden lg:block ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
              <ArrowDown className="w-5 h-5 text-[var(--color-ink)] opacity-30 animate-bounce" />
           </div>

           <div 
             ref={scrollRef}
             onScroll={handleScroll}
             className="h-full overflow-y-auto p-6 md:p-12 lg:p-24 no-scrollbar"
           >
               <div className="max-w-2xl mx-auto space-y-20 animate-in slide-in-from-bottom-4 duration-700 ease-soft pb-24">
                  
                  {/* HEADER INFO: Minimal */}
                  <div className="pb-12 border-b border-[var(--color-paper-dark)]">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-2 leading-[1.1] text-[var(--color-ink)]">
                      {project.title} <span className="block md:inline md:text-[0.6em] text-[var(--color-ink-subtle)] font-light mt-2 md:mt-0 md:ml-2">— Case Study</span>
                     </h1>
                  </div>

                  {/* SECTION: CONTEXT */}
                  <section>
                     <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8">System Context</h3>
                     <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                        {project.description}
                     </p>
                  </section>

                  {/* SECTION: ARCHITECTURE */}
                  <section className="grid gap-12">
                     <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-2">Architecture</h3>
                     
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
                     <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8">Interaction Logic</h3>
                     
                     <div className="pl-6 border-l-2 border-[var(--color-ink)] relative">
                        <p className="text-lg leading-relaxed text-[var(--color-ink)] italic">
                           {project.interactionNotes}
                        </p>
                     </div>
                  </section>

                  {/* FOOTER: Sign-off */}
                  <div className="pt-12 mt-0">
                     <p className="font-mono text-[10px] text-[var(--color-ink-subtle)] opacity-40 mb-6 uppercase tracking-widest">
                        That’s the end. Thanks for being here.
                     </p>
                     
                     <div 
                        className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer flex justify-between items-center group"
                        onClick={onBack}
                     >
                        <div className="h-px bg-[var(--color-ink)] flex-1 mr-6 opacity-30 group-hover:opacity-100 transition-all origin-left scale-x-50 group-hover:scale-x-100"></div>
                        <span className="text-xs uppercase font-medium tracking-widest flex items-center gap-2 group-hover:text-[var(--color-accent)]">
                           <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Back to Main Page
                        </span>
                     </div>
                  </div>

               </div>
           </div>
        </div>
    </div>
  );
};