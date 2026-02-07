import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowUpRight, ArrowDown, Play, Pause, Square, ChevronRight, ChevronLeft } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Custom Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  const [durationStr, setDurationStr] = useState("00:00");

  useEffect(() => {
    // Reset scroll to top
    window.scrollTo(0, 0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [project.id]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollHeight - scrollTop - clientHeight < 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    }
  };

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
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
      setCurrentTimeStr("00:00");
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

  return (
    <div className="h-screen w-screen bg-[var(--color-paper)] overflow-hidden flex flex-row lg:grid lg:grid-cols-12 overflow-x-auto snap-x snap-mandatory lg:overflow-x-hidden">
        
        {/* LEFT COLUMN: PURE SIMULATOR (Sticky on Desktop, Pane 1 on Mobile) */}
        <div className="min-w-full w-full lg:min-w-0 snap-start lg:col-span-5 bg-[var(--color-ink)] text-[var(--color-paper)] h-full flex flex-col relative z-20 border-r border-[var(--color-paper)]/10 shrink-0">
          
          {/* Back Button - Inverse Ink Style */}
          <button 
            onClick={onBack}
            className="absolute top-6 left-6 md:top-8 md:left-8 group flex items-center py-2 px-4 rounded-[var(--radius-sm)] transition-all duration-300 z-30 -ml-4 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] hover:shadow-lg hover:border-[var(--color-paper)] border border-transparent"
            aria-label="Back"
          >
            <span className="text-xs uppercase font-medium tracking-widest text-[var(--color-paper)] opacity-80 group-hover:opacity-100 group-hover:-translate-x-1 transition-all flex items-center gap-2">
                <ArrowLeft className="w-3 h-3 stroke-[3px]" /> Back
            </span>
          </button>

          {/* THE SIMULATOR */}
          <div className="w-full h-full flex flex-col items-center pt-24 pb-8 px-6 md:px-12">
             
             {/* Media Frame */}
             <div className="flex-1 w-full min-h-0 flex items-center justify-center mb-8 relative">
                <div className="relative w-full h-full bg-black rounded-xl border border-[var(--color-ink-subtle)]/30 shadow-2xl overflow-hidden ring-1 ring-white/10 group">
                   {project.videoUrl ? (
                      <>
                        <video 
                          ref={videoRef}
                          src={project.videoUrl} 
                          className="w-full h-full object-contain opacity-95 cursor-pointer" 
                          playsInline
                          onClick={togglePlay}
                          onTimeUpdate={handleTimeUpdate}
                          onLoadedMetadata={handleLoadedMetadata}
                          onEnded={() => setIsPlaying(false)}
                        />
                        
                        {/* Custom Controls Overlay */}
                        <div className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                           
                           {/* Big Center Toggle Button */}
                           <div className="absolute inset-0 flex items-center justify-center">
                             <button 
                               onClick={togglePlay}
                               className="pointer-events-auto w-16 h-16 rounded-full bg-[var(--color-paper)]/10 backdrop-blur-sm border border-[var(--color-paper)]/20 flex items-center justify-center hover:bg-[var(--color-paper)]/20 hover:scale-105 transition-all text-white shadow-lg"
                               aria-label={isPlaying ? "Pause Video" : "Play Video"}
                             >
                               {isPlaying ? (
                                 <Pause className="w-6 h-6 fill-white stroke-none" />
                               ) : (
                                 <Play className="w-6 h-6 fill-white stroke-none ml-1" />
                               )}
                             </button>
                           </div>

                           {/* Bottom Bar: Timeline & Stats */}
                           <div className="bg-black/80 backdrop-blur-md border-t border-white/10 p-3 flex items-center gap-3 pointer-events-auto">
                              <button onClick={togglePlay} className="text-white/80 hover:text-white transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
                                {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                              </button>
                              
                              <button onClick={stopVideo} className="text-white/80 hover:text-[var(--color-feedback-error)] transition-colors" aria-label="Stop">
                                <Square className="w-3 h-3 fill-current" />
                              </button>

                              <span className="font-mono text-[10px] text-white/50 w-20 text-center">
                                {currentTimeStr} / {durationStr}
                              </span>

                              {/* Interactive Timeline */}
                              <div 
                                className="flex-1 h-6 flex items-center cursor-pointer group/timeline"
                                onClick={handleTimelineClick}
                              >
                                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative">
                                   <div 
                                     className="h-full bg-[var(--color-accent-light)] absolute top-0 left-0 transition-all duration-100 ease-linear"
                                     style={{ width: `${progress}%` }}
                                   />
                                </div>
                              </div>
                           </div>
                        </div>
                      </>
                   ) : (
                      <img 
                        src={project.heroUrl} 
                        alt="Prototype Preview" 
                        className="w-full h-full object-contain opacity-95" 
                      />
                   )}
                </div>
             </div>
             
             {/* Live Prototype Link */}
             <div className="w-full max-w-[280px] shrink-0 mb-4 lg:mb-0">
                {project.liveUrl ? (
                   <a 
                     href={project.liveUrl} 
                     target="_blank" 
                     rel="noreferrer" 
                     style={buttonStyle}
                     className="group flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-[var(--color-paper)] text-[var(--color-ink)] text-[10px] md:text-xs uppercase font-medium tracking-wider rounded-[var(--radius-sm)] hover:bg-[var(--button-hover-bg)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                   >
                      <span>Launch Prototype</span>
                      <ArrowUpRight className="w-3 h-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:stroke-[3px]" />
                   </a>
                ) : (
                   <div className="w-full py-3 md:py-4 border border-[var(--color-paper)]/20 text-[var(--color-paper)] text-[10px] md:text-xs uppercase font-medium tracking-wider rounded-[var(--radius-sm)] text-center opacity-50 cursor-not-allowed">
                      Prototype Offline
                   </div>
                )}
             </div>
             
             {/* Mobile Swipe Guidance */}
             <div className="lg:hidden flex items-center gap-2 text-[var(--color-paper)] opacity-40 animate-pulse">
                <span className="text-[10px] uppercase tracking-widest">Swipe for Case Study</span>
                <ChevronRight className="w-4 h-4" />
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Manual / Spec Sheet (Pane 2 on Mobile) */}
        <div className="min-w-full w-full lg:min-w-0 snap-start lg:col-span-7 bg-[var(--color-paper)] relative h-full overflow-hidden shrink-0 flex flex-col">
           
           {/* Mobile Swipe Back Guidance */}
           <div className="lg:hidden absolute top-6 left-6 z-30 pointer-events-none text-[var(--color-ink)] opacity-30 flex items-center gap-2">
               <ChevronLeft className="w-4 h-4" />
               <span className="text-[10px] uppercase tracking-widest">Prototype</span>
           </div>

           <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 z-10 mix-blend-multiply hidden lg:block ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
              <ArrowDown className="w-5 h-5 text-[var(--color-ink)] opacity-30 animate-bounce" />
           </div>

           <div 
             ref={scrollRef}
             onScroll={handleScroll}
             className="h-full overflow-y-auto p-6 md:p-12 lg:p-24 no-scrollbar pt-20 lg:pt-24"
           >
               <div className="max-w-2xl mx-auto space-y-20 animate-in slide-in-from-bottom-4 duration-700 ease-soft pb-24">
                  
                  {/* HEADER INFO */}
                  <div className="pb-12 border-b border-[var(--color-paper-dark)]">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-2 leading-[1.1] text-[var(--color-ink)]">
                      {project.title} <span className="block md:inline md:text-[0.6em] text-[var(--color-ink-subtle)] font-light mt-2 md:mt-0 md:ml-2">— Case Study</span>
                     </h1>
                  </div>

                  {/* SECTION: CONTEXT */}
                  <section>
                     <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8">System Context</h3>
                     <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink)]">
                        {project.description}
                     </p>
                  </section>

                  {/* SECTION: ARCHITECTURE */}
                  <section className="grid gap-12">
                     <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-2">Architecture</h3>
                     
                     <div className="grid md:grid-cols-2 gap-12 bg-[var(--color-paper-dim)]/20 p-6 rounded-[var(--radius-md)] border border-[var(--color-paper-dark)]/50">
                        <div className="space-y-4">
                           <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">Problem Space</span>
                           <p className="text-base leading-relaxed text-[var(--color-ink-subtle)]">
                              {project.challenge}
                           </p>
                        </div>
                        <div className="space-y-4">
                           <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink)] opacity-50">Resolution</span>
                           <p className="text-base leading-relaxed text-[var(--color-ink-subtle)]">
                              {project.solution}
                           </p>
                        </div>
                     </div>
                  </section>

                  {/* SECTION: LOGIC */}
                  <section>
                     <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink)] opacity-40 mb-8">Interaction Logic</h3>
                     
                     <div className="pl-6 border-l-2 border-[var(--color-ink)] relative">
                        <p className="text-lg leading-relaxed text-[var(--color-ink)] italic">
                           {project.interactionNotes}
                        </p>
                     </div>
                  </section>

                  {/* FOOTER: Sign-off */}
                  <div className="pt-12 mt-0">
                     <p className="font-mono text-[10px] text-[var(--color-ink-subtle)] mb-6 uppercase tracking-widest">
                        That’s the end. Thanks for being here.
                     </p>
                     
                     <button 
                        className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer flex justify-between items-center group w-full text-left"
                        onClick={onBack}
                     >
                        <div className="h-px bg-[var(--color-ink)] flex-1 mr-6 opacity-30 group-hover:opacity-100 transition-all origin-left scale-x-50 group-hover:scale-x-100"></div>
                        <span className="text-xs uppercase font-medium tracking-widest flex items-center gap-2 group-hover:text-[var(--color-accent)]">
                           <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> Back to Main Page
                        </span>
                     </button>
                  </div>

               </div>
           </div>
        </div>
    </div>
  );
};