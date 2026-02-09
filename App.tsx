import React, { useState, useEffect } from 'react';
import { PROJECTS, SKILLS, ABOUT_TEXT } from './constants';
import { ViewState, HomeRightPaneMode, DetailMode } from './types';
import { ProjectDetail } from './components/ProjectDetail';
import { MobileHome } from './components/MobileHome';
import { MobileProjectDetail } from './components/MobileProjectDetail';
import { Tooltip } from './components/Tooltip';
import { Github, X, ArrowUpRight, Copy, Check } from 'lucide-react';

/* --- Contact Card Component --- */
interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Hardcoded contact details
  const contactDetails = [
    { label: "Name", value: "Ramana Design" },
    { label: "Email", value: "hello@ramanadesign.tech" },
    { label: "Phone", value: "+1 (415) 555-0123" },
    { label: "Studio", value: "San Francisco, CA" },
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[var(--color-ink)]/20 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Card */}
      <div className="bg-[var(--color-paper)] border border-[var(--color-paper-dark)] shadow-2xl rounded-[var(--radius-lg)] w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
         
         <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-paper-dark)]/20 bg-[var(--color-paper)]">
            <span className="font-mono text-xs uppercase tracking-widest opacity-50">Contact Card</span>
            <Tooltip content="Close" position="bottom">
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-[var(--color-ink)] hover:bg-[var(--color-paper-dim)] rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </Tooltip>
         </div>

         <div className="p-2">
            {contactDetails.map((item) => (
               <div 
                 key={item.label} 
                 className="group flex items-center justify-between p-4 hover:bg-[var(--color-paper-dim)]/50 rounded-[var(--radius-md)] transition-colors select-none"
               >
                  <div className="flex flex-col gap-1">
                     <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-subtle)] opacity-60">{item.label}</span>
                     <span className="text-[var(--color-ink)] font-medium text-lg tracking-tight selection:bg-[var(--color-accent-light)] select-text">{item.value}</span>
                  </div>
                  
                  <Tooltip content="Copy to Clipboard" position="left">
                    <button 
                      onClick={() => handleCopy(item.value, item.label)}
                      className="p-2 text-[var(--color-ink)] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all hover:bg-[var(--color-paper-dark)]/20 rounded-[var(--radius-sm)]"
                      aria-label="Copy to clipboard"
                    >
                      {copiedField === item.label ? (
                          <Check className="w-4 h-4 text-[#2B6B7C]" />
                      ) : (
                          <Copy className="w-4 h-4 opacity-50" />
                      )}
                    </button>
                  </Tooltip>
               </div>
            ))}
         </div>
         
         <div className="px-6 py-4 bg-[var(--color-paper-dim)]/30 border-t border-[var(--color-paper-dark)]/10 text-center">
            <p className="text-xs text-[var(--color-ink-subtle)] opacity-60">Available for new opportunities in Q4.</p>
         </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [rightPaneMode, setRightPaneMode] = useState<HomeRightPaneMode>('PROJECTS');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [mobileDetailMode, setMobileDetailMode] = useState<DetailMode>('WRITTEN');
  const [isMobile, setIsMobile] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

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
        setView(state.view || 'HOME');
        setRightPaneMode(state.rightPaneMode || 'PROJECTS');
        setSelectedProjectId(state.projectId || null);
        if (state.mobileMode) {
            setMobileDetailMode(state.mobileMode);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial State Restoration & History Reconstruction
    const restoreState = () => {
      const params = new URLSearchParams(window.location.search);
      const pId = params.get('project');
      const v = params.get('view');
      const state = window.history.state;

      if (state) {
         // Browser restored state
         setView(state.view || 'HOME');
         setRightPaneMode(state.rightPaneMode || 'PROJECTS');
         setSelectedProjectId(state.projectId || null);
         if (state.mobileMode) setMobileDetailMode(state.mobileMode);
      } else if (pId) {
         // Deep Link Handling
         if (v === 'detail') {
            // Reconstruct History: Home -> Overview -> Detail
            const overviewUrl = `?project=${pId}&view=overview`;
            window.history.replaceState(
               { view: 'HOME', rightPaneMode: 'OVERVIEW', projectId: pId }, 
               '', 
               overviewUrl
            );
            
            // 2. Push Detail
            const detailUrl = `?project=${pId}&view=detail`;
            window.history.pushState(
               { view: 'PROJECT_DETAIL', projectId: pId }, 
               '', 
               detailUrl
            );

            setSelectedProjectId(pId);
            setView('PROJECT_DETAIL');
         } else if (v === 'overview') {
            // Set Overview
            const overviewUrl = `?project=${pId}&view=overview`;
            window.history.replaceState(
               { view: 'HOME', rightPaneMode: 'OVERVIEW', projectId: pId }, 
               '', 
               overviewUrl
            );
            setSelectedProjectId(pId);
            setRightPaneMode('OVERVIEW');
            setView('HOME');
         }
      }
    };

    restoreState();

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

  const handleLaunchDeepDive = (id: string, mobileMode?: DetailMode) => {
    // Inject "Overview" state into history before pushing Detail
    // This ensures "Back" returns to the Overview pane.
    const overviewUrl = `?project=${id}&view=overview`;
    window.history.pushState(
       { view: 'HOME', rightPaneMode: 'OVERVIEW', projectId: id }, 
       '', 
       overviewUrl
    );

    const detailUrl = `?project=${id}&view=detail`;
    window.history.pushState(
       { view: 'PROJECT_DETAIL', projectId: id, mobileMode }, 
       '', 
       detailUrl
    );
    
    setSelectedProjectId(id);
    if (mobileMode) setMobileDetailMode(mobileMode);
    setView('PROJECT_DETAIL');
  };

  const handleCloseOverview = () => {
    setRightPaneMode('PROJECTS');
    setSelectedProjectId(null);
    // Optional: clear URL params if we want to return to clean URL
    window.history.pushState(null, '', window.location.pathname);
  };

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);

  // --- RENDERING ---

  if (isMobile) {
    if (view === 'PROJECT_DETAIL' && currentProject) {
        return <MobileProjectDetail 
                  project={currentProject} 
                  mode={mobileDetailMode} 
                  onBack={() => {
                      // We go back in history, which should pop state to overview
                      window.history.back();
                  }} 
               />
    }

    return (
      <MobileHome 
        onNavigate={(id, mode) => {
          if (mode) handleLaunchDeepDive(id, mode);
          else setSelectedProjectId(id);
        }} 
        selectedProjectId={selectedProjectId} 
        onCloseOverview={() => setSelectedProjectId(null)} 
      />
    );
  }

  // Desktop View
  if (view === 'PROJECT_DETAIL' && currentProject) {
    return <ProjectDetail project={currentProject} onBack={() => window.history.back()} />;
  }

  return (
    <div className="h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-accent-light)] flex flex-col relative overflow-hidden">
      <div className="bg-noise"></div>

      {/* Contact Modal Layer */}
      {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}

      <header className="px-12 py-8 flex items-center justify-between relative z-20 shrink-0">
        <div className="flex-1">
          <h1 className="font-mono text-sm font-bold text-[var(--color-ink)] lowercase tracking-tight">ramanadesign.tech</h1>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="group text-[10px] uppercase font-semibold tracking-widest text-[var(--color-ink)] hover:text-white transition-colors border border-[var(--color-paper-dark)]/30 px-4 py-2 rounded-[var(--radius-sm)] flex items-center gap-2 hover:bg-[#2B6B7C] hover:border-[#2B6B7C]"
            >
              Contact Me
            </button>
            <div className="flex gap-1">
              <Tooltip content="View GitHub Profile" position="bottom">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 hover:bg-[#333333] hover:text-white rounded-[var(--radius-sm)] transition-all flex items-center justify-center w-8 h-8" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
              </Tooltip>
              <Tooltip content="View LinkedIn Profile" position="bottom-right">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 hover:bg-[#0077b5] hover:text-white rounded-[var(--radius-sm)] transition-all group flex items-center justify-center w-8 h-8" aria-label="LinkedIn">
                  <span className="text-[15px] font-bold leading-none opacity-80 group-hover:opacity-100 pb-0.5" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>in</span>
                </a>
              </Tooltip>
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

           <div className="flex-1 overflow-y-auto relative">
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
                       <Tooltip content="Close Overview" position="bottom-right">
                         <button onClick={handleCloseOverview} className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-5 h-5" />
                         </button>
                       </Tooltip>
                    </div>
                    <div className="flex-1 overflow-y-auto">
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
                          <span className="text-xs uppercase font-bold tracking-[0.2em]">Video Demo & Case Study</span>
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
