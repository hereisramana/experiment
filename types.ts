export interface Project {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  thumbnailUrl: string;
  heroUrl: string;
  videoUrl?: string; // Optional field for video hero
  liveUrl?: string; // Optional field for external live prototype link
  description: string;
  role: string;
  duration: string;
  challenge: string;
  solution: string;
  interactionNotes: string; // Specific focus on interaction design
  outcome: string;
}

export type ViewState = 'HOME' | 'PROJECT_DETAIL' | 'ABOUT';

export interface ThemeColors {
  primary: string;
  error: string;
  text: string;
  background: string;
  surface: string;
}

export const TOKENS = {
  colors: {
    primaryAction: '#2B6B7C', // Derived Oceanic primary (WCAG AA compliant)
    primaryAccent: '#3A8CA3', // The original seed for badges/accents
    primaryContainer: '#B7EAF7',
    feedbackError: '#BA1A1A', // M3 Error
    textBody: '#191C1D', // M3 On-Surface
    textSubtle: '#3F484B', // M3 On-Surface Variant
    surface: '#F8FDFF', // M3 Surface
    background: '#FAFAFA',
  },
  spacing: {
    touchTarget: '48px',
  },
};