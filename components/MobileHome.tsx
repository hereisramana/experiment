import React, { useState } from 'react';
import { PROJECTS, SKILLS, ABOUT_TEXT } from '../constants';
import { Project, DetailMode } from '../types';
import { Mail, ArrowLeft, Play, FileText, Github, Phone, X } from 'lucide-react';

interface MobileHomeProps {
  onNavigate: (projectId: string, mode?: DetailMode) => void;
  selectedProjectId: string | null;
  onCloseOverview: () => void;
}

type Tab = 'WORKS' | 'ABOUT';

export const MobileHome: React.FC<MobileHomeProps> = ({ onNavigate, selectedProjectId, onCloseOverview }) => {
  const [activeTab, setActiveTab] = useState<Tab>('WORKS');
  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) || null;

  const baseIconBtnStyle = "p-2 rounded-[var(--radius-sm)] border border-[var(--color-paper-dark)]/30 text-[var(--color-ink)] transition-all active:scale-90 flex items-center justify-center w-9 h-9 group";

  const ProjectGridTile = ({ project }: { project: Project }) => (
    <button 
      onClick={() => onNavigate(project.id)}
      className="group relative flex flex-col text-left active:scale-[0.98] transition-all duration-300"
    >
      <div className="aspect-square w-full bg-[var(--color-paper-dim)] rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-paper-dark)]/30 shadow-sm relative">
        <img 
          src={project.thumbnailUrl} 
          alt={project.title} 
          className="w-full h-full object-cover image-technical group-active:filter-none transition-all duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/70 mb-0.5">{project.role}</p>
          <h3 className="text-white font-medium text-sm leading-tight">{project.title}</h3>
        </div>
      </div>
    </button>
  );

  const ProjectInfoPane = ({ project }: { project: Project }) => (
    <div className="fixed inset-0 z-50 bg-[var(--color-paper)] flex flex-col animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="h-14 border-b border-[var(--color-paper-dark)]/20 px-4 flex items-center justify-between bg-[var(--color-paper)]">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">Project Overview</span>
        <button onClick={onCloseOverview} className="p-2 -mr-2 rounded-full active:bg-[var(--color-paper-dim)]">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Hero */}
        <div className="w-full aspect-video bg-black overflow-hidden border-b border-[var(--color-paper-dark)]/10">
          <img src={project.heroUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Info Section */}
        <div className="p-6 space-y-8">
          <div>
            <h2 className="text-3xl font-medium tracking-tight mb-2">{project.title}</h2>
            <p className="text-lg text-[var(--color-ink-subtle)] leading-relaxed">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--color-paper-dim)] rounded-[var(--radius-md)] border border-[var(--color-paper-dark)]/20">
              <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-1">Role</p>
              <p className="text-sm font-medium">{project.role}</p>
            </div>
            <div className="p-4 bg-[var(--color-paper-dim)] rounded-[var(--radius-md)] border border-[var(--color-paper-dark)]/20">
              <p className="font-mono text-[9px] uppercase tracking-widest opacity-50 mb-1">Duration</p>
              <p className="text-sm font-medium">{project.duration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Tray */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe bg-[var(--color-paper)] border-t border-[var(--color-paper-dark)]/30 shadow-[0_-8px_32px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onNavigate(project.id, 'VIDEO')}
            className="flex items-center justify-center gap-2 py-4 bg-[var(--color-paper-dim)] border border-[var(--color-paper-dark)] text-[var(--color-ink)] rounded-[var(--radius-sm)] text-xs uppercase font-bold tracking-widest active:bg-[var(--color-paper-dark)]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Video Demo</span>
          </button>
          <button 
            onClick={() => onNavigate(project.id, 'WRITTEN')}
            className="flex items-center justify-center gap-2 py-4 bg-[var(--color-paper-dim)] border border-[var(--color-paper-dark)] text-[var(--color-ink)] rounded-[var(--radius-sm)] text-xs uppercase font-bold tracking-widest active:bg-[var(--color-paper-dark)]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Case Study</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-[100dvh] w-full flex flex-col transition-colors duration-500 ${activeTab === 'ABOUT' ? 'bg-[var(--color-paper-dim)]' : 'bg-[var(--color-paper)]'}`}>
       {/* Header */}
       <div className={`flex justify-between items-center px-6 py-6 border-b border-[var(--color-paper-dark)]/10 transition-colors ${activeTab === 'ABOUT' ? 'bg-[var(--color-paper-dim)]' : 'bg-[var(--color-paper)]'}`}>
          <h1 className="font-mono text-sm font-bold text-[var(--color-ink)] lowercase tracking-tight">ramanadesign.tech</h1>
           <div className="flex items-center gap-1.5">
             <a 
               href="tel:+1234567890" 
               className={`${baseIconBtnStyle} active:bg-[#2B6B7C] active:border-[#2B6B7C] active:text-white hover:bg-[#2B6B7C] hover:border-[#2B6B7C] hover:text-white`} 
               aria-label="Phone"
             >
               <Phone className="w-4 h-4" />
             </a>
             <a 
               href="https://github.com" 
               target="_blank" 
               rel="noreferrer" 
               className={`${baseIconBtnStyle} active:bg-[#333333] active:border-[#333333] active:text-white hover:bg-[#333333] hover:border-[#333333] hover:text-white`} 
               aria-label="GitHub"
             >
               <Github className="w-4 h-4" />
             </a>
             <a 
               href="mailto:hello@ramanadesign.tech" 
               className={`${baseIconBtnStyle} active:bg-[#2B6B7C] active:border-[#2B6B7C] active:text-white hover:bg-[#2B6B7C] hover:border-[#2B6B7C] hover:text-white`} 
               aria-label="Email"
             >
               <Mail className="w-4 h-4" />
             </a>
             <a 
               href="https://linkedin.com" 
               target="_blank" 
               rel="noreferrer" 
               className={`${baseIconBtnStyle} active:bg-[#0077b5] active:border-[#0077b5] active:text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white`} 
               aria-label="LinkedIn"
             >
               <span className="text-[15px] font-bold leading-none opacity-80 active:opacity-100 pb-0.5" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>in</span>
             </a>
           </div>
       </div>

       {/* Hero - Common */}
       <div className="px-6 pt-8 pb-6">
          <h2 className="text-3xl font-medium tracking-tight leading-[1.05] mb-4 text-[var(--color-ink)]">Product Designer & Technologist.</h2>
          <p className="text-lg text-[var(--color-ink-subtle)] leading-relaxed max-w-[90%]">Specializing in calm interactive systems and technical clarity.</p>
       </div>

       {/* Sticky Toggle Bar - CENTERED */}
       <div className="sticky top-0 z-30 bg-inherit backdrop-blur-sm border-b border-[var(--color-paper-dark)]/20 px-6 flex justify-center gap-12">
          <button 
            onClick={() => setActiveTab('WORKS')} 
            className={`py-3 text-xs font-bold uppercase tracking-widest relative transition-colors ${activeTab === 'WORKS' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]/40'}`}
          >
            Works
            {activeTab === 'WORKS' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-ink)] rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('ABOUT')} 
            className={`py-3 text-xs font-bold uppercase tracking-widest relative transition-colors ${activeTab === 'ABOUT' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]/40'}`}
          >
            About
            {activeTab === 'ABOUT' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-ink)] rounded-full" />}
          </button>
       </div>

       {/* Content Area */}
       <div className="flex-1 p-4 pb-24">
          {activeTab === 'WORKS' ? (
             <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-2 duration-500">
                {PROJECTS.map((project) => (
                   <ProjectGridTile key={project.id} project={project} />
                ))}
             </div>
          ) : (
             <div className="animate-in slide-in-from-bottom-2 duration-300 space-y-12 py-4 px-2 max-w-lg">
                <div className="prose prose-stone">
                    <p className="text-base leading-relaxed text-[var(--color-ink)] whitespace-pre-line">{ABOUT_TEXT.trim()}</p>
                </div>
                
                <div className="space-y-8">
                    {SKILLS.map(group => (
                    <div key={group.category}>
                        <h3 className="font-mono text-[10px] uppercase tracking-widest mb-3 opacity-50 border-b border-[var(--color-paper-dark)]/30 pb-2 text-[var(--color-ink)]">{group.category}</h3>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {group.items.map(item => (
                                <li key={item} className="text-sm font-medium text-[var(--color-ink)] opacity-80">{item}</li>
                            ))}
                        </ul>
                    </div>
                    ))}
                </div>
             </div>
          )}
       </div>

       {/* Transformable Pane */}
       {selectedProject && <ProjectInfoPane project={selectedProject} />}
    </div>
  );
};
