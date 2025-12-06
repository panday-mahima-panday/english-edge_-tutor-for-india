
import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Sparkles } from 'lucide-react';
import { DailyPractice } from './components/DailyPractice';
import { Analyzer } from './components/Analyzer';
import { Conversation } from './components/Conversation';
import { LanguageBridge } from './components/LanguageBridge';
import { ProgressTracker } from './components/ProgressTracker';
import { Logo } from './components/Logo';
import { SideMenu } from './components/SideMenu';
import { AboutPage, FAQPage, HelpPage, PrivacyPage, AppInfoPage, SafetyCenterPage, GuidelinesPage, ReportPage, ComingSoon } from './components/StaticPages';
import { ContactPage, FeedbackPage } from './components/Forms';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { LearningPath } from './components/LearningPath';
import { Achievements } from './components/Achievements';
import { Resources } from './components/Resources';
import { FluencyScenarios } from './components/FluencyScenarios';
import { AppTab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('practice');
  const [showSplash, setShowSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Desktop is lg

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsMenuOpen(true); // Keep open on desktop
      else setIsMenuOpen(false); // Closed by default on mobile
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Theme Logic
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Render Content Switcher
  const renderContent = () => {
    switch (activeTab) {
      // --- Main Navigation ---
      case 'practice': return <DailyPractice />;
      case 'analyze': return <Analyzer />;
      case 'bridge': return <LanguageBridge />;
      case 'chat': return <Conversation />;
      case 'progress': return <ProgressTracker />;
      
      // --- Learning Features ---
      case 'learning-path': return <LearningPath />;
      case 'fluency-scenarios': return <FluencyScenarios />;
      case 'insights': return <ProgressTracker />; // Reusing Progress for Insights
      case 'strengths': return <Analyzer />; // Reusing Analyzer for Strengths view
      case 'positivity': return <ProgressTracker />; // Reusing Progress for Coach
      case 'achievements': return <Achievements />;
      case 'resources': return <Resources />;
      case 'flashcards': return <ComingSoon title="Flashcards" />;
      case 'quizzes': return <ComingSoon title="Quizzes" />;
      case 'notes': return <ComingSoon title="Saved Notes" />;
      case 'recent': return <ProgressTracker />; // History is in Progress

      // --- User Tools ---
      case 'profile': return <Profile />;
      case 'goals': return <Profile />; // Goals are in Profile
      case 'notifications': return <Settings />; // Notifications in Settings
      case 'saved-chats': return <ComingSoon title="Saved Conversations" />;
      case 'downloads': return <ComingSoon title="Downloads" />;
      case 'subscription': return <ComingSoon title="Subscription Plan" />;
      case 'invite': return <ComingSoon title="Invite Friends" />;
      case 'share': return <ComingSoon title="Share App" />;
      case 'settings': return <Settings />;

      // --- Support ---
      case 'faq': return <FAQPage />;
      case 'help': return <HelpPage />;
      case 'contact': return <ContactPage />;
      case 'feedback': return <FeedbackPage />;
      case 'report': return <ReportPage />;
      case 'safety': return <SafetyCenterPage />;
      case 'guidelines': return <GuidelinesPage />;
      
      // --- Legal & Info ---
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <PrivacyPage />; // Reusing Privacy for Terms text
      case 'app-info': return <AppInfoPage />;
      case 'about': return <AboutPage />;
      
      default: return <DailyPractice />;
    }
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-background-light dark:bg-background-dark flex flex-col items-center justify-center z-[100] animate-out fade-out duration-700 fill-mode-forwards">
        <div className="relative">
          <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full animate-pulse-slow"></div>
          <div className="animate-scale-in duration-1000">
            <Logo className="w-48 h-20 md:w-64 md:h-24" showText={true} />
          </div>
        </div>
        <p className="mt-6 text-primary-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs animate-fade-in-up delay-300">
          Tutor for Confidence
        </p>
        <div className="absolute bottom-10 text-slate-400 text-[10px] animate-fade-in-up delay-500">
          Created by Mahima Panday
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-text-inverted transition-colors duration-500 font-sans flex overflow-hidden">
      
      {/* SIDE MENU (DRAWER on Mobile, SIDEBAR on Desktop) */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isMobile={isMobile}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* HEADER for Mobile/Tablet */}
      <header className={`
        fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/50 px-5 py-3 transition-all duration-300 flex justify-between items-center shadow-sm
        ${!isMobile ? 'lg:hidden' : ''}
      `}>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
               <Menu size={24} />
            </button>
            <div onClick={() => setActiveTab('practice')} className="flex items-center gap-2 cursor-pointer">
              <Logo className="w-28 h-8" showText={true} />
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 active:scale-95 transition-all"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className={`
        flex-1 w-full flex flex-col min-h-screen relative z-0 transition-all duration-300
        ${!isMobile ? 'pl-[320px]' : ''} 
      `}>
        
        {/* DESKTOP TOP BAR */}
        <div className="hidden lg:flex justify-between items-center px-12 pt-8 pb-4">
           <div>
              <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white capitalize flex items-center gap-3">
                 {activeTab.replace(/-/g, ' ')}
                 {['practice', 'analyze', 'chat', 'bridge'].includes(activeTab) && (
                   <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                 )}
              </h2>
           </div>
           <div className="flex items-center gap-4">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tutor for Confidence — by Mahima Panday</p>
             <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-primary-200 transition-all shadow-sm"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
             </button>
           </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-12 pt-20 lg:pt-4 pb-12 overflow-x-hidden">
          <div key={activeTab} className="animate-fade-in-up">
            {renderContent()}
          </div>
        </div>
        
        {/* FOOTER */}
        <div className="hidden lg:flex justify-center py-6 text-slate-300 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest border-t border-slate-50 dark:border-slate-800/30 mt-auto">
           © 2025 Creater — Made with <Sparkles size={10} className="mx-1 text-primary-500"/> by Mahima Panday
        </div>
      </main>
    </div>
  );
}

export default App;
