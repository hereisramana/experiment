import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, SKILLS } from './constants';
import { ViewState } from './types';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { MobileHome } from './components/MobileHome';
import { X, Globe, Github, ChevronDown } from 'lucide-react';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasScrolledList, setHasScrolledList] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle Scroll Affordance
  const handleListScroll = () => {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTop > 20) {
      setHasScrolledList(true);
    } else {
      setHasScrolledList(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProjectClick = (id: string) => {
    const newUrl = `?project=${id}`;
    window.history.pushState({ projectId: id }, '', newUrl);
    setSelectedProjectId(id);
    setView('PROJECT_DETAIL');
  };

  const handleBack = () => {
    window.history.replaceState(null, '', '/');
    setSelectedProjectId(null);
    setView('HOME');
  };

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);
  const hoveredProject = PROJECTS.find(p => p.id === hoveredProjectId);

  if (view === 'PROJECT_DETAIL' && currentProject) {
    return <ProjectDetail project={currentProject} onBack={handleBack} />;
  }

  if (isMobile) {
    return <MobileHome onNavigate={handleProjectClick} />;
  }

  return (
    <div className="h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-accent-light)] flex flex-col relative overflow-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] font-mono text-xs rounded-[var(--radius-sm)]">Skip to main content</a>
      <div className="bg-noise"></div>

      <header className="px-4 md:px-12 py-6 md:py-8 flex items-center justify-between border-b border-transparent relative z-20 shrink-0">
        <div className="flex-1">
          <h1 className="font-mono text-sm font-bold text-[var(--color-ink)] lowercase tracking-tight">ramanadesign.tech</h1>
        </div>
        <div className="flex-1 justify-center hidden md:flex">
           <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium opacity-50">Portfolio</span>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            <button onClick={() => setIsContactOpen(true)} className="group text-[10px] uppercase font-semibold tracking-widest text-[var(--color-ink)] hover:text-white transition-colors border border-[var(--color-paper-dark)]/30 px-4 py-2 rounded-[var(--radius-sm)] flex items-center gap-2 hover:bg-[#2B6B7C] hover:border-[#2B6B7C]">Contact Me</button>
            <div className="flex gap-2 text-[var(--color-ink)]">
              <a href="#" className="p-2 hover:bg-[#333333] hover:text-white rounded-[var(--radius-sm)] transition-all group" aria-label="Github"><Github className="w-4 h-4 opacity-60 group-hover:opacity-100" /></a>
              <a href="#" className="p-2 hover:bg-[#0077b5] hover:text-white rounded-[var(--radius-sm)] transition-all group flex items-center justify-center w-8 h-8" aria-label="LinkedIn">
                <span className="text-[15px] font-bold leading-none opacity-80 group-hover:opacity-100 pb-0.5" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>in</span>
              </a>
            </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col lg:flex-row gap-4 px-4 md:px-8 pb-4 md:pb-8 relative z-10 overflow-hidden">
        <div className="w-full lg:w-7/12 flex flex-col lg:pr-12 h-full">
          <div className="pt-4 lg:pt-8 mb-8 lg:mb-12 shrink-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-4 md:mb-6 text-[var(--color-ink)]">Product Designer & Technologist.</h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-[var(--color-ink-subtle)] max-w-md leading-relaxed">Specializing in calm interactive systems and technical clarity.</p>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col relative">
             <div className="flex items-baseline gap-2 pb-4 mb-2 border-b border-[var(--color-ink)]/10 shrink-0">
                <h3 className="text-lg font-medium tracking-tight">Projects</h3>
                <span className="font-mono text-xs opacity-40 align-super">({PROJECTS.length})</span>
             </div>
             
             <div className="flex-1 overflow-y-auto no-scrollbar py-2 relative" ref={scrollContainerRef} onScroll={handleListScroll}>
                <div className="flex flex-col gap-4 md:gap-6 pb-24">
                   {PROJECTS.map((project, idx) => (
                     <ProjectCard key={project.id} project={project} index={idx} onClick={handleProjectClick} onHover={setHoveredProjectId} />
                   ))}
                </div>
                
                {/* Visual Scroll Hint */}
                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 pointer-events-none z-20 ${hasScrolledList ? 'opacity-0' : 'opacity-40 animate-pulse'}`}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Scroll</span>
                    <ChevronDown className="w-3 h-3" />
                </div>

                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--color-paper)] to-transparent pointer-events-none z-10" />
             </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-5/12 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-[var(--radius-lg)] relative overflow-hidden flex-col justify-between shadow-sm group h-full">
           {hoveredProject ? (
              <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end animate-in fade-in duration-500 ease-soft overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--color-ink)] overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[var(--color-accent)]/10 to-transparent opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center perspective-[2000px]">
                          <div className="relative w-[120%] h-[120%] transform rotate-[-12deg] translate-x-8 translate-y-12 scale-110 shadow-2xl transition-transform duration-1000 ease-out group-hover:rotate-[-10deg] group-hover:scale-[1.15] group-hover:translate-y-8">
                              <img src={hoveredProject.heroUrl} className="w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[var(--color-paper)]/10" alt="Interface Detail" />
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none rounded-xl" />
                          </div>
                      </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent z-10" />
                  <div className="relative z-20 pointer-events-none">
                     <div className="flex justify-between items-baseline mb-2">
                       <h2 className="text-5xl font-medium tracking-tight text-[var(--color-paper)]">{hoveredProject.title}</h2>
                     </div>
                     <p className="text-xl font-light opacity-80 text-balance text-[var(--color-paper-dim)]">{hoveredProject.tagline}</p>
                     <div className="mt-8 flex gap-2">
                        {hoveredProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[var(--radius-sm)] font-mono text-[10px] uppercase">{tag}</span>
                        ))}
                     </div>
                  </div>
              </div>
           ) : (
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                 {/* IDLE HINT */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em]">[ Hover to inspect ]</span>
                 </div>

                 <div className="space-y-12 max-w-sm relative z-10">
                    {SKILLS.slice(0, 2).map((group) => (
                       <div key={group.category}>
                          <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-50 border-b border-[var(--color-paper-dim)]/20 pb-2 text-[var(--color-paper-dark)]">{group.category}</h3>
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                             {group.items.map(item => (
                               <li key={item} className="text-sm font-medium opacity-80 hover:text-[var(--color-paper)] hover:opacity-100 transition-opacity">{item}</li>
                             ))}
                          </ul>
                       </div>
                    ))}
                 </div>
                 
                 <div className="border-t border-[var(--color-paper-dim)]/20 pt-8 relative z-10">
                    <Globe className="absolute top-8 right-0 w-12 h-12 text-[var(--color-paper-dark)] opacity-10" />
                    <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 text-[var(--color-paper-dark)]">Philosophy</p>
                    <p className="text-lg leading-relaxed font-light text-balance text-[var(--color-paper-dim)]">"The interface should be a silent partner, not a noisy decoration."</p>
                 </div>
              </div>
           )}
        </div>
      </main>

      {isContactOpen && !isMobile && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--color-ink)]/10 backdrop-blur-md" onClick={() => setIsContactOpen(false)}>
            <div className="bg-[var(--color-paper)] p-8 md:p-12 w-full max-w-md rounded-[var(--radius-lg)] shadow-2xl relative border border-[var(--color-paper-dark)]" onClick={e => e.stopPropagation()}>
               <button onClick={() => setIsContactOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-[var(--color-paper-dim)] rounded-full transition-colors opacity-50 hover:opacity-100"><X className="w-5 h-5" /></button>
               <div className="space-y-6 mt-4">
                  <div>
                     <p className="text-sm opacity-50 mb-1 font-mono uppercase text-[10px]">Email</p>
                     <a href="mailto:hello@ramanadesign.tech" className="text-xl font-medium hover:text-[var(--color-accent)] transition-colors">hello@ramanadesign.tech</a>
                  </div>
                  <div>
                     <p className="text-sm opacity-50 mb-1 font-mono uppercase text-[10px]">Phone</p>
                     <p className="text-xl font-medium">+1 (555) 123-4567</p>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
