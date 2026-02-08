import React, { useState, useEffect } from 'react';
import { PROJECTS, SKILLS, ABOUT_TEXT } from './constants';
import { ViewState, HomeRightPaneMode } from './types';
import { ProjectDetail } from './components/ProjectDetail';
import { MobileHome } from './components/MobileHome';
import { Github, Phone, X, ArrowUpRight, Play, FileText } from 'lucide-react';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [rightPaneMode, setRightPaneMode] = useState<HomeRightPaneMode>('PROJECTS');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (!state) {
        setView('HOME');
        setRightPaneMode('PROJECTS');
        setSelectedProjectId(null);
      } else {
        setView(state.view);
        setRightPaneMode(state.rightPaneMode || 'PROJECTS');
        setSelectedProjectId(state.projectId);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleProjectClick = (id: string) => {
    if (isMobile) {
      // Mobile Overview handled within MobileHome
      setSelectedProjectId(id);
    } else {
      setSelectedProjectId(id);
      setRightPaneMode('OVERVIEW');
    }
  };

  const handleLaunchDeepDive = (id: string) => {
    const newUrl = `?project=${id}&view=detail`;
    window.history.pushState({ view: 'PROJECT_DETAIL', projectId: id }, '', newUrl);
    setSelectedProjectId(id);
    setView('PROJECT_DETAIL');
  };

  const handleCloseOverview = () => {
    setRightPaneMode('PROJECTS');
    setSelectedProjectId(null);
  };

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);

  if (view === 'PROJECT_DETAIL' && currentProject) {
    return <ProjectDetail project={currentProject} onBack={() => window.history.back()} />;
  }

  if (isMobile) {
    return (
      <MobileHome 
        onNavigate={(id, mode) => {
          if (mode) handleLaunchDeepDive(id);
          else setSelectedProjectId(id);
        }} 
        selectedProjectId={selectedProjectId} 
        onCloseOverview={() => setSelectedProjectId(null)} 
      />
    );
  }

  return (
    <div className="h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-accent-light)] flex flex-col relative overflow-hidden">
      <div className="bg-noise"></div>

      <header className="px-12 py-8 flex items-center justify-between relative z-20 shrink-0">
        <div className="flex-1">
          <h1 className="font-mono text-sm font-bold text-[var(--color-ink)] lowercase tracking-tight">ramanadesign.tech</h1>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
            <button className="group text-[10px] uppercase font-semibold tracking-widest text-[var(--color-ink)] hover:text-white transition-colors border border-[var(--color-paper-dark)]/30 px-4 py-2 rounded-[var(--radius-sm)] flex items-center gap-2 hover:bg-[#2B6B7C] hover:border-[#2B6B7C]">Contact Me</button>
            <div className="flex gap-1">
              <a href="tel:+1234567890" className="p-2 hover:bg-[#333333] hover:text-white rounded-[var(--radius-sm)] transition-all flex items-center justify-center w-8 h-8" aria-label="Phone">
                <Phone className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 hover:bg-[#333333] hover:text-white rounded-[var(--radius-sm)] transition-all flex items-center justify-center w-8 h-8" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 hover:bg-[#333333] hover:text-white rounded-[var(--radius-sm)] transition-all group flex items-center justify-center w-8 h-8" aria-label="LinkedIn">
                <span className="text-[15px] font-bold leading-none opacity-80 group-hover:opacity-100 pb-0.5" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>in</span>
              </a>
            </div>
        </div>
      </header>

      <main className="flex-1 flex gap-4 px-8 pb-8 relative z-10 overflow-hidden">
        {/* Left Side: Static Content */}
        <div className="w-5/12 flex flex-col pr-12 h-full">
          <div className="pt-8 mb-12 shrink-0">
            <h2 className="text-6xl font-medium tracking-tight leading-[1.05] mb-6 text-[var(--color-ink)]">Product Designer & Technologist.</h2>
            <p className="text-xl text-[var(--color-ink-subtle)] max-w-md leading-relaxed">Specializing in calm interactive systems and technical clarity.</p>
          </div>

          <div className="mt-auto border-t border-[var(--color-paper-dark)] pt-8">
             <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 text-[var(--color-paper-dark)]">Philosophy</p>
             <p className="text-xl leading-relaxed font-light text-balance text-[var(--color-ink-subtle)]">"The interface should be a silent partner, not a noisy decoration."</p>
          </div>
        </div>

        {/* Right Side: Modular Interactive Pane */}
        <div className="w-7/12 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-[var(--radius-lg)] relative overflow-hidden flex flex-col shadow-2xl">
           
           {/* Header Navigation (Visible unless in Overview) */}
           {rightPaneMode !== 'OVERVIEW' && (
              <div className="flex justify-center gap-12 border-b border-[var(--color-paper-dim)]/10 px-8 h-16 shrink-0 bg-[var(--color-ink)] relative z-30">
                 <button 
                   onClick={() => setRightPaneMode('PROJECTS')}
                   className={`h-full flex items-center font-mono text-xs uppercase tracking-[0.2em] relative transition-colors ${rightPaneMode === 'PROJECTS' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                 >
                   Projects
                   {rightPaneMode === 'PROJECTS' && <div className="absolute bottom-0 left-0 w-full h-1 bg-white" />}
                 </button>
                 <button 
                   onClick={() => setRightPaneMode('ABOUT')}
                   className={`h-full flex items-center font-mono text-xs uppercase tracking-[0.2em] relative transition-colors ${rightPaneMode === 'ABOUT' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                 >
                   About
                   {rightPaneMode === 'ABOUT' && <div className="absolute bottom-0 left-0 w-full h-1 bg-white" />}
                 </button>
              </div>
           )}

           <div className="flex-1 overflow-y-auto no-scrollbar relative">
              {rightPaneMode === 'PROJECTS' && (
                 <div className="p-8 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {PROJECTS.map((project) => (
                       <button 
                         key={project.id} 
                         onClick={() => handleProjectClick(project.id)}
                         className="group relative flex flex-col text-left aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden border border-white/5 bg-white/5 hover:border-white/20 transition-all hover:scale-[1.02]"
                       >
                         <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity image-technical" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                         <div className="absolute bottom-6 left-6 right-6">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 block mb-1">{project.role}</span>
                            <h3 className="text-2xl font-medium tracking-tight text-white">{project.title}</h3>
                         </div>
                       </button>
                    ))}
                 </div>
              )}

              {rightPaneMode === 'ABOUT' && (
                 <div className="p-12 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
                    <div className="prose prose-invert">
                       <p className="text-xl leading-relaxed text-[var(--color-paper-dim)] font-light whitespace-pre-line">{ABOUT_TEXT.trim()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                       {SKILLS.map(group => (
                          <div key={group.category}>
                             <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4 border-b border-white/10 pb-2">{group.category}</h4>
                             <ul className="space-y-2">
                                {group.items.map(item => (
                                   <li key={item} className="text-sm font-medium opacity-80">{item}</li>
                                ))}
                             </ul>
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              {rightPaneMode === 'OVERVIEW' && currentProject && (
                 <div className="absolute inset-0 bg-[var(--color-ink)] flex flex-col animate-in fade-in slide-in-from-right-8 duration-500 z-50">
                    <div className="h-16 border-b border-white/10 px-8 flex items-center justify-between sticky top-0 bg-[var(--color-ink)] z-10">
                       <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">Project Overview</span>
                       <button onClick={handleCloseOverview} className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors">
                          <X className="w-5 h-5" />
                       </button>
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                       <div className="aspect-video w-full overflow-hidden">
                          <img src={currentProject.heroUrl} alt={currentProject.title} className="w-full h-full object-cover" />
                       </div>
                       <div className="p-12 space-y-12 pb-32">
                          <div>
                             <h2 className="text-5xl font-medium tracking-tight mb-4">{currentProject.title}</h2>
                             <p className="text-xl text-[var(--color-paper-dim)] leading-relaxed font-light">{currentProject.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                             <div className="p-6 bg-white/5 rounded-[var(--radius-md)] border border-white/10">
                                <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 mb-2">Role</p>
                                <p className="text-lg font-medium">{currentProject.role}</p>
                             </div>
                             <div className="p-6 bg-white/5 rounded-[var(--radius-md)] border border-white/10">
                                <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 mb-2">Duration</p>
                                <p className="text-lg font-medium">{currentProject.duration}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-12 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)] to-transparent">
                       <button 
                         onClick={() => handleLaunchDeepDive(currentProject.id)}
                         className="w-full py-5 bg-[var(--color-paper)] text-[var(--color-ink)] rounded-[var(--radius-sm)] flex items-center justify-center gap-3 group hover:scale-[1.01] transition-transform"
                       >
                          <span className="text-xs uppercase font-bold tracking-[0.2em]">View Case Study</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                       </button>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
};
