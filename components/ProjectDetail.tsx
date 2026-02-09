import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

type SplitView = 'BALANCED' | 'VIDEO_FOCUS' | 'TEXT_FOCUS';

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [viewMode, setViewMode] = useState<SplitView>('BALANCED');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  
  // Reading Progress State
  const scrollRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const handleScroll = () => {
    if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollHeight === clientHeight) {
            setReadingProgress(100);
        } else {
            const progress = scrollTop / (scrollHeight - clientHeight);
            setReadingProgress(progress * 100);
        }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setVideoProgress((current / duration) * 100);
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

  // Map viewMode to percentage widths
  const getWidths = () => {
    switch (viewMode) {
      case 'VIDEO_FOCUS': return { left: '85%', right: '15%' };
      case 'TEXT_FOCUS': return { left: '15%', right: '85%' };
      default: return { left: '50%', right: '50%' };
    }
  };

  const widths = getWidths();

  // Button handlers
  const toggleVideoFocus = () => {
    setViewMode(prev => prev === 'VIDEO_FOCUS' ? 'BALANCED' : 'VIDEO_FOCUS');
  };

  const toggleTextFocus = () => {
    setViewMode(prev => prev === 'TEXT_FOCUS' ? 'BALANCED' : 'TEXT_FOCUS');
  };

  return (
    <div className="h-[100dvh] w-screen bg-[var(--color-paper)] overflow-hidden flex flex-col select-none font-sans">
      
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

      {/* Split Container */}
      <div className="flex-1 flex w-full relative overflow-hidden">
        
        {/* Left: Video Pane (Framed) */}
        <div 
          className="h-full bg-[var(--color-paper)] overflow-hidden relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-[var(--color-paper-dark)]/20" 
          style={{ width: widths.left }}
        >
           {/* Expand Button: Top-Right Corner */}
           <div className="absolute top-4 right-4 z-50">
             <Tooltip content={viewMode === 'VIDEO_FOCUS' ? "Restore View" : "Maximize Video"} position="left">
                <button 
                  onClick={toggleVideoFocus}
                  className="p-2 text-[var(--color-ink)] bg-[var(--color-paper)]/80 backdrop-blur-md border border-[var(--color-paper-dark)]/50 rounded-[var(--radius-sm)] hover:bg-[var(--color-paper-dim)] hover:border-[var(--color-paper-dark)] transition-all shadow-sm group"
                >
                  {viewMode === 'VIDEO_FOCUS' ? (
                      <Minimize2 className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                  ) : (
                      <Maximize2 className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                  )}
                </button>
             </Tooltip>
           </div>

           {/* The "Frame" Container - Acts as the whitespace border */}
           <div className={`relative w-full h-full p-6 md:p-8 flex items-center justify-center transition-all duration-500 ${viewMode === 'TEXT_FOCUS' ? 'opacity-40 blur-sm scale-95' : 'opacity-100 scale-100'}`}>
               <div className="relative w-full h-full bg-black rounded-[var(--radius-lg)] shadow-2xl border border-[var(--color-paper-dark)] overflow-hidden group">
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
                        <div className={`absolute inset-0 z-20 flex flex-col justify-end transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-90">
                               {isPlaying ? <Pause className="w-6 h-6 fill-white stroke-none" /> : <Play className="w-6 h-6 fill-white stroke-none ml-1" />}
                             </button>
                           </div>
                        </div>
                        {/* Video Controls Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-auto h-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center gap-4 px-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                           <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                             {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                           </button>
                           <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden cursor-pointer group/timeline" onClick={handleTimelineClick}>
                             <div className="absolute left-0 top-0 h-full bg-white transition-all" style={{ width: `${videoProgress}%` }} />
                             <div className="absolute top-0 bottom-0 w-0.5 bg-white/40 opacity-0 group-hover/timeline:opacity-100" style={{ left: `${videoProgress}%` }} />
                           </div>
                           <span className="font-mono text-[10px] text-white opacity-60 tabular-nums">{currentTimeStr}</span>
                        </div>
                      </>
                   ) : (
                      <img src={project.heroUrl} alt="Preview" className="w-full h-full object-cover" />
                   )}
               </div>
           </div>
        </div>

        {/* Right: Written Pane */}
        <div 
          className="h-full bg-[var(--color-paper)] overflow-y-auto no-scrollbar scroll-smooth transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative" 
          style={{ width: widths.right }}
          ref={scrollRef}
          onScroll={handleScroll}
        >
           {/* Reading Progress Bar (Sticky) */}
           <div className="sticky top-0 left-0 right-0 h-[2px] z-[60] bg-[var(--color-paper-dim)]/30 w-full">
              <div 
                className="h-full bg-[var(--color-ink)] transition-all duration-75 ease-linear" 
                style={{ width: `${readingProgress}%` }} 
              />
           </div>

           {/* Expand Button: Top-Left Corner */}
           <div className="sticky top-4 left-4 z-50 ml-4 mt-4 float-left">
             <Tooltip content={viewMode === 'TEXT_FOCUS' ? "Restore View" : "Maximize Text"} position="right">
                <button 
                  onClick={toggleTextFocus}
                  className="p-2 text-[var(--color-ink)] bg-[var(--color-paper)]/80 backdrop-blur-md border border-[var(--color-paper-dark)]/50 rounded-[var(--radius-sm)] hover:bg-[var(--color-paper-dim)] hover:border-[var(--color-paper-dark)] transition-all shadow-sm group"
                >
                  {viewMode === 'TEXT_FOCUS' ? (
                      <Minimize2 className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                  ) : (
                      <Maximize2 className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                  )}
                </button>
             </Tooltip>
           </div>

           <div className={`p-12 lg:p-24 max-w-3xl mx-auto space-y-24 pb-48 transition-opacity duration-500 ${viewMode === 'VIDEO_FOCUS' ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
              <div className="pb-12 border-b border-[var(--color-paper-dark)]">
                 <h2 className="text-5xl lg:text-6xl font-medium tracking-tight mb-4 leading-[1.05] text-[var(--color-ink)]">
                  {project.title}
                 </h2>
                 <p className="text-xl lg:text-2xl text-[var(--color-ink-subtle)] font-light leading-relaxed max-w-xl">{project.tagline}</p>
              </div>

              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8 border-b border-[var(--color-paper-dark)]/30 pb-2">System Context</h3>
                 <p className="text-xl leading-relaxed text-[var(--color-ink)] font-light text-balance">{project.description}</p>
              </section>

              <section className="grid gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-2">Architecture</h3>
                 <div className="grid gap-12 p-10 bg-[var(--color-paper-dim)]/30 rounded-[var(--radius-lg)] border border-[var(--color-paper-dark)]/50">
                    <div className="space-y-4">
                       <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-ink)] opacity-40">The Challenge</span>
                       <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.challenge}</p>
                    </div>
                    <div className="space-y-4">
                       <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-ink)] opacity-40">The Resolution</span>
                       <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)]">{project.solution}</p>
                    </div>
                 </div>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-10">Interaction Logic</h3>
                 <div className="pl-10 border-l-[3px] border-[var(--color-ink)]/20 hover:border-[var(--color-ink)] transition-colors">
                    <p className="text-2xl leading-relaxed text-[var(--color-ink)] italic font-light">{project.interactionNotes}</p>
                 </div>
              </section>

              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                 <h3 className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8 border-b border-[var(--color-paper-dark)]/30 pb-2">Outcome</h3>
                 <p className="text-lg leading-relaxed text-[var(--color-ink-subtle)] font-medium bg-[var(--color-ink)] text-white p-8 rounded-[var(--radius-md)]">{project.outcome}</p>
              </section>
           </div>
        </div>
      </div>
    </div>
  );
};
