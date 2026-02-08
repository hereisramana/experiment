
import React, { useState } from 'react';
import { PROJECTS, SKILLS, ABOUT_TEXT } from '../constants';
import { ProjectCard } from './ProjectCard';
import { Mail, Phone, Github } from 'lucide-react';

interface MobileHomeProps {
  onNavigate: (projectId: string) => void;
}

type Tab = 'WORKS' | 'ABOUT';

export const MobileHome: React.FC<MobileHomeProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('WORKS');

  const baseIconBtnStyle = "p-2 rounded-[var(--radius-sm)] border border-[var(--color-paper-dark)]/30 text-[var(--color-ink)] transition-all active:scale-90 active:text-white touch-manipulation flex items-center justify-center w-9 h-9";

  return (
    <div className="min-h-[100dvh] w-full bg-[var(--color-paper)] flex flex-col">
       {/* Header */}
       <div className="flex justify-between items-center px-6 py-6 border-b border-[var(--color-paper-dark)]/10 bg-[var(--color-paper)]">
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

       {/* Hero - Common */}
       <div className="px-6 pt-8 pb-6 bg-[var(--color-paper)]">
          <h2 className="text-3xl font-medium tracking-tight leading-[1.05] mb-4 text-[var(--color-ink)]">Product Designer & Technologist.</h2>
          <p className="text-lg text-[var(--color-ink-subtle)] leading-relaxed max-w-[90%]">Specializing in calm interactive systems and technical clarity.</p>
       </div>

       {/* Sticky Toggle Bar */}
       <div className="sticky top-0 z-30 bg-[var(--color-paper)]/95 backdrop-blur-sm border-b border-[var(--color-paper-dark)]/20 px-6 flex gap-8">
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
       <div className="flex-1 p-4 pb-24 bg-[var(--color-paper)]">
          {activeTab === 'WORKS' ? (
             <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-500">
                {PROJECTS.map((project, idx) => (
                   <ProjectCard 
                     key={project.id} 
                     project={project} 
                     index={idx} 
                     onClick={() => onNavigate(project.id)} 
                     onHover={() => {}}
                     // Passing isActive as false to keep it in "list mode" without the extra button, user simply clicks card
                     isActive={false}
                   />
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

                <div className="pt-8 border-t border-[var(--color-paper-dark)]/20">
                     <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4 text-[var(--color-ink)]">Status</p>
                     <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-[var(--color-ink)]">Open for opportunities</span>
                     </div>
                </div>
             </div>
          )}
       </div>
    </div>
  );
};
