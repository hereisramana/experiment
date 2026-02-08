
import React, { useRef, useState,} from 'react';
import { PROJECTS, SKILLS } from '../constants';
import { ProjectCard } from './ProjectCard';
import { Globe, ArrowRight, Mail, Phone, Github, ChevronRight } from 'lucide-react';

interface MobileHomeProps {
  onNavigate: (projectId: string) => void;
}

export const MobileHome: React.FC<MobileHomeProps> = ({ onNavigate }) => {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hasSwiped, setHasSwiped] = useState(false);

  const handleScroll = () => {
    if (topScrollRef.current && topScrollRef.current.scrollLeft > 50) {
      setHasSwiped(true);
    }
  };

  const scrollToDarkPane = () => {
    if (topScrollRef.current) {
      const width = topScrollRef.current.offsetWidth;
      topScrollRef.current.scrollTo({
        left: width,
        behavior: 'smooth'
      });
      setHasSwiped(true);
    }
  };

  const handleCardClick = (id: string) => {
    setSelectedProjectId(id);
    scrollToDarkPane();
  };

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);
  const baseIconBtnStyle = "p-2 rounded-[var(--radius-sm)] border border-[var(--color-paper-dark)]/30 text-[var(--color-ink)] transition-all active:scale-90 active:text-white touch-manipulation flex items-center justify-center w-9 h-9";

  return (
    <div className="h-[100dvh] w-screen flex flex-col bg-[var(--color-paper)] overflow-hidden overscroll-none">
      <div 
        ref={topScrollRef}
        onScroll={handleScroll}
        className="h-[60%] flex-none w-full overflow-x-auto snap-x snap-mandatory flex no-scrollbar"
      >
        <div className="min-w-full w-full h-full snap-start overflow-y-auto flex flex-col p-6 pt-6 relative bg-[var(--color-paper)] border-b border-[var(--color-paper-dark)]/10">
            <div className="flex justify-between items-center mb-8 shrink-0">
               <h1 className="font-mono text-sm font-bold text-[var(--color-ink)] lowercase tracking-tight">ramanadesign.tech</h1>
               <div className="flex items-center gap-2">
                 <a href="mailto:hello@ramanadesign.tech" className={`${baseIconBtnStyle} active:bg-blue-500 active:border-blue-500`} aria-label="Email"><Mail className="w-4 h-4" /></a>
                 <a href="tel:+15551234567" className={`${baseIconBtnStyle} active:bg-emerald-500 active:border-emerald-500`} aria-label="Call"><Phone className="w-4 h-4" /></a>
                 <a href="#" className={`${baseIconBtnStyle} active:bg-[#333] active:border-[#333]`} aria-label="Github"><Github className="w-4 h-4" /></a>
                 <a href="#" className={`${baseIconBtnStyle} active:bg-[#0077b5] active:border-[#0077b5]`} aria-label="LinkedIn">
                   <span className="text-[15px] font-bold leading-none opacity-80 active:opacity-100 pb-0.5" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>in</span>
                 </a>
               </div>
            </div>

            <div className="flex-1 flex flex-col justify-center pb-8">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.05] mb-4 text-[var(--color-ink)]">Product Designer & Technologist.</h2>
              <div className="space-y-6">
                <p className="text-lg text-[var(--color-ink-subtle)] leading-relaxed max-w-[90%]">Specializing in calm interactive systems and technical clarity.</p>
                <button onClick={scrollToDarkPane} className="w-max group flex items-center gap-2 text-xs uppercase font-medium tracking-widest text-[var(--color-ink)] bg-[var(--color-paper-dim)]/50 px-4 py-3 rounded-[var(--radius-sm)] transition-all active:scale-95 touch-manipulation">
                  <span>Philosophy & Skills</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Mobile Swipe Hint */}
            <div className={`absolute bottom-8 right-0 flex items-center gap-2 transition-all duration-700 pointer-events-none ${hasSwiped ? 'opacity-0 translate-x-10' : 'opacity-40 animate-pulse'}`}>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]">[ Swipe for Profile ]</span>
                <ChevronRight className="w-4 h-4" />
            </div>
            
            <div className="absolute bottom-4 right-4 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)] opacity-20"></div>
            </div>
        </div>

        <div className="min-w-full w-full h-full snap-start overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)] relative">
           {selectedProject ? (
             <div className="w-full h-full relative animate-in fade-in duration-500">
                <img src={selectedProject.heroUrl} alt={selectedProject.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 w-full p-8 pb-10">
                   <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-[10px] uppercase font-mono tracking-wider">{tag}</span>
                      ))}
                   </div>
                   <h2 className="text-3xl font-medium tracking-tight mb-2">{selectedProject.title}</h2>
                   <p className="text-sm text-[var(--color-paper-dim)] line-clamp-2 leading-relaxed">{selectedProject.tagline}</p>
                </div>
             </div>
           ) : (
             <div className="w-full h-full overflow-y-auto p-8 relative">
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
                        <p className="text-base leading-relaxed font-light text-balance text-[var(--color-paper-dim)] italic">"The interface should be a silent partner, not a noisy decoration."</p>
                    </div>
                </div>
             </div>
           )}
           <div className="absolute bottom-4 left-4 z-20 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-paper)] opacity-20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-paper)]"></div>
           </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-[var(--color-paper)] border-t border-[var(--color-paper-dark)]/20 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="sticky top-0 bg-[var(--color-paper)]/95 backdrop-blur-sm z-30 px-6 py-3 border-b border-[var(--color-paper-dark)]/10 flex items-center justify-between">
             <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-50">Selected Works</span>
             <span className="font-mono text-xs text-[var(--color-ink)] opacity-30">{PROJECTS.length}</span>
          </div>
          <div className="h-full overflow-y-auto p-4 pb-32 space-y-3">
             {PROJECTS.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} onClick={() => handleCardClick(project.id)} onHover={() => {}} isActive={selectedProjectId === project.id} onNavigate={onNavigate} />
             ))}
          </div>
      </div>
    </div>
  );
};
