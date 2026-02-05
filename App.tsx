import React, { useState } from 'react';
import { PROJECTS, SKILLS, ABOUT_TEXT } from './constants';
import { ViewState } from './types';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { Button } from './components/Button';
import { Copy, Check, ArrowRight, X } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FDFCF8] text-[#111] selection:bg-[#111] selection:text-[#FDFCF8] flex flex-col">
      
      {/* HEADER */}
      <header className="px-4 md:px-8 py-6 flex justify-between items-baseline border-b-ink">
        <h1 className="font-mono text-sm uppercase tracking-widest font-bold">
          Ramana Design<span className="opacity-40">.Tech</span>
        </h1>
        <div className="flex gap-6">
           <div className="hidden md:flex gap-1 items-center">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="font-mono text-xs uppercase tracking-wide opacity-60">Available for 2024</span>
           </div>
           <button onClick={() => setIsContactOpen(true)} className="font-mono text-xs uppercase underline hover:no-underline">
             Contact
           </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        
        {/* LEFT: Project Index */}
        <div className="w-full md:w-1/2 lg:w-7/12 p-4 md:p-8 lg:p-12 border-r-ink flex flex-col">
          <div className="mb-12 md:mb-24 mt-12">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-[0.9] mb-6">
              Senior Product Designer & Technologist.
            </h2>
            <p className="text-lg md:text-xl text-black/60 max-w-md">
              Specializing in calm interactive systems and technical clarity.
            </p>
          </div>

          <div className="mt-auto">
             <div className="flex items-end justify-between border-b-ink pb-2 mb-0">
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

        {/* RIGHT: Preview / Info Panel (Fixed) */}
        <div className="hidden md:flex w-1/2 lg:w-5/12 bg-[#F4F2ED] relative overflow-hidden flex-col justify-between">
           
           {/* Contextual Preview */}
           {hoveredProject ? (
              <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end animate-in fade-in duration-200">
                  <img 
                    src={hoveredProject.heroUrl} 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply grayscale"
                    alt="" 
                  />
                  <div className="relative z-20">
                     <h2 className="text-6xl font-medium tracking-tighter mb-4">{hoveredProject.title}</h2>
                     <p className="text-xl font-light opacity-80">{hoveredProject.tagline}</p>
                     <div className="mt-8 flex gap-2">
                        {hoveredProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 border border-black/10 rounded-full font-mono text-[10px] uppercase bg-white/50">
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
                          <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-40 border-b border-black/10 pb-2">{group.category}</h3>
                          <ul className="grid grid-cols-2 gap-2">
                             {group.items.map(item => (
                               <li key={item} className="text-sm font-medium opacity-80">{item}</li>
                             ))}
                          </ul>
                       </div>
                    ))}
                 </div>
                 
                 <div className="border-t border-black/10 pt-8">
                    <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">Philosophy</p>
                    <p className="text-lg leading-relaxed font-light text-balance">
                      "The interface should be a silent partner, not a noisy decoration."
                    </p>
                 </div>
              </div>
           )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t-ink px-4 md:px-8 py-6 flex justify-between items-center bg-[#FDFCF8]">
         <span className="font-mono text-[10px] uppercase opacity-40">
           © {new Date().getFullYear()} / Loc: San Francisco
         </span>
         <div className="flex gap-6 font-mono text-[10px] uppercase">
            <a href="#" className="hover:underline">Github</a>
            <a href="#" className="hover:underline">LinkedIn</a>
            <a href="#" className="hover:underline">Read.CV</a>
         </div>
      </footer>

      {/* CONTACT MODAL (Simple Overlay) */}
      {isContactOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm" onClick={() => setIsContactOpen(false)}>
            <div className="bg-[#FDFCF8] p-8 md:p-12 w-full max-w-md border border-black shadow-2xl relative" onClick={e => e.stopPropagation()}>
               <button onClick={() => setIsContactOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-black/5">
                  <X className="w-5 h-5" />
               </button>
               <h3 className="font-mono text-xs uppercase tracking-widest mb-8 opacity-40">Transmission</h3>
               <div className="space-y-6">
                  <div>
                     <p className="text-sm opacity-60 mb-1">Email</p>
                     <a href="mailto:hello@ramanadesign.tech" className="text-xl font-medium hover:underline">hello@ramanadesign.tech</a>
                  </div>
                  <div>
                     <p className="text-sm opacity-60 mb-1">Phone</p>
                     <p className="text-xl font-medium">+1 (555) 123-4567</p>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};