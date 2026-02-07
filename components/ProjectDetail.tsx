import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, Play, Pause } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

type TabMode = 'VIDEO' | 'WRITTEN';

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('VIDEO');
  
  // Custom Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  const [durationStr, setDurationStr] = useState("00:00");

  useEffect(() => {
    // Reset scroll to top
    window.scrollTo(0, 0);
  }, [project.id]);

  // Video Logic
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
      setCurrentTimeStr(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDurationStr(formatTime(videoRef.current.duration));
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      // State updates are handled by onPlay/onPause listeners to ensure sync
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = x / width;
      const newTime = percentage * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  const buttonStyle = {
    '--button-hover-bg': project.accentColor || 'var(--color-accent-light)'
  } as React.CSSProperties;

  // --- SUB-COMPONENTS ---
  
  const VideoSection = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 pb-24 lg:p-12 lg:pt-24 bg-[var(--color-ink)] text-[var(--color-paper)] relative">
         {/* Back Button (Desktop Only) */}
         <button 
            onClick={onBack}
            className="hidden lg:flex absolute top-8 left-8 group items-center py-2 px-4 rounded-[var(--radius-sm)] transition-all duration-300 z-30 -ml-4 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] hover:shadow-lg hover:border-[var(--color-paper)] border border-transparent"
          >
            <span className="text-xs uppercase font-medium tracking-widest text-[var(--color-paper)] opacity-80 group-hover:opacity-100 group-hover:-translate-x-1 transition-all flex items-center gap-2">
                <ArrowLeft className="w-3 h-3 stroke-[3px]" /> Back
            </span>
          </button>

         {/* Video Container: Flex-1 on mobile to fill space, Fixed height on desktop */}
         <div className="w-full max-w-md lg:max-w-full flex-1 lg:flex-none min-h-0 lg:h-[70%] lg:aspect-auto relative mb-6 lg:mb-8 flex justify-center">
            <div className="relative w-full h-full bg-black rounded-xl border border-[var(--color-ink-subtle)]/30 shadow-2xl overflow-hidden ring-1 ring-white/10 group">
               {project.videoUrl ? (
                  <>
                    <video 
                      ref={videoRef}
                      src={project.videoUrl} 
                      className="w-full h-full object-contain opacity-95" 
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    
                    {/* CLICK SHIELD: Transparent overlay to capture touch/clicks reliably */}
                    <div 
                        className="absolute inset-0 z-10 cursor-pointer" 
                        onClick={togglePlay} 
                    />
                    
                    {/* Controls Overlay */}
                    <div className={`absolute inset-0 z-20 flex flex-col justify-end transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'}`}>
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <button 
                           className="w-16 h-16 rounded-full bg-[var(--color-paper)]/10 backdrop-blur-sm border border-[var(--color-paper)]/20 flex items-center justify-center text-white shadow-lg touch-manipulation"
                         >
                           {isPlaying ? <Pause className="w-6 h-6 fill-white stroke-none" /> : <Play className="w-6 h-6 fill-white stroke-none ml-1" />}
                         </button>
                       </div>

                       <div className="bg-black/80 backdrop-blur-md border-t border-white/10 p-3 flex items-center gap-3 pointer-events-auto" onClick={e => e.stopPropagation()}>
                          <button onClick={togglePlay} className="text-white/80 p-2 -ml-2 active:text-white active:scale-90 transition-transform" aria-label="Play/Pause">
                            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                          </button>
                          <span className="font-mono text-[10px] text-white/50 w-20 text-center">{currentTimeStr} / {durationStr}</span>
                          <div 
                            className="flex-1 h-10 flex items-center cursor-pointer group/timeline"
                            onClick={handleTimelineClick}
                          >
                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative group-active/timeline:h-2 transition-all">
                               <div 
                                 className="h-full bg-[var(--color-accent-light)] absolute top-0 left-0"
                                 style={{ width: `${progress}%` }}
                               />
                            </div>
                          </div>
                       </div>
                    </div>
                  </>
               ) : (
                  <img src={project.heroUrl} alt="Preview" className="w-full h-full object-cover" />
               )}
            </div>
         </div>
         
         {/* Button Container - Shrink-0 prevents it from being crushed, z-20 ensures clickable */}
         <div className="w-full max-w-[280px] shrink-0 z-20">
            {project.liveUrl ? (
               <a 
                 href={project.liveUrl} 
                 target="_blank" 
                 rel="noreferrer" 
                 style={buttonStyle}
                 className="group flex items-center justify-center gap-3 w-full py-4 bg-[var(--color-paper)] text-[var(--color-ink)] text-xs uppercase font-medium tracking-wider rounded-[var(--radius-sm)] hover:bg-[var(--button-hover-bg)] active:bg-[var(--button-hover-bg)] active:scale-[0.98] transition-all duration-200 shadow-lg touch-manipulation"
               >
                  <span>Launch Prototype</span>
                  <ArrowUpRight className="w-3 h-3" />
               </a>
            ) : (
               <div className="w-full py-4 border border-[var(--color-paper)]/20 text-[var(--color-paper)] text-xs uppercase font-medium tracking-wider rounded-[var(--radius-sm)] text-center opacity-50">Prototype Offline</div>
            )}
         </div>
    </div>
  );

  const WrittenSection = () => (
    <div className="h-full overflow-y-auto p-6 md:p-12 lg:p-24 no-scrollbar lg:pt-24 bg-[var(--color-paper)]">
       <div className="max-w-2xl mx-auto space-y-16 lg:space-y-20 pb-24 animate-in slide-in-from-bottom-4 duration-500">
          
          <div className="pb-8 border-b border-[var(--color-paper-dark)]">
             <h1 className="text-3xl lg:text-6xl font-medium tracking-tight mb-2 leading-[1.1] text-[var(--color-ink)]">
              {project.title} <span className="block md:inline md:text-[0.6em] text-[var(--color-ink-subtle)] font-light mt-2 md:mt-0 md:ml-2">— Case Study</span>
             </h1>
          </div>

          <section>
             <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-4">System Context</h3>
             <p className="text-lg leading-relaxed text-[var(--color-ink)]">{project.description}</p>
          </section>

          <section className="grid gap-8">
             <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-2">Architecture</h3>
             <div className="grid md:grid-cols-2 gap-8 bg-[var(--color-paper-dim)]/20 p-6 rounded-[var(--radius-md)] border border-[var(--color-paper-dark)]/50">
                <div className="space-y-2">
                   <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">Problem</span>
                   <p className="text-base leading-relaxed text-[var(--color-ink-subtle)]">{project.challenge}</p>
                </div>
                <div className="space-y-2">
                   <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">Resolution</span>
                   <p className="text-base leading-relaxed text-[var(--color-ink-subtle)]">{project.solution}</p>
                </div>
             </div>
          </section>

          <section>
             <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-6">Interaction Logic</h3>
             <div className="pl-6 border-l-2 border-[var(--color-ink)]">
                <p className="text-lg leading-relaxed text-[var(--color-ink)] italic">{project.interactionNotes}</p>
             </div>
          </section>

          <div className="pt-8">
             <button 
                className="opacity-60 hover:opacity-100 active:scale-95 transition-all cursor-pointer flex items-center gap-3 text-xs uppercase font-medium tracking-widest"
                onClick={onBack}
             >
                <ArrowLeft className="w-3 h-3" /> Back to Projects
             </button>
          </div>
       </div>
    </div>
  );

  return (
    <div className="h-[100dvh] w-screen bg-[var(--color-paper)] overflow-hidden flex flex-col lg:grid lg:grid-cols-12">
        
        {/* MOBILE HEADER: Minimalist Design */}
        <div className="shrink-0 lg:hidden flex items-center bg-[var(--color-paper)] border-b border-[var(--color-paper-dark)]/20 sticky top-0 z-50 px-4 h-14">
           {/* Left: Back */}
           <button 
             onClick={onBack}
             className="p-2 -ml-2 rounded-full hover:bg-[var(--color-paper-dim)] active:bg-[var(--color-paper-dark)] transition-colors"
             aria-label="Back"
           >
             <ArrowLeft className="w-5 h-5 text-[var(--color-ink)]" />
           </button>

           {/* Right: Tabs */}
           <div className="flex-1 flex justify-end items-center gap-6">
               <button 
                 onClick={() => setActiveTab('VIDEO')}
                 className={`
                    relative py-2 text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95
                    ${activeTab === 'VIDEO' ? 'text-[var(--color-ink)] opacity-100' : 'text-[var(--color-ink)] opacity-40 hover:opacity-80'}
                 `}
               >
                  Video Log
                  {activeTab === 'VIDEO' && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-ink)]" />
                  )}
               </button>
               
               <button 
                 onClick={() => setActiveTab('WRITTEN')}
                 className={`
                    relative py-2 text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95
                    ${activeTab === 'WRITTEN' ? 'text-[var(--color-ink)] opacity-100' : 'text-[var(--color-ink)] opacity-40 hover:opacity-80'}
                 `}
               >
                  Case Study
                  {activeTab === 'WRITTEN' && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-ink)]" />
                  )}
               </button>
           </div>
        </div>

        {/* CONTENT AREA */}
        
        {/* Left Column (Desktop) / Main View (Mobile) */}
        <div className={`
            lg:col-span-5 lg:block h-full overflow-hidden bg-[var(--color-ink)]
            ${activeTab === 'VIDEO' ? 'block flex-1' : 'hidden'}
        `}>
           <VideoSection />
        </div>

        {/* Right Column (Desktop) / Secondary View (Mobile) */}
        <div className={`
            lg:col-span-7 lg:block h-full overflow-hidden bg-[var(--color-paper)] border-l border-[var(--color-paper)]/10
            ${activeTab === 'WRITTEN' ? 'block flex-1' : 'hidden'}
        `}>
           <WrittenSection />
        </div>

    </div>
  );
};