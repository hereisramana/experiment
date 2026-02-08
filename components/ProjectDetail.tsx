import React, { useEffect, useRef, useState } from 'react';
import { Project, DetailMode } from '../types';
import { ArrowLeft, ArrowUpRight, Play, Pause } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  initialMode?: DetailMode;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, initialMode = 'VIDEO' }) => {
  const [activeTab, setActiveTab] = useState<DetailMode>(initialMode);
  const [isMobile, setIsMobile] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('resize', checkMobile);
  }, [project.id]);

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

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

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) videoRef.current.play();
      else videoRef.current.pause();
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  const VideoSection = () => (
    <div className="w-full h-full flex flex-col items-center bg-[var(--color-paper)] lg:bg-[var(--color-ink)] relative transition-colors duration-300">
         <button 
            onClick={onBack}
            className="hidden lg:flex absolute top-8 left-8 group items-center py-2 px-4 rounded-[var(--radius-sm)] transition-all duration-300 z-30 -ml-4 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] border border-transparent"
          >
            <span className="text-xs uppercase font-medium tracking-widest text-[var(--color-paper)] opacity-80 group-hover:opacity-100 group-hover:-translate-x-1 transition-all flex items-center gap-2">
                <ArrowLeft className="w-3 h-3 stroke-[3px]" /> Back
            </span>
          </button>

         <div className="w-full flex-1 min-h-0 relative flex justify-center items-center bg-black overflow-hidden lg:rounded-xl lg:max-w-4xl lg:h-auto lg:aspect-video lg:my-auto">
            <div className="relative w-full h-full lg:h-auto lg:aspect-video overflow-hidden group">
               {project.videoUrl ? (
                  <>
                    <video 
                      ref={videoRef}
                      src={project.videoUrl} 
                      className="w-full h-full object-contain" 
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />
                    <div className={`absolute inset-0 z-20 flex flex-col justify-end transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0 lg:group-hover:opacity-100' : 'opacity-100'}`}>
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                           {isPlaying ? <Pause className="w-6 h-6 fill-white stroke-none" /> : <Play className="w-6 h-6 fill-white stroke-none ml-1" />}
                         </button>
                       </div>
                    </div>
                    {/* Progress Bar (Always visible on mobile) */}
                    <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-auto h-12 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4 px-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                       <button onClick={togglePlay} className="text-white">
                         {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                       </button>
                       <div className="flex-1 h-1 bg-white/20 rounded-full relative overflow-hidden" onClick={handleTimelineClick}>
                         <div className="absolute left-0 top-0 h-full bg-white transition-all" style={{ width: `${progress}%` }} />
                       </div>
                       <span className="font-mono text-[9px] text-white opacity-60">{currentTimeStr}</span>
                    </div>
                  </>
               ) : (
                  <img src={project.heroUrl} alt="Preview" className="w-full h-full object-cover" />
               )}
            </div>
         </div>
         
         {/* Desktop Action (Keep but hidden on mobile) */}
         <div className="hidden lg:block w-full max-w-[280px] shrink-0 z-20 mb-12">
            {project.liveUrl && (
               <a href={project.liveUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-3 w-full py-4 text-xs uppercase font-medium tracking-wider rounded-[var(--radius-sm)] bg-[var(--color-paper)] text-[var(--color-ink)] shadow-lg hover:scale-[1.02] transition-transform">
                  <span>Launch Prototype</span>
                  <ArrowUpRight className="w-3 h-3" />
               </a>
            )}
         </div>
    </div>
  );

  const WrittenSection = () => (
    <div className={`h-full overflow-y-auto p-6 md:p-12 lg:p-24 no-scrollbar lg:pt-24 transition-colors duration-500 ${isMobile ? 'bg-[var(--color-paper-dim)]' : 'bg-[var(--color-paper)]'}`}>
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
             <div className="grid md:grid-cols-2 gap-8 bg-[var(--color-paper-dim)]/50 lg:bg-[var(--color-paper-dim)]/20 p-6 rounded-[var(--radius-md)] border border-[var(--color-paper-dark)]/50">
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
          <div className="pt-8 lg:hidden">
             <button className="opacity-60 hover:opacity-100 active:scale-95 transition-all cursor-pointer flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest" onClick={onBack}>
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
             </button>
          </div>
       </div>
    </div>
  );

  return (
    <div className="h-[100dvh] w-screen bg-[var(--color-paper)] overflow-hidden flex flex-col lg:grid lg:grid-cols-12">
        {/* MOBILE HEADER - Redesigned with Action & Clear Back Label */}
        <div className="shrink-0 lg:hidden bg-inherit border-b border-[var(--color-paper-dark)]/20 sticky top-0 z-50 px-4 h-16 flex items-center justify-between">
           <button onClick={onBack} className="flex items-center gap-2 p-2 -ml-2 rounded-full active:bg-[var(--color-paper-dark)]/20 transition-colors">
             <ArrowLeft className="w-5 h-5 text-[var(--color-ink)]" />
             <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Back to Overview</span>
           </button>
           
           {project.liveUrl && (
             <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-ink)] text-white rounded-full shadow-lg active:scale-95 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest pl-1">Prototype</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
             </a>
           )}
        </div>

        {/* Views */}
        <div className={`lg:col-span-5 lg:block h-full overflow-hidden bg-black ${activeTab === 'VIDEO' ? 'block flex-1' : 'hidden'}`}>
           <VideoSection />
        </div>

        <div className={`lg:col-span-7 lg:block h-full overflow-hidden bg-inherit border-l border-[var(--color-paper-dark)]/20 ${activeTab === 'WRITTEN' ? 'block flex-1' : 'hidden'}`}>
           <WrittenSection />
        </div>
    </div>
  );
};
