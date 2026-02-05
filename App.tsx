import React, { useState } from 'react';
import { PROJECTS, ABOUT_TEXT, SKILLS } from './constants';
import { ViewState } from './types';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { Button } from './components/Button';
import { Menu, X, Mail, Github, Linkedin, Phone, Copy, Check, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const CONTACT_INFO = {
    email: 'hello@ramanadesign.tech',
    phone: '+1 (555) 123-4567'
  };

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setView('PROJECT_DETAIL');
    window.scrollTo(0, 0);
  };

  const handleNavClick = (newView: ViewState) => {
    setView(newView);
    setSelectedProjectId(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);

  const renderContactModal = () => {
    if (!isContactModalOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop: Clean Fade */}
        <div 
          className="absolute inset-0 bg-white/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsContactModalOpen(false)}
        />
        
        {/* Modal: Sharp, Floating, Luminous Shadow */}
        <div className="relative bg-white w-full max-w-lg rounded-2xl p-10 animate-in zoom-in-95 fade-in duration-200 shadow-ethereal-lg border border-slate-100">
          <button 
            onClick={() => setIsContactModalOpen(false)}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-4xl font-bold text-slate-900 mb-2 font-heading tracking-tight">Contact</h2>
          <p className="text-slate-500 mb-10 text-lg">Signal, not noise. Let's talk.</p>

          <div className="space-y-6">
            {/* Email Field - Clean */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-slate-400" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-medium text-slate-900">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <button 
                onClick={() => copyToClipboard(CONTACT_INFO.email, 'email')}
                className="text-slate-300 hover:text-slate-900 transition-colors"
              >
                {copiedType === 'email' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Phone Field - Clean */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-slate-400" />
                <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g,'')}`} className="text-lg font-medium text-slate-900">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <button 
                onClick={() => copyToClipboard(CONTACT_INFO.phone, 'phone')}
                className="text-slate-300 hover:text-slate-900 transition-colors"
              >
                {copiedType === 'phone' ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (view) {
      case 'PROJECT_DETAIL':
        if (currentProject) {
          return (
            <ProjectDetail 
              project={currentProject} 
              onBack={() => handleNavClick('HOME')} 
            />
          );
        }
        return <div className="p-12 text-center text-slate-500">Project not found</div>;
      
      case 'ABOUT':
        return (
          <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-16 tracking-tighter font-heading">
               About.
             </h1>
             
             <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
               <div className="md:col-span-8">
                 <div className="prose prose-xl text-slate-600 leading-relaxed mb-16">
                   {ABOUT_TEXT.split('\n').map((paragraph, idx) => (
                     paragraph.trim() && <p key={idx} className="mb-6">{paragraph}</p>
                   ))}
                 </div>
               </div>
               
               <div className="md:col-span-4 space-y-12">
                  {SKILLS.map((skillGroup) => (
                    <div key={skillGroup.category}>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
                        {skillGroup.category}
                      </h3>
                      <ul className="space-y-2">
                        {skillGroup.items.map((skill) => (
                          <li key={skill} className="text-slate-500 font-medium text-sm">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        );

      case 'HOME':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Hero Section: Typography as Structure */}
            <section className="mb-32 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h1 className="text-6xl md:text-9xl font-bold text-slate-900 leading-[0.9] tracking-tighter mb-8 font-heading">
                Ramana.
              </h1>
              <div className="max-w-2xl">
                 <p className="text-2xl md:text-3xl text-slate-500 leading-tight font-light mb-8">
                   Senior Product Designer & Technologist building <span className="text-slate-900 font-medium">calm interactive systems</span>.
                 </p>
                 <div className="flex gap-6">
                    <button onClick={() => setIsContactModalOpen(true)} className="group flex items-center font-bold text-slate-900 hover:text-[#2B6B7C] transition-colors">
                      Get in touch <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                 </div>
              </div>
            </section>

            {/* Projects Grid: Vanishing Containers */}
            <section className="animate-in fade-in slide-in-from-bottom-4 delay-100 duration-500">
              <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Selected Works 2024
                </h2>
                <span className="text-sm font-bold text-slate-400">0{PROJECTS.length}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {PROJECTS.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={handleProjectClick} 
                  />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-[#2B6B7C] selection:text-white">
      
      {/* Contact Reveal Modal */}
      {renderContactModal()}

      {/* Navigation: Ethereal (Invisible until needed) */}
      <nav className="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-sm border-b border-transparent transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo: Text only */}
            <div 
              className="font-bold text-lg tracking-tight cursor-pointer font-heading"
              onClick={() => handleNavClick('HOME')}
            >
              ramanadesign<span className="text-slate-300">.tech</span>
            </div>

            {/* Desktop Menu: Text links */}
            <div className="hidden md:flex items-center gap-10">
              <button 
                onClick={() => handleNavClick('HOME')} 
                className={`text-sm font-bold tracking-wide uppercase transition-colors ${view === 'HOME' && !selectedProjectId ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
              >
                Work
              </button>
              <button 
                onClick={() => handleNavClick('ABOUT')} 
                className={`text-sm font-bold tracking-wide uppercase transition-colors ${view === 'ABOUT' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
              >
                About
              </button>
              <Button 
                variant="primary" 
                className="!py-2 !px-5 !min-h-[40px] text-sm"
                onClick={() => setIsContactModalOpen(true)}
              >
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-900"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay: Solid White (High Readability) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-20 z-40 bg-white animate-in slide-in-from-right-2 duration-300">
            <div className="flex flex-col p-8 gap-8">
              <button 
                onClick={() => handleNavClick('HOME')} 
                className="text-left text-4xl font-bold text-slate-900 tracking-tight"
              >
                Work
              </button>
              <button 
                onClick={() => handleNavClick('ABOUT')} 
                className="text-left text-4xl font-bold text-slate-900 tracking-tight"
              >
                About
              </button>
               <button 
                onClick={() => setIsContactModalOpen(true)} 
                className="text-left text-4xl font-bold text-[#2B6B7C] tracking-tight"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="min-h-[calc(100vh-80px)]">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-slate-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} Ethereal Utility.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="Github">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};