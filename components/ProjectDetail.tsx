import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  // Reading Progress State
  const scrollRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const handleScroll = () => {
    if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollHeight === clientHeight) {
            setReadingProgress(100);
        } else {
            const progress = scrollTop / (scrollHeight - clientHeight);
            setReadingProgress(progress * 100);
        }
    }
  };

  return (
    <div className="h-[100dvh] w-screen bg-[var(--color-paper)] overflow-hidden flex flex-col select-none font-sans">
      
      {/* Universal Header */}
      <header className="h-16 shrink-0 border-b border-[var(--color-paper-dark)]/20 px-6 flex items-center justify-between bg-[var(--color-paper)] z-50">
        <button onClick={onBack} className="flex items-center gap-2 group p-2 -ml-2 rounded-full hover:bg-[var(--color-paper-dim)] transition-colors">
          <ArrowLeft className="w-5 h-5 text-[var(--color-ink)]" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Back to Overview</span>
        </button>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
           <h1 className="text-xs uppercase font-bold tracking-[0.2em]">{project.title}</h1>
        </div>
        
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-ink)] text-white rounded-full shadow-lg hover:scale-[1.05] active:scale-95 transition-all">
             <span className="text-[10px] font-bold uppercase tracking-widest pl-1">Prototype</span>
             <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </header>

      {/* Split Container */}
      <div className="flex-1 flex w-full relative overflow-hidden">
        
        {/* Left: Written Pane */}
        <div 
          className="h-full bg-[var(--color-paper)] overflow-y-auto no-scrollbar scroll-smooth relative border-r border-[var(--color-paper-dark)]/20" 
          style={{ width: '60%' }}
          ref={scrollRef}
          onScroll={handleScroll}
        >
           {/* Reading Progress Bar (Sticky) */}
           <div className="sticky top-0 left-0 right-0 h-[2px] z-[60] bg-[var(--color-paper-dim)]/30 w-full">
              <div 
                className="h-full bg-[var(--color-ink)] transition-all duration-75 ease-linear" 
                style={{ width: `${readingProgress}%` }} 
              />
           </div>

           <div className="px-12 lg:px-24 pt-12 pb-48 mx-auto space-y-24 max-w-3xl">
              
              <div className="pb-12 border-b border-[var(--color-paper-dark)]">
                 <h2 className="text-5xl lg:text-6xl font-medium tracking-tight mb-4 leading-[1.05] text-[var(--color-ink)]">
                  {project.title} <span className="text-[var(--color-ink-subtle)] text-4xl lg:text-5xl font-light block mt-2">— Case Study</span>
                 </h2>
                 <p className="text-xl lg:text-2xl text-[var(--color-ink-subtle)] font-light leading-relaxed max-w-xl">{project.tagline}</p>
              </div>

              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8 border-b border-[var(--color-paper-dark)]/30 pb-2">System Context</h3>
                 <p className="text-xl leading-relaxed text-[var(--color-ink)] font-light text-balance">{project.description}</p>
              </section>

              <section className="grid gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-2">Architecture</h3>
                 <div className="grid gap-12 p-10 bg-[var(--color-paper-dim)]/30 rounded-[var(--radius-lg)] border border-[var(--color-paper-dark)]/50">
                    <div className="space-y-4">
                       <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-ink)] opacity-40">The Challenge</span>
                       <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.challenge}</p>
                    </div>
                    <div className="space-y-4">
                       <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-ink)] opacity-40">The Resolution</span>
                       <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.solution}</p>
                    </div>
                 </div>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-10">Interaction Logic</h3>
                 <div className="pl-10 border-l-[3px] border-[var(--color-ink)]/20 hover:border-[var(--color-ink)] transition-colors">
                    <p className="text-2xl leading-relaxed text-[var(--color-ink)] italic font-light">{project.interactionNotes}</p>
                 </div>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8 border-b border-[var(--color-paper-dark)]/30 pb-2">Outcome</h3>
                 <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)] font-medium bg-[var(--color-ink)] text-white p-8 rounded-[var(--radius-md)]">{project.outcome}</p>
              </section>
           </div>
        </div>
        
        {/* Right: Video Pane */}
        <div 
          className="h-full bg-[var(--color-paper)] overflow-hidden relative flex items-center justify-center" 
          style={{ width: '40%' }}
        >
           {/* The "Frame" Container */}
           <div className={`relative w-full p-6 md:p-8 flex items-center justify-center`}>
               <div className="relative w-full bg-black rounded-[var(--radius-lg)] shadow-2xl border border-[var(--color-paper-dark)] overflow-hidden">
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe 
                      id="js_video_iframe" 
                      src={project.videoUrl} 
                      frameBorder="0" 
                      allowFullScreen 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title={`${project.title} Video Demo`}
                    />
                  </div>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
};
