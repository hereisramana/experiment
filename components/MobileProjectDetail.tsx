import React, { useRef, useState, useEffect } from 'react';
import { Project, DetailMode } from '../types';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface MobileProjectDetailProps {
  project: Project;
  mode: DetailMode;
  onBack: () => void;
}

export const MobileProjectDetail: React.FC<MobileProjectDetailProps> = ({ project, mode, onBack }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  
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

  useEffect(() => {
     window.scrollTo(0,0);
  }, [mode]);

  return (
    <div className="h-[100dvh] w-full bg-[var(--color-paper)] flex flex-col font-sans">
      {/* Header */}
      <header className="relative h-16 shrink-0 border-b border-[var(--color-paper-dark)]/20 px-4 flex items-center justify-between bg-[var(--color-paper)] z-50">
        
        {/* Absolute Centered Title Group */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none w-full max-w-[60%]">
           <h1 className="text-xs uppercase font-bold tracking-[0.2em] line-clamp-1 text-center w-full">{project.title}</h1>
           <span className="text-[9px] uppercase tracking-widest opacity-40">{mode === 'VIDEO' ? 'Video Demo' : 'Case Study'}</span>
        </div>

        {/* Left Action */}
        <button onClick={onBack} className="relative z-10 flex items-center gap-2 p-2 -ml-2 rounded-full active:bg-[var(--color-paper-dim)]">
          <ArrowLeft className="w-5 h-5 text-[var(--color-ink)]" />
        </button>
        
        {/* Right Action */}
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-ink)] text-white rounded-full">
             <span className="text-[9px] font-bold uppercase tracking-widest">Prototype</span>
             <ArrowUpRight className="w-3 h-3" />
          </a>
        ) : <div className="w-8 relative z-10" />}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative bg-[var(--color-paper)]">
        {mode === 'VIDEO' && (
           <div className="h-full w-full flex items-center justify-center bg-black p-4">
              {/* Vertical Phone Constraint - using aspect-ratio 9/16 and height 100% to fill space */}
              <div 
                  className="relative rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-paper-dark)]/30 bg-black"
                  style={{ 
                     height: '100%', 
                     aspectRatio: '9/16', 
                     width: 'auto',
                     maxWidth: '100%' 
                  }}
              >
                  <iframe 
                    src={project.videoUrl} 
                    className="w-full h-full"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen 
                    title={`${project.title} Video Demo`}
                  />
              </div>
           </div>
        )}

        {mode === 'WRITTEN' && (
           <div className="h-full overflow-y-auto bg-[var(--color-paper-dim)]" ref={scrollRef} onScroll={handleScroll}>
              {/* Progress Bar */}
              <div className="sticky top-0 left-0 right-0 h-[3px] z-[60] bg-[var(--color-paper-dark)]/30 w-full">
                 <div 
                   className="h-full bg-[#2B6B7C] transition-all duration-75 ease-linear" 
                   style={{ width: `${readingProgress}%` }} 
                 />
              </div>

              <div className="p-6 pb-24 space-y-12">
                  <div className="pb-8 border-b border-[var(--color-paper-dark)]/50">
                     <h2 className="text-3xl font-medium tracking-tight mb-4 leading-tight text-[var(--color-ink)]">
                      {project.title}
                     </h2>
                     <p className="text-lg text-[var(--color-ink-subtle)] font-light leading-relaxed">{project.tagline}</p>
                  </div>

                  <section>
                     <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-4 border-b border-[var(--color-paper-dark)]/30 pb-2">System Context</h3>
                     <p className="text-base leading-relaxed text-[var(--color-ink)] font-light text-balance">{project.description}</p>
                  </section>

                  <section className="space-y-6">
                     <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40">Architecture</h3>
                     {/* Darker inner card for contrast against paper-dim background */}
                     <div className="p-6 bg-[var(--color-paper-dark)]/30 rounded-[var(--radius-md)] border border-[var(--color-paper-dark)]/30 space-y-6">
                        <div className="space-y-2">
                           <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">The Challenge</span>
                           <p className="text-sm leading-relaxed text-[var(--color-ink-subtle)]">{project.challenge}</p>
                        </div>
                        <div className="space-y-2">
                           <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">The Resolution</span>
                           <p className="text-sm leading-relaxed text-[var(--color-ink-subtle)]">{project.solution}</p>
                        </div>
                     </div>
                  </section>

                  <section>
                     <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-4">Interaction Logic</h3>
                     <div className="pl-4 border-l-[3px] border-[#2B6B7C]/40">
                        <p className="text-lg leading-relaxed text-[var(--color-ink)] italic font-light">{project.interactionNotes}</p>
                     </div>
                  </section>

                  <section>
                     <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-4 border-b border-[var(--color-paper-dark)]/30 pb-2">Outcome</h3>
                     {/* Matching Desktop Outcome Style: High Contrast */}
                     <p className="text-sm leading-relaxed text-[var(--color-paper)] font-medium bg-[var(--color-ink)] p-6 rounded-[var(--radius-md)]">{project.outcome}</p>
                  </section>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
