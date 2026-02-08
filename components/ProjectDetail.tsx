import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, Play, Pause } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [splitRatio, setSplitRatio] = useState(50); // percentage of left pane
  const [isResizing, setIsResizing] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

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

  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const ratio = (e.clientX / window.innerWidth) * 100;
      setSplitRatio(Math.min(Math.max(ratio, 20), 80));
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="h-[100dvh] w-screen bg-[var(--color-paper)] overflow-hidden flex flex-col select-none">
      
      {/* Universal Header */}
      <header className="h-16 shrink-0 border-b border-[var(--color-paper-dark)]/20 px-6 flex items-center justify-between bg-[var(--color-paper)] z-50">
        <button onClick={onBack} className="flex items-center gap-2 group p-2 -ml-2 rounded-full hover:bg-[var(--color-paper-dim)] transition-colors">
          <ArrowLeft className="w-5 h-5 text-[var(--color-ink)]" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Back to Overview</span>
        </button>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
           <h1 className="text-xs uppercase font-bold tracking-[0.2em]">{project.title}</h1>
           <span className="text-[9px] uppercase tracking-widest opacity-40">Case Study</span>
        </div>
        
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-ink)] text-white rounded-full shadow-lg hover:scale-[1.05] active:scale-95 transition-all">
             <span className="text-[10px] font-bold uppercase tracking-widest pl-1">Prototype</span>
             <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </header>

      {/* Resizable Split Container */}
      <div className={`flex-1 flex w-full relative ${isResizing ? 'cursor-col-resize' : ''}`}>
        
        {/* Left: Video Pane */}
        <div className="h-full bg-black overflow-hidden relative flex items-center justify-center" style={{ width: `${splitRatio}%` }}>
           <div className="relative w-full aspect-video max-w-4xl px-8 group">
               {project.videoUrl ? (
                  <>
                    <video 
                      ref={videoRef}
                      src={project.videoUrl} 
                      className="w-full h-full object-contain shadow-2xl" 
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                    <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />
                    <div className={`absolute inset-0 z-20 flex flex-col justify-end transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                           {isPlaying ? <Pause className="w-6 h-6 fill-white stroke-none" /> : <Play className="w-6 h-6 fill-white stroke-none ml-1" />}
                         </button>
                       </div>
                    </div>
                    {/* Controls Overlay */}
                    <div className="absolute bottom-4 left-8 right-8 z-30 pointer-events-auto h-12 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4 px-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
           
           {/* Focus Controls */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              <button 
                onClick={() => setSplitRatio(80)}
                className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${splitRatio > 70 ? 'bg-white text-black' : 'bg-white/10 text-white/40 hover:text-white'}`}
              >
                Focus Media
              </button>
              <button 
                onClick={() => setSplitRatio(50)}
                className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${splitRatio === 50 ? 'bg-white text-black' : 'bg-white/10 text-white/40 hover:text-white'}`}
              >
                Reset
              </button>
           </div>
        </div>

        {/* Resizer Handle */}
        <div 
          className="absolute top-0 bottom-0 z-40 w-1 group cursor-col-resize active:w-4 transition-[width]"
          style={{ left: `calc(${splitRatio}% - 2px)` }}
          onMouseDown={startResizing}
        >
           <div className="w-[1px] h-full bg-[var(--color-paper-dark)] mx-auto group-hover:bg-[var(--color-ink)] transition-colors" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                 <div className="w-1 h-1 bg-[var(--color-ink)] rounded-full" />
                 <div className="w-1 h-1 bg-[var(--color-ink)] rounded-full" />
              </div>
           </div>
        </div>

        {/* Right: Written Pane */}
        <div className="h-full bg-[var(--color-paper)] overflow-y-auto no-scrollbar scroll-smooth" style={{ width: `${100 - splitRatio}%` }}>
           <div className="p-12 lg:p-20 max-w-3xl mx-auto space-y-20 pb-32">
              <div className="pb-8 border-b border-[var(--color-paper-dark)]">
                 <h2 className="text-5xl font-medium tracking-tight mb-2 leading-[1.1] text-[var(--color-ink)]">
                  {project.title}
                 </h2>
                 <p className="text-xl text-[var(--color-ink-subtle)] font-light leading-relaxed">{project.tagline}</p>
              </div>

              <section>
                 <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-6">System Context</h3>
                 <p className="text-xl leading-relaxed text-[var(--color-ink)] font-light">{project.description}</p>
              </section>

              <section className="grid gap-10">
                 <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40">Architecture</h3>
                 <div className="grid gap-8 p-8 bg-[var(--color-paper-dim)] rounded-[var(--radius-md)] border border-[var(--color-paper-dark)]/50">
                    <div className="space-y-3">
                       <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">Problem</span>
                       <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.challenge}</p>
                    </div>
                    <div className="space-y-3">
                       <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">Resolution</span>
                       <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.solution}</p>
                    </div>
                 </div>
              </section>

              <section>
                 <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8">Interaction Logic</h3>
                 <div className="pl-8 border-l-2 border-[var(--color-ink)]">
                    <p className="text-xl leading-relaxed text-[var(--color-ink)] italic font-light">{project.interactionNotes}</p>
                 </div>
              </section>

              <section>
                 <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-6">Outcome</h3>
                 <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.outcome}</p>
              </section>

              {/* Focus Controls for Text */}
              <div className="pt-12 flex justify-start gap-2">
                <button 
                  onClick={() => setSplitRatio(20)}
                  className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all ${splitRatio < 30 ? 'bg-[var(--color-ink)] text-white' : 'bg-[var(--color-paper-dark)]/30 text-[var(--color-ink)]/40 hover:text-[var(--color-ink)]'}`}
                >
                  Focus Content
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
