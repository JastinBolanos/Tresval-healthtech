import React, { useState } from 'react';
import { 
  Activity, 
  Users, 
  Calendar, 
  CreditCard, 
  Search, 
  Lock, 
  Unlock, 
  Sparkles, 
  Plus, 
  Building2, 
  ChevronDown, 
  LogOut,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Globe
} from 'lucide-react';
import { StaffProfile, ClinicCampus } from '../types';
import { useLanguage } from '../context/LanguageContext';

export type ActiveTabType = 'triage' | 'patients' | 'odontogram' | 'schedule' | 'billing' | string;

interface NavbarProps {
  activeView?: string;
  activeTab?: ActiveTabType;
  onNavigate?: (view: string) => void;
  setActiveTab?: (tab: any) => void;
  isPrivacyMode: boolean;
  onTogglePrivacyMode?: () => void;
  setIsPrivacyMode?: (value: boolean | ((prev: boolean) => boolean)) => void;
  onOpenAICopilot?: () => void;
  onToggleAICopilot?: () => void;
  waitingPatientsCount?: number;
  waitingTriageCount?: number;
  activeCampusName?: string;
  doctorName?: string;
  doctorSpecialty?: string;
  onOpenWelcome?: () => void;
  onExitToWelcome?: () => void;
  onOpenNewTriage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  activeTab,
  onNavigate,
  setActiveTab,
  isPrivacyMode,
  onTogglePrivacyMode,
  setIsPrivacyMode,
  onOpenAICopilot,
  onToggleAICopilot,
  waitingPatientsCount = 0,
  waitingTriageCount = 0,
  activeCampusName = 'Tresval Clinic Metropolitano',
  doctorName = 'Dra. Valentina Ortiz',
  doctorSpecialty = 'Cirujana Maxilofacial',
  onOpenWelcome,
  onExitToWelcome,
  onOpenNewTriage,
}) => {
  const { language, setLanguage, toggleLanguage, t, tSpecialty } = useLanguage();
  const currentActive = activeView || activeTab || 'triage';
  const triageCount = waitingPatientsCount || waitingTriageCount;

  const handleTabClick = (viewName: string) => {
    if (onNavigate) onNavigate(viewName);
    if (setActiveTab) setActiveTab(viewName as any);
  };

  const handleTogglePrivacy = () => {
    if (onTogglePrivacyMode) onTogglePrivacyMode();
    if (setIsPrivacyMode) setIsPrivacyMode(prev => !prev);
  };

  const handleOpenCopilot = () => {
    if (onOpenAICopilot) onOpenAICopilot();
    if (onToggleAICopilot) onToggleAICopilot();
  };

  const handleGoHome = () => {
    if (onOpenWelcome) onOpenWelcome();
    if (onExitToWelcome) onExitToWelcome();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F2]/95 border-b border-[#E9E9E2] backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Campus Info */}
          <div className="flex items-center gap-4">
            <button 
              id="brand-logo-btn"
              onClick={handleGoHome}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
              title={t('nav.brand.tooltip')}
            >
              <div className="w-9 h-9 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white shadow-xs group-hover:bg-[#3E4D41] transition-colors">
                <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-serif text-lg italic text-[#4A5D4E] font-medium">Tresval</span>
                  <span className="font-sans text-base font-bold text-[#2D332D] tracking-tight">Clinic</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#DDE5B6] text-[#4A5D4E] font-semibold border border-[#A3B18A]/30">
                    OS
                  </span>
                </div>
                <span className="text-[10px] text-[#6B705C] font-medium">{activeCampusName}</span>
              </div>
            </button>
          </div>

          {/* Center Navigation Tabs - Pill Bar */}
          <nav className="hidden md:flex items-center bg-white border border-[#E9E9E2] p-1 rounded-2xl gap-1 shadow-xs">
            <button
              id="tab-nav-triage"
              onClick={() => handleTabClick('triage')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentActive === 'triage'
                  ? 'bg-[#4A5D4E] text-white shadow-xs'
                  : 'text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{t('nav.triage')}</span>
              {triageCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  currentActive === 'triage' ? 'bg-white text-[#4A5D4E]' : 'bg-[#D4A373]/20 text-[#D4A373] border border-[#D4A373]/40'
                }`}>
                  {triageCount}
                </span>
              )}
            </button>

            <button
              id="tab-nav-patients"
              onClick={() => handleTabClick('patients')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentActive === 'patients' || currentActive === 'patient_detail'
                  ? 'bg-[#4A5D4E] text-white shadow-xs'
                  : 'text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('nav.patients')}</span>
            </button>

            <button
              id="tab-nav-odontogram"
              onClick={() => handleTabClick('odontogram')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentActive === 'odontogram'
                  ? 'bg-[#4A5D4E] text-white shadow-xs'
                  : 'text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2]'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{t('nav.odontogram')}</span>
            </button>

            <button
              id="tab-nav-schedule"
              onClick={() => handleTabClick('schedule')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentActive === 'schedule'
                  ? 'bg-[#4A5D4E] text-white shadow-xs'
                  : 'text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('nav.schedule')}</span>
            </button>

            <button
              id="tab-nav-billing"
              onClick={() => handleTabClick('billing')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentActive === 'billing'
                  ? 'bg-[#4A5D4E] text-white shadow-xs'
                  : 'text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{t('nav.billing')}</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher Button (ES / EN) */}
            <div 
              id="language-switcher-group"
              className="flex items-center bg-white border border-[#E9E9E2] rounded-xl p-0.5 shadow-2xs"
            >
              <button
                id="btn-lang-es"
                onClick={() => setLanguage('es')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'es'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2]'
                }`}
                title="Español (ES)"
              >
                <span className="text-xs tracking-wider">ES</span>
              </button>
              <button
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2]'
                }`}
                title="English (EN)"
              >
                <span className="text-xs tracking-wider">EN</span>
              </button>
            </div>

            {/* HIPAA / GDPR Privacy Mask Toggle */}
            <button
              id="btn-toggle-privacy-mode"
              onClick={handleTogglePrivacy}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                isPrivacyMode
                  ? 'bg-[#DDE5B6] border-[#A3B18A] text-[#4A5D4E] font-semibold'
                  : 'bg-white border-[#E9E9E2] text-[#6B705C] hover:text-[#2D332D] hover:bg-[#F8F7F2]'
              }`}
              title={isPrivacyMode ? t('nav.privacy.title.hidden') : t('nav.privacy.title.visible')}
            >
              {isPrivacyMode ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#4A5D4E]" />
                  <span className="hidden lg:inline">{t('nav.privacy.hidden')}</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 text-[#6B705C]" />
                  <span className="hidden lg:inline">{t('nav.privacy.visible')}</span>
                </>
              )}
            </button>

            {/* AI Clinical Copilot Trigger */}
            <button
              id="btn-open-ai-copilot"
              onClick={handleOpenCopilot}
              className="flex items-center gap-1.5 bg-[#DDE5B6] hover:bg-[#D4DE9F] text-[#4A5D4E] border border-[#A3B18A]/50 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              title={t('nav.copilot.tooltip')}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
              <span className="hidden sm:inline">{t('nav.copilot')}</span>
            </button>

            {/* Profile Avatar / Exit Button */}
            <button
              id="btn-nav-user"
              onClick={handleGoHome}
              className="flex items-center gap-2 bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2] p-1 pr-3 rounded-xl text-xs text-[#2D332D] transition-colors cursor-pointer"
              title={t('nav.user.tooltip')}
            >
              <div className="w-6 h-6 rounded-full bg-[#4A5D4E] text-white flex items-center justify-center text-[10px] font-bold">
                {doctorName.charAt(0) || 'D'}
              </div>
              <span className="hidden sm:inline max-w-[110px] truncate font-medium text-[#2D332D]">
                {doctorName.split(',')[0]}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-[#E9E9E2] overflow-x-auto gap-1.5 text-xs">
          <button
            onClick={() => handleTabClick('triage')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium ${
              currentActive === 'triage' ? 'bg-[#4A5D4E] text-white' : 'text-[#6B705C] bg-white border border-[#E9E9E2]'
            }`}
          >
            {t('nav.triage')} ({triageCount})
          </button>
          <button
            onClick={() => handleTabClick('patients')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium ${
              currentActive === 'patients' || currentActive === 'patient_detail' ? 'bg-[#4A5D4E] text-white' : 'text-[#6B705C] bg-white border border-[#E9E9E2]'
            }`}
          >
            {t('nav.patients')}
          </button>
          <button
            onClick={() => handleTabClick('odontogram')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium ${
              currentActive === 'odontogram' ? 'bg-[#4A5D4E] text-white' : 'text-[#6B705C] bg-white border border-[#E9E9E2]'
            }`}
          >
            {t('nav.odontogram')}
          </button>
          <button
            onClick={() => handleTabClick('schedule')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium ${
              currentActive === 'schedule' ? 'bg-[#4A5D4E] text-white' : 'text-[#6B705C] bg-white border border-[#E9E9E2]'
            }`}
          >
            {t('nav.schedule')}
          </button>
          <button
            onClick={() => handleTabClick('billing')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium ${
              currentActive === 'billing' ? 'bg-[#4A5D4E] text-white' : 'text-[#6B705C] bg-white border border-[#E9E9E2]'
            }`}
          >
            {t('nav.billing')}
          </button>
        </div>

      </div>
    </header>
  );
};
