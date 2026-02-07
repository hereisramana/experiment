import React, { useRef, useState } from 'react';
import { PROJECTS, SKILLS } from '../constants';
import { ProjectCard } from './ProjectCard';
import { X, Globe, ArrowRight, ArrowLeft } from 'lucide-react';

interface MobileHomeProps {
  onNavigate: (projectId: string) => void;
  setIsContactOpen: (isOpen: boolean) => void;
}

type PaneMode = 'ABOUT' | 'PROJECT';

export const MobileHome: React.FC<MobileHomeProps> = ({ onNavigate, setIsContactOpen }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePane, setActivePane] = useState<0 | 1>(0);
  const [mode, setMode] = useState<PaneMode>('ABOUT');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  const scrollToPane = (index: 0 | 1) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth'
      });
      setActivePane(index);
    }
  };

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setMode('PROJECT');
    scrollToPane(1);
  };

  const handleAboutClick = () => {
    setMode('ABOUT');
    scrollToPane(1);
  };

  const handleBack = () => {
    scrollToPane(0);
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen w-screen overflow-x-auto snap-x snap-mandatory flex no-scrollbar bg-[var(--color-paper)]"
    >
      {/* PANE 1: WHITE (Home) */}
      <div className="min-w-full w-full h-full snap-start overflow-y-auto flex flex-col p-6 pt-24 pb-12 relative">
          
          {/* Header Clone */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-[var(--color-paper)] z-10 border-b border-[var(--color-paper-dark)]/10">
             <h1 className="font-mono text-sm font-bold text-[var(--color-ink)] lowercase tracking-tight">
                ramanadesign.tech
             </h1>
             <button 
               onClick={() => setIsContactOpen(true)}
               className="text-[10px] uppercase font-semibold tracking-widest text-[var(--color-ink)] border border-[var(--color-paper-dark)]/30 px-3 py-1.5 rounded-[var(--radius-sm)]"
             >
               Contact
             </button>
          </div>

          <div className="mt-8 mb-12">
            <h2 className="text-4xl font-medium tracking-tight leading-[1.05] mb-4 text-[var(--color-ink)]">
              Product Designer & Technologist.
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-[var(--color-ink-subtle)] leading-relaxed">
                Specializing in calm interactive systems and technical clarity.
              </p>
              
              {/* The "About Me" CTA */}
              <button 
                onClick={handleAboutClick}
                className="group flex items-center gap-2 text-xs uppercase font-medium tracking-widest text-[var(--color-ink)] bg-[var(--color-paper-dim)]/50 hover:bg-[var(--color-accent)] hover:text-white px-4 py-3 rounded-[var(--radius-sm)] transition-all"
              >
                <span>More About Me</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="mt-auto">
             <div className="flex items-baseline gap-2 pb-4 mb-2 border-b border-[var(--color-ink)]/10">
                <h3 className="text-lg font-medium tracking-tight">Projects</h3>
                <span className="font-mono text-xs opacity-40 align-super">({PROJECTS.length})</span>
             </div>
             <div className="flex flex-col gap-4">
                {PROJECTS.map((project, idx) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={idx}
                    onClick={() => handleProjectClick(project.id)}
                    onHover={() => {}} // No-op on mobile
                  />
                ))}
             </div>
          </div>
      </div>

      {/* PANE 2: BLACK (Content) */}
      <div className="min-w-full w-full h-full snap-start overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)] relative flex flex-col">
         
         {/* Back Navigation for Pane 2 */}
         <div className="absolute top-6 left-6 z-30">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-[var(--color-paper)] opacity-60 hover:opacity-100 transition-opacity"
            >
               <ArrowLeft className="w-4 h-4" />
               <span className="text-[10px] uppercase tracking-widest font-mono">Back to Home</span>
            </button>
         </div>

         {mode === 'ABOUT' ? (
             <div className="h-full overflow-y-auto p-8 pt-24">
                 <div className="space-y-12 max-w-sm mx-auto">
                    {SKILLS.map((group) => (
                       <div key={group.category}>
                          <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-50 border-b border-[var(--color-paper-dim)]/20 pb-2 text-[var(--color-paper-dark)]">{group.category}</h3>
                          <ul className="grid grid-cols-1 gap-y-3">
                             {group.items.map(item => (
                               <li key={item} className="text-base font-medium opacity-80">{item}</li>
                             ))}
                          </ul>
                       </div>
                    ))}
                    
                    <div className="border-t border-[var(--color-paper-dim)]/20 pt-8 relative pb-12">
                        <Globe className="absolute top-8 right-0 w-12 h-12 text-[var(--color-paper-dark)] opacity-10" />
                        <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 text-[var(--color-paper-dark)]">Philosophy</p>
                        <p className="text-lg leading-relaxed font-light text-balance text-[var(--color-paper-dim)]">
                          "The interface should be a silent partner, not a noisy decoration."
                        </p>
                    </div>
                 </div>
             </div>
         ) : (
            // PROJECT PREVIEW MODE
            selectedProject && (
              <div className="h-full relative flex flex-col">
                  {/* Hero Image Area */}
                  <div className="flex-1 relative overflow-hidden bg-black/20">
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] to-transparent z-10 opacity-80" />
                      <img 
                        src={selectedProject.heroUrl} 
                        className="w-full h-full object-cover opacity-60"
                        alt=""
                      />
                      {/* Floating tilted card effect (simplified for mobile) */}
                      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
                         <div className="w-[80%] aspect-video bg-black/50 border border-white/10 rotate-[-5deg] scale-110 shadow-2xl rounded-lg backdrop-blur-sm transform translate-y-8" />
                      </div>
                  </div>

                  {/* Content Area */}
                  <div className="relative z-20 p-8 pb-12 bg-[var(--color-ink)] -mt-12">
                     <div className="mb-6">
                        <h2 className="text-4xl font-medium tracking-tight text-[var(--color-paper)] mb-2">{selectedProject.title}</h2>
                        <p className="text-lg font-light opacity-80 text-[var(--color-paper-dim)] leading-snug">{selectedProject.tagline}</p>
                     </div>
                     
                     <div className="flex flex-wrap gap-2 mb-8">
                        {selectedProject.tags.slice(0,3).map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[var(--color-paper)]/10 text-[var(--color-paper)] rounded-[var(--radius-sm)] font-mono text-[10px] uppercase border border-white/10">
                            {tag}
                          </span>
                        ))}
                     </div>

                     <button 
                       onClick={() => onNavigate(selectedProject.id)}
                       className="w-full py-4 bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[var(--radius-sm)] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[var(--color-accent)] hover:text-white transition-colors flex items-center justify-center gap-3"
                     >
                       <span>View Case Study</span>
                       <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
              </div>
            )
         )}
      </div>
    </div>
  );
};