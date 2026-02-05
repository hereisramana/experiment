import { useRef, useCallback, useEffect } from 'react';

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isEnabled = useRef<boolean>(true);

  // Initialize Audio Context on first user interaction
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  // Ethereal "Blip" for Hover (High frequency, very short, pure sine)
  const playHover = useCallback(() => {
    if (!isEnabled.current || !audioContextRef.current) return;
    
    // Check for reduced motion/accessibility pref (optional, but good practice to respect silence)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    try {
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pitch envelope: slight slide up
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(850, ctx.currentTime + 0.03);

      // Volume envelope: very quick attack/decay
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Ignore audio errors
    }
  }, []);

  // Ethereal "Thud" for Click (Lower frequency, triangle wave, percussive)
  const playClick = useCallback(() => {
    if (!isEnabled.current || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch (e) {
      // Ignore audio errors
    }
  }, []);

  return { initAudio, playHover, playClick };
};