import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, Maximize2 } from 'lucide-react';
import { Button } from './Button';

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
    <div className="min-h-screen flex flex-col">
      {/* Top Bar Navigation */}
      <div className="sticky top-0 z-50 bg-[#FDFCF8]/90 backdrop-blur-sm border-b-ink flex justify-between items-center px-4 md:px-8 h-16">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:underline"
        >
          <ArrowLeft className="w-3 h-3" />
          Index
        </button>
        <span className="font-mono text-xs uppercase tracking-wider hidden md:block">
          {project.title} — {project.duration}
        </span>
        <div className="w-16"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-64px)]">
        
        {/* LEFT COLUMN: Switchboard & Meta (Sticky) */}
        <div className="lg:col-span-4 border-r-ink bg-[#FDFCF8] flex flex-col justify-between p-6 md:p-12 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto">
          <div>
            <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4 leading-[0.9]">
              {project.title}
            </h1>
            <p className="text-lg text-black/60 leading-tight mb-12 max-w-sm">
              {project.tagline}
            </p>

            {/* Switchboard Navigation */}
            <nav className="flex flex-col gap-0 border-t-ink border-b-ink mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center justify-between py-4 px-2 text-left font-mono text-xs uppercase tracking-widest
                    transition-all duration-200
                    ${activeTab === tab.id ? 'bg-black text-white pl-4' : 'text-black/50 hover:text-black hover:pl-4'}
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                </button>
              ))}
            </nav>

            <div className="grid grid-cols-2 gap-y-6 font-mono text-[11px] uppercase tracking-wider text-black/60">
              <div>
                <span className="block opacity-40 mb-1">Role</span>
                <span className="text-black">{project.role}</span>
              </div>
              <div>
                <span className="block opacity-40 mb-1">Focus</span>
                <span className="text-black">{project.tags[0]}</span>
              </div>
              <div>
                 <span className="block opacity-40 mb-1">Live</span>
                 {project.liveUrl ? (
                   <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-black">
                     View <ArrowUpRight className="w-3 h-3" />
                   </a>
                 ) : (
                   <span>N/A</span>
                 )}
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 pt-6 lg:pt-0">
             <div className="font-mono text-[10px] text-black/40 uppercase">
                ID: {project.id.toUpperCase()}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Content (Swappable) */}
        <div className="lg:col-span-8 bg-[#FDFCF8] p-6 md:p-12 lg:p-24 overflow-y-auto">
          
          <div className="max-w-3xl mx-auto animate-in fade-in duration-300">
            
            {/* CONTENT: CONTEXT */}
            {activeTab === 'CONTEXT' && (
              <div className="space-y-16">
                 {/* Hero Visual */}
                 <div className="w-full aspect-video bg-[#F4F2ED] border border-black/5 overflow-hidden relative">
                    {project.videoUrl ? (
                        <video src={project.videoUrl} autoPlay muted loop className="w-full h-full object-cover opacity-90" />
                    ) : (
                        <img src={project.heroUrl} alt="" className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply" />
                    )}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-12">
                        <h3 className="font-mono text-xs uppercase tracking-widest mb-6 text-black/40">The Brief</h3>
                        <p className="text-2xl md:text-3xl leading-snug font-light text-balance">
                          {project.description}
                        </p>
                    </div>
                 </div>
              </div>
            )}

            {/* CONTENT: PROCESS */}
            {activeTab === 'PROCESS' && (
               <div className="space-y-24">
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b-ink pb-12">
                     <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest mb-4 text-black/40">[01] Challenge</h3>
                        <p className="text-lg leading-relaxed">{project.challenge}</p>
                     </div>
                     <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest mb-4 text-black/40">[02] Solution</h3>
                        <p className="text-lg leading-relaxed">{project.solution}</p>
                     </div>
                  </section>
                  
                  <section>
                    <div className="bg-[#F4F2ED] p-8 border border-black/5 mb-8">
                       <span className="font-mono text-xs uppercase tracking-widest text-black/40 mb-4 block">Process Artifact</span>
                       <div className="aspect-[4/3] bg-white flex items-center justify-center border border-black/5">
                          <span className="font-mono text-xs text-black/30">Wireframe / Sketch Placeholder</span>
                       </div>
                    </div>
                  </section>
               </div>
            )}

            {/* CONTENT: LOGIC */}
            {activeTab === 'LOGIC' && (
              <div className="space-y-16">
                 <div className="flex items-start gap-6">
                    <Maximize2 className="w-6 h-6 mt-1 flex-shrink-0" />
                    <p className="text-xl md:text-2xl leading-relaxed">
                      {project.interactionNotes}
                    </p>
                 </div>

                 <div className="p-8 bg-black text-[#FDFCF8]">
                    <h3 className="font-mono text-xs uppercase tracking-widest mb-6 opacity-60">System Outcome</h3>
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