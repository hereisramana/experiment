import React, { useState, useEffect } from 'react';
import { PROJECTS, SKILLS } from './constants';
import { ViewState } from './types';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { X, Globe, Github } from 'lucide-react';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Handle Browser History Navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('project');
      
      if (projectId) {
        setSelectedProjectId(projectId);
        setView('PROJECT_DETAIL');
      } else {
        setSelectedProjectId(null);
        setView('HOME');
      }
    };

    // Initial check on load
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleProjectClick = (id: string) => {
    const newUrl = `?project=${id}`;
    window.history.pushState({ projectId: id }, '', newUrl);
    setSelectedProjectId(id);
    setView('PROJECT_DETAIL');
  };

  const handleBack = () => {
    // If there is history, go back (native browser behavior)
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback if opened directly
      window.history.replaceState(null, '', '/');
      setSelectedProjectId(null);
      setView('HOME');
    }
  };

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);
  const hoveredProject = PROJECTS.find(p => p.id === hoveredProjectId);

  // Render Detailed View
  if (view === 'PROJECT_DETAIL' && currentProject) {
    return (
      <ProjectDetail 
        project={currentProject} 
        onBack={handleBack} 
      />
    );
  }

  // Render Index/Home View
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-accent-light)] flex flex-col relative overflow-x-hidden">
      
      {/* Skip Navigation Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] font-mono text-xs rounded-[var(--radius-sm)]"
      >
        Skip to main content
      </a>

      {/* Global Analog Noise Overlay */}
      <div className="bg-noise"></div>

      {/* HEADER: Action Bar */}
      <header className="px-4 md:px-12 py-6 md:py-8 flex items-center justify-between border-b border-transparent relative z-20 shrink-0">
        <div className="flex-1">
          <h1 className="font-mono text-sm font-bold text-[var(--color-ink)] lowercase tracking-tight">
            ramanadesign.tech
          </h1>
        </div>
        
        <div className="flex-1 flex justify-center hidden md:flex">
           <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium opacity-50">
             Portfolio
           </span>
        </div>

        <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="group text-[10px] uppercase font-semibold tracking-widest text-[var(--color-ink)] hover:text-white transition-colors border border-[var(--color-paper-dark)]/30 px-4 py-2 rounded-[var(--radius-sm)] flex items-center gap-2 hover:bg-[#2B6B7C] hover:border-[#2B6B7C]"
            >
              Contact Me
            </button>
            <div className="flex gap-2 text-[var(--color-ink)]">
              <a href="#" className="p-2 hover:bg-[#333333] hover:text-white rounded-[var(--radius-sm)] transition-all group" aria-label="Github">
                <Github className="w-4 h-4 opacity-60 group-hover:opacity-100" />
              </a>
              <a 
                href="#" 
                className="p-2 hover:bg-[#0077b5] hover:text-white rounded-[var(--radius-sm)] transition-all group flex items-center justify-center w-8 h-8" 
                aria-label="LinkedIn"
              >
                <span 
                  className="text-[15px] font-bold leading-none opacity-80 group-hover:opacity-100 pb-0.5" 
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
                >
                  in
                </span>
              </a>
            </div>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex flex-col lg:flex-row gap-4 px-4 md:px-8 pb-4 md:pb-8 relative z-10">
        
        {/* LEFT: Content */}
        <div className="w-full lg:w-7/12 py-4 lg:py-8 lg:pr-12 flex flex-col justify-center">
          
          {/* HERO SECTION - Tighter margins for 16:10 screens */}
          <div className="mb-12 lg:mb-20 mt-2 relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-4 md:mb-6 text-[var(--color-ink)]">
              Product Designer & Technologist.
            </h2>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-[var(--color-ink-subtle)] max-w-md leading-relaxed">
                Specializing in calm interactive systems and technical clarity.
              </p>
            </div>
          </div>

          {/* PROJECT LIST */}
          <div className="mt-auto">
             <div className="flex items-baseline gap-2 pb-4 md:pb-6 mb-2 border-b border-[var(--color-ink)]/10">
                <h3 className="text-lg font-medium tracking-tight">Projects</h3>
                <span className="font-mono text-xs opacity-40 align-super">({PROJECTS.length})</span>
             </div>
             
             <div className="flex flex-col gap-4 md:gap-6">
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

        {/* RIGHT: Preview / Info Panel (Floating Sheet) - DARK MASS */}
        <div className="hidden lg:flex lg:w-5/12 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-[var(--radius-lg)] relative overflow-hidden flex-col justify-between shadow-sm group min-h-[500px]">
           
           {/* Contextual Preview */}
           {hoveredProject ? (
              <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end animate-in fade-in duration-500 ease-soft overflow-hidden">
                  
                  {/* OPTION 2 Implementation: The "Hero Component" Macro Shot */}
                  <div className="absolute inset-0 bg-[var(--color-ink)] overflow-hidden">
                      {/* Ambient light for depth */}
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[var(--color-accent)]/10 to-transparent opacity-50" />
                      
                      {/* The Floating Component Container */}
                      <div className="absolute inset-0 flex items-center justify-center perspective-[2000px]">
                          <div className="relative w-[120%] h-[120%] transform rotate-[-12deg] translate-x-8 translate-y-12 scale-110 shadow-2xl transition-transform duration-1000 ease-out group-hover:rotate-[-10deg] group-hover:scale-[1.15] group-hover:translate-y-8">
                              {/* The Image - Full Color, No Filters */}
                              <img 
                                src={hoveredProject.heroUrl} 
                                className="w-full h-full object-cover rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[var(--color-paper)]/10"
                                alt="Interface Detail" 
                              />
                              
                              {/* Specular Highlight/Gloss */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none rounded-xl" />
                          </div>
                      </div>
                  </div>
                  
                  {/* Text Scrim - Gradient to ensure text pop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent z-10" />
                  
                  <div className="relative z-20 pointer-events-none">
                     <div className="flex justify-between items-baseline mb-2">
                       <h2 className="text-5xl font-medium tracking-tight text-[var(--color-paper)]">{hoveredProject.title}</h2>
                     </div>
                     <p className="text-xl font-light opacity-80 text-balance text-[var(--color-paper-dim)]">{hoveredProject.tagline}</p>
                     <div className="mt-8 flex gap-2">
                        {hoveredProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[var(--radius-sm)] font-mono text-[10px] uppercase">
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
                          <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-50 border-b border-[var(--color-paper-dim)]/20 pb-2 text-[var(--color-paper-dark)]">{group.category}</h3>
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                             {group.items.map(item => (
                               <li key={item} className="text-sm font-medium opacity-80 hover:text-[var(--color-paper)] hover:opacity-100 transition-opacity">{item}</li>
                             ))}
                          </ul>
                       </div>
                    ))}
                 </div>
                 
                 <div className="border-t border-[var(--color-paper-dim)]/20 pt-8 relative">
                    <Globe className="absolute top-8 right-0 w-12 h-12 text-[var(--color-paper-dark)] opacity-10" />
                    <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 text-[var(--color-paper-dark)]">Philosophy</p>
                    <p className="text-lg leading-relaxed font-light text-balance text-[var(--color-paper-dim)]">
                      "The interface should be a silent partner, not a noisy decoration."
                    </p>
                 </div>
              </div>
           )}
        </div>
      </main>

      {/* CONTACT MODAL */}
      {isContactOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--color-ink)]/10 backdrop-blur-md" onClick={() => setIsContactOpen(false)}>
            <div className="bg-[var(--color-paper)] p-8 md:p-12 w-full max-w-md rounded-[var(--radius-lg)] shadow-2xl relative border border-[var(--color-paper-dark)]" onClick={e => e.stopPropagation()}>
               <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-ink)]" />
               <button onClick={() => setIsContactOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-[var(--color-paper-dim)] rounded-full transition-colors opacity-50 hover:opacity-100">
                  <X className="w-5 h-5" />
               </button>
               {/* Clean, no "Transmission" label */}
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