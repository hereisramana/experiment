
export interface Project {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  thumbnailUrl: string;
  heroUrl: string;
  videoUrl?: string;
  liveUrl?: string;
  description: string;
  role: string;
  duration: string;
  challenge: string;
  solution: string;
  interactionNotes: string;
  outcome: string;
  accentColor?: string;
}

export type ViewState = 'HOME' | 'PROJECT_DETAIL' | 'ABOUT';
export type DetailMode = 'VIDEO' | 'WRITTEN';

export interface ThemeColors {
  primary: string;
  error: string;
  text: string;
  background: string;
  surface: string;
}

export const TOKENS = {
  colors: {
    primaryAction: '#2B6B7C',
    primaryAccent: '#3A8CA3',
    primaryContainer: '#B7EAF7',
    feedbackError: '#BA1A1A',
    textBody: '#191C1D',
    textSubtle: '#3F484B',
    surface: '#F8FDFF',
    background: '#FAFAFA',
  },
  spacing: {
    touchTarget: '48px',
  },
};
