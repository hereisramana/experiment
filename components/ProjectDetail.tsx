import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, Maximize2 } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

type TabState = 'CONTEXT' | 'PROCESS' | 'LOGIC';

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabState>('CONTEXT');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const tabs: { id: TabState; label: string }[] = [
    { id: 'CONTEXT', label: '01. Context' },
    { id: 'PROCESS', label: '02. Process' },
    { id: 'LOGIC', label: '03. Interaction' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      {/* Top Bar Navigation */}
      <div className="sticky top-0 z-50 bg-[var(--color-paper)]/80 backdrop-blur-md border-b border-[var(--color-paper-dark)] flex justify-between items-center px-4 md:px-8 h-16">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:text-[var(--color-accent)] transition-colors text-[var(--color-ink)]"
        >
          <ArrowLeft className="w-3 h-3" />
          Index
        </button>
        <span className="font-mono text-xs uppercase tracking-wider hidden md:block opacity-50 text-[var(--color-ink)]">
          {project.title} — {project.duration}
        </span>
        <div className="w-16"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-64px)]">
        
        {/* LEFT COLUMN: Switchboard & Meta (Sticky) - DARK MASS */}
        <div className="lg:col-span-4 bg-[var(--color-ink)] text-[var(--color-paper)] flex flex-col justify-between p-6 md:p-12 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1] text-[var(--color-paper)]">
              {project.title}
            </h1>
            <p className="text-lg text-[var(--color-paper-dim)] leading-relaxed mb-12 max-w-sm">
              {project.tagline}
            </p>

            {/* Switchboard Navigation (Inverted) */}
            <nav className="flex flex-col gap-2 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center justify-between py-3 px-4 text-left font-mono text-xs uppercase tracking-widest rounded-[var(--radius-sm)]
                    transition-all duration-300 ease-soft
                    ${activeTab === tab.id 
                      ? 'bg-[var(--color-paper)] text-[var(--color-ink)] font-medium shadow-sm' 
                      : 'text-[var(--color-paper-dark)] hover:bg-[var(--color-paper-dark)]/20 hover:text-[var(--color-paper)]'}
                  `}
                >
                  {tab.label}
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeTab === tab.id ? 'bg-[var(--color-ink)]' : 'bg-transparent'}`} />
                </button>
              ))}
            </nav>

            <div className="grid grid-cols-2 gap-y-6 font-mono text-[11px] uppercase tracking-wider text-[var(--color-paper-dark)]">
              <div>
                <span className="block opacity-40 mb-1">Role</span>
                <span className="text-[var(--color-paper)]">{project.role}</span>
              </div>
              <div>
                <span className="block opacity-40 mb-1">Focus</span>
                <span className="text-[var(--color-paper)]">{project.tags[0]}</span>
              </div>
              <div>
                 <span className="block opacity-40 mb-1">Live</span>
                 {project.liveUrl ? (
                   <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[var(--color-paper)] text-[var(--color-paper-dim)] transition-colors">
                     View <ArrowUpRight className="w-3 h-3" />
                   </a>
                 ) : (
                   <span>N/A</span>
                 )}
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 pt-6 lg:pt-0">
             <div className="font-mono text-[10px] opacity-30 uppercase text-[var(--color-paper)]">
                ID: {project.id.toUpperCase()}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content (Swappable) - LIGHT SURFACE */}
        <div className="lg:col-span-8 bg-[var(--color-paper)] p-6 md:p-12 lg:p-24 overflow-y-auto">
          
          <div className="max-w-3xl mx-auto animate-in fade-in duration-500 ease-soft">
            
            {/* CONTENT: CONTEXT */}
            {activeTab === 'CONTEXT' && (
              <div className="space-y-16">
                 {/* Hero Visual */}
                 <div className="w-full aspect-video bg-[var(--color-paper-dim)] rounded-[var(--radius-md)] overflow-hidden relative border border-[var(--color-paper-dark)] shadow-sm">
                    {project.videoUrl ? (
                        <video src={project.videoUrl} autoPlay muted loop className="w-full h-full object-cover opacity-90" />
                    ) : (
                        <img src={project.heroUrl} alt="" className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply" />
                    )}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-12">
                        <h3 className="font-mono text-xs uppercase tracking-widest mb-6 opacity-40">The Brief</h3>
                        <p className="text-2xl md:text-3xl leading-snug font-light text-balance text-[var(--color-ink)]">
                          {project.description}
                        </p>
                    </div>
                 </div>
              </div>
            )}

            {/* CONTENT: PROCESS */}
            {activeTab === 'PROCESS' && (
               <div className="space-y-24">
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-[var(--color-paper-dark)] pb-12">
                     <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-40">[01] Challenge</h3>
                        <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.challenge}</p>
                     </div>
                     <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-40">[02] Solution</h3>
                        <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.solution}</p>
                     </div>
                  </section>
                  
                  <section>
                    <div className="bg-[var(--color-paper-dim)] p-8 rounded-[var(--radius-md)] border border-[var(--color-paper-dark)] mb-8">
                       <span className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4 block">Process Artifact</span>
                       <div className="aspect-[4/3] bg-[var(--color-paper)] rounded-[var(--radius-sm)] flex items-center justify-center border border-[var(--color-paper-dark)]">
                          <span className="font-mono text-xs opacity-30">Wireframe / Sketch Placeholder</span>
                       </div>
                    </div>
                  </section>
               </div>
            )}

            {/* CONTENT: LOGIC */}
            {activeTab === 'LOGIC' && (
              <div className="space-y-16">
                 <div className="flex items-start gap-6">
                    <Maximize2 className="w-6 h-6 mt-1 flex-shrink-0 opacity-50" />
                    <p className="text-xl md:text-2xl leading-relaxed text-[var(--color-ink)]">
                      {project.interactionNotes}
                    </p>
                 </div>

                 <div className="p-8 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-[var(--radius-md)] shadow-lg">
                    <h3 className="font-mono text-xs uppercase tracking-widest mb-6 opacity-60 text-[var(--color-paper)]">System Outcome</h3>
                    <p className="text-lg md:text-xl font-light">
                      "{project.outcome}"
                    </p>
                 </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};