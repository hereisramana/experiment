import React, { useRef } from 'react';
import { PROJECTS, SKILLS } from '../constants';
import { ProjectCard } from './ProjectCard';
import { Globe, ArrowRight } from 'lucide-react';

interface MobileHomeProps {
  onNavigate: (projectId: string) => void;
  setIsContactOpen: (isOpen: boolean) => void;
}

export const MobileHome: React.FC<MobileHomeProps> = ({ onNavigate, setIsContactOpen }) => {
  const topScrollRef = useRef<HTMLDivElement>(null);

  const scrollToDarkPane = () => {
    if (topScrollRef.current) {
      const width = topScrollRef.current.offsetWidth;
      topScrollRef.current.scrollTo({
        left: width,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[var(--color-paper)] overflow-hidden">
      
      {/* UPPER DECK: Horizontal Snap (Hero + Dark Pane) */}
      {/* Occupies roughly 60% of vertical space */}
      <div 
        ref={topScrollRef}
        className="h-[60%] flex-none w-full overflow-x-auto snap-x snap-mandatory flex no-scrollbar"
      >
        
        {/* SLIDE 1: HERO (White) */}
        <div className="min-w-full w-full h-full snap-start overflow-y-auto flex flex-col p-6 pt-6 relative bg-[var(--color-paper)] border-b border-[var(--color-paper-dark)]/10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 shrink-0">
               <h1 className="font-mono text-sm font-bold text-[var(--color-ink)] lowercase tracking-tight">
                  ramanadesign.tech
               </h1>
               <button 
                 onClick={() => setIsContactOpen(true)}
                 className="text-[10px] uppercase font-semibold tracking-widest text-[var(--color-ink)] border border-[var(--color-paper-dark)]/30 px-3 py-1.5 rounded-[var(--radius-sm)] active:bg-[var(--color-ink)] active:text-[var(--color-paper)] transition-colors touch-manipulation"
               >
                 Contact
               </button>
            </div>

            <div className="flex-1 flex flex-col justify-center pb-8">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.05] mb-4 text-[var(--color-ink)]">
                Product Designer & Technologist.
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-[var(--color-ink-subtle)] leading-relaxed max-w-[90%]">
                  Specializing in calm interactive systems and technical clarity.
                </p>
                
                <button 
                  onClick={scrollToDarkPane}
                  className="w-max group flex items-center gap-2 text-xs uppercase font-medium tracking-widest text-[var(--color-ink)] bg-[var(--color-paper-dim)]/50 px-4 py-3 rounded-[var(--radius-sm)] transition-all active:scale-95 touch-manipulation"
                >
                  <span>Philosophy & Skills</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            {/* Visual indicator for horizontal scroll */}
            <div className="absolute bottom-4 right-4 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)] opacity-20"></div>
            </div>
        </div>

        {/* SLIDE 2: DARK PANE (Skills/Context) */}
        <div className="min-w-full w-full h-full snap-start overflow-y-auto bg-[var(--color-ink)] text-[var(--color-paper)] p-8 relative">
           <div className="space-y-10 max-w-sm mx-auto pt-4">
              {SKILLS.map((group) => (
                 <div key={group.category}>
                    <h3 className="font-mono text-[10px] uppercase tracking-widest mb-3 opacity-50 text-[var(--color-paper-dark)]">{group.category}</h3>
                    <ul className="flex flex-wrap gap-x-4 gap-y-2">
                       {group.items.map(item => (
                         <li key={item} className="text-sm font-medium opacity-80">{item}</li>
                       ))}
                    </ul>
                 </div>
              ))}
              
              <div className="border-t border-white/10 pt-8 mt-8">
                  <Globe className="w-8 h-8 text-[var(--color-paper-dark)] opacity-20 mb-4" />
                  <p className="text-base leading-relaxed font-light text-balance text-[var(--color-paper-dim)] italic">
                    "The interface should be a silent partner, not a noisy decoration."
                  </p>
              </div>
           </div>
           
           {/* Visual indicator for horizontal scroll */}
           <div className="absolute bottom-4 left-4 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-paper)] opacity-20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-paper)]"></div>
           </div>
        </div>
      </div>

      {/* LOWER DECK: Project List (Vertical Scroll) */}
      {/* Occupies remaining space, fixed at bottom */}
      <div className="flex-1 min-h-0 bg-[var(--color-paper)] border-t border-[var(--color-paper-dark)]/20 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="sticky top-0 bg-[var(--color-paper)]/95 backdrop-blur-sm z-30 px-6 py-3 border-b border-[var(--color-paper-dark)]/10 flex items-center justify-between">
             <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-50">Selected Works</span>
             <span className="font-mono text-xs text-[var(--color-ink)] opacity-30">{PROJECTS.length}</span>
          </div>
          
          <div className="h-full overflow-y-auto p-4 pb-12 space-y-3">
             {PROJECTS.map((project, idx) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={idx}
                  onClick={() => onNavigate(project.id)}
                  onHover={() => {}} 
                />
             ))}
             {/* Spacer for bottom safe area */}
             <div className="h-8"></div>
          </div>
      </div>

    </div>
  );
};