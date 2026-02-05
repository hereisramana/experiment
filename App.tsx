import React, { useState } from 'react';
import { PROJECTS, SKILLS } from './constants';
import { ViewState } from './types';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { X } from 'lucide-react';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setView('PROJECT_DETAIL');
  };

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);
  const hoveredProject = PROJECTS.find(p => p.id === hoveredProjectId);

  // Render Detailed View
  if (view === 'PROJECT_DETAIL' && currentProject) {
    return (
      <ProjectDetail 
        project={currentProject} 
        onBack={() => {
          setView('HOME');
          setSelectedProjectId(null);
        }} 
      />
    );
  }

  // Render Index/Home View
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-accent-light)] flex flex-col">
      
      {/* HEADER */}
      <header className="px-4 md:px-12 py-8 flex justify-between items-baseline">
        <h1 className="font-mono text-sm uppercase tracking-widest font-bold text-[var(--color-ink)]">
          Ramana Design<span className="opacity-40">.Tech</span>
        </h1>
        <div className="flex gap-6">
           <div className="hidden md:flex gap-1 items-center">
             <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse opacity-50"></div>
             <span className="font-mono text-xs uppercase tracking-wide opacity-50">Available for 2024</span>
           </div>
           <button onClick={() => setIsContactOpen(true)} className="font-mono text-xs uppercase opacity-60 hover:opacity-100 underline decoration-[var(--color-paper-dark)] underline-offset-4 hover:decoration-[var(--color-accent)] transition-all">
             Contact
           </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-4 px-4 md:px-8 pb-8">
        
        {/* LEFT: Project Index - "The List" */}
        <div className="w-full lg:w-7/12 py-4 md:py-8 lg:pr-12 flex flex-col">
          <div className="mb-12 md:mb-24 mt-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-6 text-[var(--color-ink)]">
              Senior Product Designer & Technologist.
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-ink-subtle)] max-w-md leading-relaxed">
              Specializing in calm interactive systems and technical clarity.
            </p>
          </div>

          <div className="mt-auto">
             <div className="flex items-end justify-between border-b border-[var(--color-paper-dark)] pb-3 mb-2 mx-4 md:mx-6">
                <span className="font-mono text-xs uppercase tracking-widest opacity-40">Index</span>
                <span className="font-mono text-xs uppercase tracking-widest opacity-40">Select Work</span>
             </div>
             <div>
                {PROJECTS.map((project, idx) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={idx}
                    onClick={handleProjectClick}
                    onHover={setHoveredProjectId}
                  />
                ))}
             </div>
          </div>
        </div>

        {/* RIGHT: Preview / Info Panel (Floating Sheet) */}
        <div className="hidden lg:flex lg:w-5/12 bg-[var(--color-paper-dim)] rounded-[var(--radius-lg)] relative overflow-hidden flex-col justify-between shadow-sm">
           
           {/* Contextual Preview */}
           {hoveredProject ? (
              <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end animate-in fade-in duration-500 ease-soft">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-paper-dim)] via-transparent to-transparent z-10 opacity-80" />
                  <img 
                    src={hoveredProject.heroUrl} 
                    className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-multiply grayscale contrast-125"
                    alt="" 
                  />
                  <div className="relative z-20">
                     <h2 className="text-5xl font-medium tracking-tight mb-4 text-[var(--color-ink)]">{hoveredProject.title}</h2>
                     <p className="text-xl font-light opacity-70 text-balance">{hoveredProject.tagline}</p>
                     <div className="mt-8 flex gap-2">
                        {hoveredProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[var(--color-paper)] border border-[var(--color-paper-dark)] rounded-[var(--radius-sm)] font-mono text-[10px] uppercase opacity-70">
                            {tag}
                          </span>
                        ))}
                     </div>
                  </div>
              </div>
           ) : (
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                 {/* Default State: About/Skills */}
                 <div className="space-y-12 max-w-sm">
                    {SKILLS.slice(0, 2).map((group) => (
                       <div key={group.category}>
                          <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-40 border-b border-[var(--color-paper-dark)] pb-2">{group.category}</h3>
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                             {group.items.map(item => (
                               <li key={item} className="text-sm font-medium opacity-70">{item}</li>
                             ))}
                          </ul>
                       </div>
                    ))}
                 </div>
                 
                 <div className="border-t border-[var(--color-paper-dark)] pt-8">
                    <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">Philosophy</p>
                    <p className="text-lg leading-relaxed font-light text-balance text-[var(--color-ink-subtle)]">
                      "The interface should be a silent partner, not a noisy decoration."
                    </p>
                 </div>
              </div>
           )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--color-paper-dark)] px-4 md:px-12 py-8 flex justify-between items-center bg-[var(--color-paper)]">
         <span className="font-mono text-[10px] uppercase opacity-40">
           © {new Date().getFullYear()} / Loc: San Francisco
         </span>
         <div className="flex gap-6 font-mono text-[10px] uppercase text-[var(--color-ink-subtle)]">
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Github</a>
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Read.CV</a>
         </div>
      </footer>

      {/* CONTACT MODAL (Softened Overlay) */}
      {isContactOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--color-ink)]/10 backdrop-blur-md" onClick={() => setIsContactOpen(false)}>
            <div className="bg-[var(--color-paper)] p-8 md:p-12 w-full max-w-md rounded-[var(--radius-lg)] shadow-2xl relative border border-[var(--color-paper-dark)]" onClick={e => e.stopPropagation()}>
               <button onClick={() => setIsContactOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-[var(--color-paper-dim)] rounded-full transition-colors opacity-50 hover:opacity-100">
                  <X className="w-5 h-5" />
               </button>
               <h3 className="font-mono text-xs uppercase tracking-widest mb-8 opacity-40">Transmission</h3>
               <div className="space-y-6">
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