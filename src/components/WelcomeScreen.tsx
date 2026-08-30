import React, { useState } from 'react';
import { 
  Building2, 
  Stethoscope, 
  Activity, 
  Sparkles, 
  ChevronRight, 
  UserCheck, 
  CheckCircle2, 
  Calendar,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Globe,
  Lock,
  Play,
  CircleDot,
  Radio,
  Users
} from 'lucide-react';
import { StaffProfile, ClinicCampus } from '../types';
import { mockCampuses } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { LoginModal } from './LoginModal';

interface WelcomeScreenProps {
  onEnter?: (targetView: string, doctorName: string, campus: string) => void;
  onEnterApp?: () => void;
  staffProfiles?: StaffProfile[];
  campuses?: ClinicCampus[];
  selectedCampus?: ClinicCampus;
  onSelectCampus?: (campus: ClinicCampus) => void;
  selectedStaff?: StaffProfile;
  onSelectStaff?: (staff: StaffProfile) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onEnter,
  onEnterApp,
  staffProfiles = [],
  campuses = mockCampuses,
}) => {
  const { language, setLanguage, t, tSpecialty, tClinicalText } = useLanguage();
  const [selectedDoc, setSelectedDoc] = useState<string>(
    staffProfiles[0]?.name || 'Dra. Valentina Ortiz'
  );
  const [selectedCampusName, setSelectedCampusName] = useState<string>(
    campuses[0]?.name || 'Tresval Clinic Metropolitano'
  );
  const [activeTab, setActiveTab] = useState<'perfiles' | 'sedes'>('perfiles');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLaunch = (view: string = 'triage') => {
    if (onEnter) {
      onEnter(view, selectedDoc, selectedCampusName);
    } else if (onEnterApp) {
      onEnterApp();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#2D332D] flex flex-col justify-between selection:bg-[#4A5D4E] selection:text-white font-sans">
      
      {/* Top Subtle Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-[#E9E9E2]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#4A5D4E] rounded-xl flex items-center justify-center shadow-sm">
            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center relative">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-wander-dot" />
            </div>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight uppercase text-[#4A5D4E]">
              {t('app.name')}
            </span>
            <span className="ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#DDE5B6] text-[#4A5D4E] border border-[#A3B18A]/30">
              {t('app.tagline')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white border border-[#E9E9E2] px-3.5 py-1.5 rounded-full text-xs text-[#2D332D] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#4A5D4E] animate-pulse" />
            <span className="font-semibold text-[#4A5D4E]">{selectedCampusName}</span>
            <span className="text-[#A3B18A]">•</span>
            <span className="text-[#6B705C]">{t('app.network')}</span>
          </div>

          {/* Language Switcher in Welcome Header */}
          <div className="flex items-center bg-white border border-[#E9E9E2] rounded-xl p-0.5 shadow-2xs">
            <button
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
        </div>
      </header>

      {/* Main Grid Body */}
      <main className="w-full max-w-7xl mx-auto p-6 md:p-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Brand Hero & Launch Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h1 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }} 
                  className="text-[72px] sm:text-[84px] leading-[0.85] font-normal italic text-[#4A5D4E]"
                >
                  Tresval
                </h1>
                <h1 className="text-[60px] sm:text-[72px] leading-[0.9] font-light tracking-tighter text-[#2D332D]">
                  Clinic
                </h1>
                <p className="mt-5 text-base sm:text-lg text-[#6B705C] max-w-sm leading-relaxed">
                  {t('welcome.hero.sub')}
                </p>
              </div>

              {/* Live Medical Team & Network Status Strip */}
              <div className="bg-white rounded-2xl p-4 border border-[#E9E9E2] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                    </span>
                    <span className="text-xs font-bold text-[#4A5D4E] uppercase tracking-wider">
                      {activeTab === 'perfiles' 
                        ? (language === 'en' ? 'Live Medical Staff • Active Shifts' : 'Cuerpo Médico en Servicio') 
                        : (language === 'en' ? 'Hospital Campus Network' : 'Red de Sedes Hospitalarias')}
                    </span>
                  </div>
                  <div className="flex gap-1 bg-[#F8F7F2] p-0.5 rounded-lg border border-[#E9E9E2] text-[11px]">
                    <button
                      onClick={() => setActiveTab('perfiles')}
                      className={`px-2.5 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                        activeTab === 'perfiles' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C]'
                      }`}
                    >
                      {t('welcome.tab.doctors')}
                    </button>
                    <button
                      onClick={() => setActiveTab('sedes')}
                      className={`px-2.5 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                        activeTab === 'sedes' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C]'
                      }`}
                    >
                      {t('welcome.tab.campuses')}
                    </button>
                  </div>
                </div>

                {activeTab === 'perfiles' ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {staffProfiles.map((doc, idx) => {
                      const statusConfig = {
                        on_duty: {
                          dot: 'bg-emerald-500',
                          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                          label: language === 'en' ? 'In Consult' : 'En Consulta'
                        },
                        in_surgery: {
                          dot: 'bg-amber-500 animate-pulse',
                          badge: 'bg-amber-50 text-amber-700 border-amber-200',
                          label: language === 'en' ? 'In Surgery' : 'En Quirófano'
                        },
                        off_duty: {
                          dot: 'bg-slate-400',
                          badge: 'bg-slate-50 text-slate-600 border-slate-200',
                          label: language === 'en' ? 'Standby' : 'Guardia'
                        }
                      };

                      const status = doc.activeStatus ? statusConfig[doc.activeStatus] : statusConfig[idx === 1 ? 'in_surgery' : 'on_duty'];

                      return (
                        <div
                          key={doc.id}
                          className="w-full text-left p-3 rounded-xl border border-[#E9E9E2] bg-[#FAF9F6] hover:bg-white hover:border-[#D5D8CB] transition-all flex items-center gap-3 shadow-2xs group"
                        >
                          <div className="relative shrink-0">
                            <img
                              src={doc.avatar}
                              alt={doc.name}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.onerror = null;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=4A5D4E&color=fff&size=128`;
                              }}
                              className="w-10 h-10 rounded-full object-cover border border-[#A3B18A]/40 bg-[#E9E9E2]"
                            />
                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${status.dot}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-xs font-bold truncate text-[#2D332D] group-hover:text-[#4A5D4E] transition-colors">
                                {doc.name}
                              </h4>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.badge} shrink-0`}>
                                {status.label}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#6B705C] truncate mt-0.5">{tSpecialty(doc.specialty)}</p>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-[#8C927B]">
                              <span className="font-mono">{doc.licenseNumber}</span>
                              <span>•</span>
                              <span>{doc.shift || (language === 'en' ? 'Active Shift' : 'Turno Activo')}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {campuses.map((camp) => (
                      <div
                        key={camp.id}
                        className="w-full text-left p-3 rounded-xl border border-[#E9E9E2] bg-[#FAF9F6] hover:bg-white hover:border-[#D5D8CB] transition-all flex items-center justify-between shadow-2xs group"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-[#2D332D] truncate group-hover:text-[#4A5D4E] transition-colors">
                              {camp.name}
                            </h4>
                            {camp.emergencyActive && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 uppercase shrink-0">
                                24h
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#6B705C] truncate mt-0.5">{camp.city}</p>
                          <div className="flex items-center gap-3 mt-1 text-[10px] text-[#8C927B]">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {camp.occupiedChairs}/{camp.totalChairs} {language === 'en' ? 'chairs active' : 'sillones ocupados'}
                            </span>
                            <span>•</span>
                            <span>{camp.totalBeds} {language === 'en' ? 'clinical beds' : 'camas'}</span>
                          </div>
                        </div>
                        <div className="shrink-0 flex flex-col items-end justify-center">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA Enter Button and Quick Portals */}
            <div className="space-y-3 pt-2">
              <button 
                id="btn-enter-system"
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full py-4 bg-[#4A5D4E] hover:bg-[#3E4D41] text-white rounded-2xl font-semibold text-base transition-all flex items-center justify-between px-5 shadow-lg shadow-[#4A5D4E]/20 cursor-pointer group hover:scale-[1.01] active:scale-[0.99] border border-white/10"
              >
                <div className="flex items-center gap-3.5 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-base font-bold block tracking-tight">
                      {language === 'en' ? 'Sign In to Clinical System' : 'Ingresar al Sistema'}
                    </span>
                    <span className="text-[11px] font-normal text-[#DDE5B6] block">
                      {language === 'en' ? 'Authorized Clinical Workstation' : 'Acceso a Estación Clínica Autorizada'}
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* Beautiful Demonstration Banner / Button */}
              <button
                id="btn-explore-demo-welcome"
                type="button"
                onClick={() => handleLaunch('triage')}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#F4F6F0] via-[#FAF9F5] to-[#EAEFE3] hover:from-[#EDF1E7] hover:to-[#E0E7D6] border border-[#D5D8CB] transition-all flex items-center justify-between gap-3 text-left group cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4.5 h-4.5 text-[#DDE5B6]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2D332D] group-hover:text-[#4A5D4E] transition-colors leading-tight">
                      {language === 'en' 
                        ? 'Not an administrator?' 
                        : '¿No eres administrador?'}
                    </p>
                    <p className="text-[11px] text-[#6B705C] mt-0.5 leading-snug">
                      {language === 'en'
                        ? 'You can view a workflow demonstration here'
                        : 'Puedes ver una demostración del flujo de trabajo aquí'}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white border border-[#D5D8CB] flex items-center justify-center text-[#4A5D4E] group-hover:bg-[#4A5D4E] group-hover:text-white transition-all shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </button>

              {/* Direct Portal Jump Pills */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => handleLaunch('odontogram')}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2] text-center font-medium text-[#2D332D] transition-colors cursor-pointer"
                >
                  {t('welcome.quick.odontogram')}
                </button>
                <button
                  onClick={() => handleLaunch('patients')}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2] text-center font-medium text-[#2D332D] transition-colors cursor-pointer"
                >
                  {t('welcome.quick.patients')}
                </button>
                <button
                  onClick={() => handleLaunch('billing')}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2] text-center font-medium text-[#2D332D] transition-colors cursor-pointer"
                >
                  {t('welcome.quick.billing')}
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-xs text-[#A3B18A] font-semibold pt-1">
                <span>{t('welcome.tag.support')}</span>
                <span className="w-1 h-1 bg-[#A3B18A] rounded-full"></span>
                <span>{t('welcome.tag.manchester')}</span>
                <span className="w-1 h-1 bg-[#A3B18A] rounded-full"></span>
                <span>{t('welcome.tag.fdi')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Natural Tones Clinical Dashboard Showcase */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Top Card: Agenda del Día */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#E9E9E2] flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="text-xs font-bold text-[#A3B18A] uppercase tracking-[0.1em]">
                      {t('welcome.agenda.title')}
                    </h3>
                    <p className="text-xl font-medium text-[#2D332D]">
                      {t('welcome.agenda.date')}
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#DDE5B6] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#4A5D4E]">VO</div>
                    <div className="w-8 h-8 rounded-full bg-[#A3B18A] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">AR</div>
                    <div className="w-8 h-8 rounded-full bg-[#4A5D4E] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">CM</div>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  <div className="p-3.5 rounded-2xl bg-[#F8F7F2] flex items-center border-l-4 border-[#A3B18A] hover:bg-[#F3F1E8] transition-colors cursor-pointer" onClick={() => handleLaunch('schedule')}>
                    <div className="w-14 font-mono text-sm font-semibold text-[#2D332D]">09:00</div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-sm text-[#2D332D]">Dra. Valentina Ortiz</div>
                      <div className="text-xs text-[#6B705C] truncate">{tClinicalText('Implante Transalveolar')} • Box 2 • Dra. Ortiz</div>
                    </div>
                    <div className="text-[11px] px-3 py-1 bg-white rounded-full border border-[#E9E9E2] font-semibold text-[#4A5D4E] shrink-0">
                      {language === 'en' ? 'CONFIRMED' : 'CONFIRMADO'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8F7F2] flex items-center border-l-4 border-[#D4A373] hover:bg-[#F3F1E8] transition-colors cursor-pointer" onClick={() => handleLaunch('triage')}>
                    <div className="w-14 font-mono text-sm font-semibold text-[#D4A373]">10:30</div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-sm text-[#2D332D]">Marcos Pellegrini ({language === 'en' ? 'Triage Level 3' : 'Triaje Nivel 3'})</div>
                      <div className="text-xs text-[#6B705C] truncate">{tClinicalText('Dolor agudo molar 3.6')} • Box 1</div>
                    </div>
                    <div className="text-[11px] px-3 py-1 bg-white rounded-full border border-[#E9E9E2] font-semibold text-[#D4A373] shrink-0">
                      {language === 'en' ? 'WAITING' : 'EN ESPERA'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8F7F2] flex items-center border-l-4 border-[#4A5D4E] hover:bg-[#F3F1E8] transition-colors cursor-pointer" onClick={() => handleLaunch('odontogram')}>
                    <div className="w-14 font-mono text-sm font-semibold text-[#4A5D4E]">11:45</div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-sm text-[#2D332D]">Elena G. Santoro</div>
                      <div className="text-xs text-[#6B705C] truncate">{tClinicalText('Endodoncia Multirradicular & Reconstrucción')} • Box 4</div>
                    </div>
                    <div className="text-[11px] px-3 py-1 bg-white rounded-full border border-[#E9E9E2] font-semibold text-[#4A5D4E] shrink-0">
                      {language === 'en' ? 'IN CHAIR' : 'EN SILLÓN'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8F7F2] flex items-center border-l-4 border-[#A3B18A] hover:bg-[#F3F1E8] transition-colors cursor-pointer" onClick={() => handleLaunch('schedule')}>
                    <div className="w-14 font-mono text-sm font-semibold text-[#2D332D]">13:15</div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-sm text-[#2D332D]">Alejandro Garrido (DDS Valdés)</div>
                      <div className="text-xs text-[#6B705C] truncate">{tClinicalText('Cirugía Guiada Implantes Straumann BLX')} • Quirófano 02</div>
                    </div>
                    <div className="text-[11px] px-3 py-1 bg-white rounded-full border border-[#E9E9E2] font-semibold text-[#4A5D4E] shrink-0">
                      {language === 'en' ? 'CONFIRMED' : 'CONFIRMADO'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8F7F2] flex items-center border-l-4 border-[#D4A373] hover:bg-[#F3F1E8] transition-colors cursor-pointer" onClick={() => handleLaunch('schedule')}>
                    <div className="w-14 font-mono text-sm font-semibold text-[#D4A373]">14:45</div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-sm text-[#2D332D]">Martina Vidal Soler</div>
                      <div className="text-xs text-[#6B705C] truncate">{tClinicalText('Control Ortodoncia Spark + IPR')} • Box 03</div>
                    </div>
                    <div className="text-[11px] px-3 py-1 bg-white rounded-full border border-[#E9E9E2] font-semibold text-[#D4A373] shrink-0">
                      {language === 'en' ? 'WAITING' : 'EN ESPERA'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8F7F2] flex items-center border-l-4 border-[#6B705C] hover:bg-[#F3F1E8] transition-colors cursor-pointer" onClick={() => handleLaunch('patients')}>
                    <div className="w-14 font-mono text-sm font-semibold text-[#6B705C]">16:00</div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-sm text-[#2D332D]">Ignacio Herrera Benítez</div>
                      <div className="text-xs text-[#6B705C] truncate">{tClinicalText('Hemostasia Quirúrgica & Sutura Post-Extracción')} • Box 01</div>
                    </div>
                    <div className="text-[11px] px-3 py-1 bg-white rounded-full border border-[#E9E9E2] font-semibold text-[#6B705C] shrink-0">
                      {language === 'en' ? 'SCHEDULED' : 'PROGRAMADO'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8F7F2] flex items-center border-l-4 border-[#4A5D4E] hover:bg-[#F3F1E8] transition-colors cursor-pointer" onClick={() => handleLaunch('patients')}>
                    <div className="w-14 font-mono text-sm font-semibold text-[#4A5D4E]">17:15</div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-bold text-sm text-[#2D332D]">Sofia Navarro Morales</div>
                      <div className="text-xs text-[#6B705C] truncate">{tClinicalText('Control Post-Drenaje & RX Periapical')} • Box 02</div>
                    </div>
                    <div className="text-[11px] px-3 py-1 bg-white rounded-full border border-[#E9E9E2] font-semibold text-[#4A5D4E] shrink-0">
                      {language === 'en' ? 'CONFIRMED' : 'CONFIRMADO'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Row inside agenda */}
              <div className="pt-4 mt-4 border-t border-[#E9E9E2] flex items-center justify-between text-xs text-[#6B705C]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#4A5D4E]" />
                  <span>{language === 'en' ? 'Integrated Clinical AI for triage and SOAP notes' : 'IA Clínica integrada para triaje y notas SOAP'}</span>
                </div>
                <button
                  onClick={() => handleLaunch('schedule')}
                  className="text-xs font-semibold text-[#4A5D4E] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {t('welcome.agenda.see_all')} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom 2 Cards Grid: Facturación Mes + Estado Clínico */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              
              {/* Facturación Card (Dark Sage #4A5D4E) */}
              <div className="sm:col-span-7 bg-[#4A5D4E] rounded-[32px] p-6 text-white flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">
                    {t('welcome.revenue.title')}
                  </h3>
                  <div className="text-3xl font-light mb-4 text-white">$42,850.00</div>
                </div>

                <div className="flex gap-1.5 items-end h-16 pt-2">
                  <div className="flex-1 bg-white/25 rounded-t-sm h-10 hover:bg-white/40 transition-colors" title={language === 'en' ? 'Mon' : 'Lun'} />
                  <div className="flex-1 bg-white/25 rounded-t-sm h-6 hover:bg-white/40 transition-colors" title={language === 'en' ? 'Tue' : 'Mar'} />
                  <div className="flex-1 bg-white/25 rounded-t-sm h-12 hover:bg-white/40 transition-colors" title={language === 'en' ? 'Wed' : 'Mie'} />
                  <div className="flex-1 bg-white rounded-t-sm h-16 shadow-xs" title={language === 'en' ? 'Today' : 'Hoy'} />
                  <div className="flex-1 bg-white/25 rounded-t-sm h-8 hover:bg-white/40 transition-colors" title={language === 'en' ? 'Fri' : 'Vie'} />
                  <div className="flex-1 bg-white/25 rounded-t-sm h-11 hover:bg-white/40 transition-colors" title={language === 'en' ? 'Sat' : 'Sab'} />
                </div>
              </div>

              {/* Estado Clínico Card (Herb #DDE5B6) */}
              <div className="sm:col-span-5 bg-[#DDE5B6] rounded-[32px] p-6 flex flex-col justify-between text-[#4A5D4E] shadow-sm">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A5D4E]/80">
                  {t('welcome.status.title')}
                </h3>
                <div className="space-y-1">
                  <div className="text-4xl font-light text-[#4A5D4E]">88%</div>
                  <div className="text-[11px] font-semibold text-[#4A5D4E]/80 uppercase">
                    {t('welcome.status.occupancy')}
                  </div>
                  <div className="text-[11px] text-[#4A5D4E]/70 pt-1">
                    {t('welcome.status.chairs_desc')}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 border-t border-[#E9E9E2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B705C] gap-2">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#4A5D4E]" />
          <span>{t('welcome.footer.system')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{language === 'en' ? 'Manchester Triage' : 'Triaje Manchester'}</span>
          <span>•</span>
          <span>{language === 'en' ? 'FDI 32 Dental Chart' : 'Odontograma FDI 32'}</span>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onExploreDemo={(view) => handleLaunch(view || 'triage')}
      />
    </div>
  );
};
