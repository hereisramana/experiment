import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'smriti',
    title: 'Smriti',
    tagline: 'Anonymous memory-sharing platform focusing on emotional resonance.',
    tags: ['UX Research', 'Mobile App', 'Social Impact'],
    thumbnailUrl: 'https://picsum.photos/800/600?random=1',
    heroUrl: 'https://picsum.photos/1200/600?random=10',
    videoUrl: 'https://player.vimeo.com/video/1163216808?badge=0&autopause=0&player_id=0&app_id=58479',
    liveUrl: 'https://smriti-new.vercel.app/',
    description: 'Smriti is a digital sanctuary designed for the anonymous sharing of memories. Unlike traditional social media that prioritizes metrics and engagement, Smriti focuses on catharsis and emotional connection through ephemeral, text-first storytelling.',
    role: 'Lead Product Designer',
    duration: '3 Months',
    challenge: 'Design a social platform that minimizes performance anxiety and toxicity while fostering genuine emotional connection among strangers.',
    solution: 'A minimalist interface that removes "likes" and public metrics. Interactions are limited to private "resonations" — pre-written empathetic responses. The visual design uses calming gradients and heavy whitespace to reduce cognitive load.',
    interactionNotes: 'The core interaction is the "Resonate" action. Instead of a quick double-tap (Like), users must hold a button for 1.5 seconds to acknowledge a memory. This "Time-to-Resonate" friction is intentional, ensuring users actually read and process the emotion before reacting.',
    outcome: 'Usability testing showed a 40% increase in time-spent-reading compared to standard feeds, with qualitative feedback highlighting a sense of safety and reduced anxiety.',
    accentColor: '#A8C5A8' // Sage Green
  },
  {
    id: 'flavor-filter',
    title: 'Flavor Filter',
    tagline: 'Dietary filtering interaction system for complex menus.',
    tags: ['Interaction Design', 'Accessibility', 'System Design'],
    thumbnailUrl: 'https://picsum.photos/800/600?random=2',
    heroUrl: 'https://picsum.photos/1200/600?random=20',
    videoUrl: 'https://player.vimeo.com/video/1163216808?badge=0&autopause=0&player_id=0&app_id=58479',
    liveUrl: 'https://new-filter.vercel.app/',
    description: 'Flavor Filter is a modular UI system designed for food delivery apps to help users with severe allergies and strict dietary restrictions navigate complex menus safely and efficiently.',
    role: 'Interaction Designer',
    duration: '6 Weeks',
    challenge: 'Filtering menus often feels binary (show/hide). Users with multiple restrictions (e.g., Gluten-Free + Vegan + Nut Allergy) often face empty states or confusing results. The goal was to provide granular control without overwhelming the user.',
    solution: 'A multi-tier filtering logic that visualizes ingredients rather than just hiding dishes. The "Strict Mode" toggle completely removes unsafe items, while "Soft Mode" dims them and highlights the conflicting ingredient. This transparency builds trust.',
    interactionNotes: 'I designed a "Sticky Filter Chip" pattern that remains accessible at the bottom of the screen (thumb zone) on mobile. Tapping it expands a modal with large, toggleable allergen icons. The transition uses a spring animation to feel responsive and lightweight.',
    outcome: 'The design system was adopted by a mid-sized delivery startup, resulting in a 15% decrease in support tickets related to allergen inquiries.',
    accentColor: '#F2A188' // Pastel Salmon
  },
  {
    id: 'portfolio-system',
    title: 'ramanadesign.tech',
    tagline: 'Recursive case study: Designing for the high-volume recruitment context.',
    tags: ['Design Systems', 'React', 'Frontend Architecture'],
    thumbnailUrl: 'https://picsum.photos/800/600?random=99',
    heroUrl: 'https://picsum.photos/1200/600?random=99',
    videoUrl: 'https://player.vimeo.com/video/1163216808?badge=0&autopause=0&player_id=0&app_id=58479',
    liveUrl: 'https://ramanadesign.tech',
    description: 'This portfolio is not just a container for work; it is a product in itself. Built from scratch using React and Tailwind, it rejects the "drag-and-drop" simplicity of Framer/Webflow to demonstrate technical literacy. It treats the hiring manager as a primary user with specific constraints: limited time, high cognitive load, and decision fatigue.',
    role: 'Design Engineer',
    duration: 'Ongoing',
    challenge: 'The "Portfolio Paradox": Designers spend weeks building complex sites that recruiters view for mere seconds. Traditional navigation patterns (Home → Project → Back → Home) introduce interaction cost ("pogo-sticking") that breaks flow and increases bounce rates.',
    solution: 'I hypothesized that a "Split-Pane" architecture would eliminate navigation friction entirely. By keeping the index visible while viewing details, the user retains context. I prioritized production-grade code (Semantic HTML, WCAG compliance, Git-based workflow) over "sandbox" prototypes to prove systemic thinking. The visual language—"Industrial Clay"—uses matte, low-saturation tokens to reduce eye strain during long review sessions.',
    interactionNotes: 'The entire site operates on a "Headless" philosophy. All content is abstracted into a rigid data schema (constants.ts), separate from the view layer. This ensures that the design system dictates the layout, not the content, forcing consistency. State restoration is handled via the History API, allowing deep-linking without full page reloads.',
    outcome: 'A 100/100 Lighthouse performance score and a modular system that allows for rapid iteration. It serves as a living proof-of-concept for my ability to bridge the gap between design intent and engineering reality.',
    accentColor: '#7D7D7D' // Neutral Industrial Grey
  }
];

export const SKILLS = [
  {
    category: "Design",
    items: ["User Interface (UI)", "Interaction Design", "Design Systems", "Prototyping", "Accessibility (WCAG)", "Wireframing"]
  },
  {
    category: "Technical",
    items: ["React", "TypeScript", "HTML5 & CSS3", "Tailwind CSS", "Frontend Architecture", "Git & Version Control"]
  },
  {
    category: "Tools",
    items: ["Figma", "VS Code", "Storybook", "Adobe Creative Suite", "Linear", "Notion"]
  },
  {
    category: "Strategy",
    items: ["User Research", "A/B Testing", "Agile Methodology", "Product Strategy", "Information Architecture"]
  }
];

export const ABOUT_TEXT = `
I am a Senior Product Designer and Design Technologist with 6+ years of experience bridging the gap between human needs and technical constraints.

My philosophy is rooted in "Calm Technology" — creating digital environments that respect the user's attention and reduce anxiety. I specialize in complex system logic, accessible interaction patterns, and design systems.

I believe that the best interface is one that gets out of the way, allowing the user to accomplish their intent with flow and confidence.
`;
