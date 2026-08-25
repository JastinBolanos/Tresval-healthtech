import React, { useState } from 'react';
import { 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  UserPlus, 
  Filter, 
  Stethoscope, 
  Heart, 
  Thermometer, 
  Sparkles, 
  ChevronRight, 
  Bed, 
  ShieldAlert,
  Search,
  Download
} from 'lucide-react';
import { Patient, TriageLevel } from '../types';
import { maskNationalId, maskPhone } from '../utils/privacy';
import { useLanguage } from '../context/LanguageContext';
import { exportService } from '../services/export.service';

interface TriageDeskViewProps {
  patients: Patient[];
  isPrivacyMode: boolean;
  onOpenNewTriage: () => void;
  onSelectPatient: (patient: Patient) => void;
  onOpenOdontogram: (patient: Patient) => void;
  onUpdatePatientStatus: (patientId: string, newStatus: Patient['currentStatus']) => void;
}

export const TriageDeskView: React.FC<TriageDeskViewProps> = ({
  patients,
  isPrivacyMode,
  onOpenNewTriage,
  onSelectPatient,
  onOpenOdontogram,
  onUpdatePatientStatus,
}) => {
  const { language, t, tTriageBadge, tClinicalText } = useLanguage();
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<TriageLevel | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all patients currently in triage or urgent status
  const triagePatients = patients.filter((p) => p.currentTriage);

  const filteredPatients = triagePatients.filter((p) => {
    if (!p.currentTriage) return false;
    const matchesLevel = selectedLevelFilter === 'all' || p.currentTriage.level === selectedLevelFilter;
    const matchesSearch = 
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.currentTriage.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  // Calculate triage statistics
  const level1And2Count = triagePatients.filter(p => p.currentTriage && p.currentTriage.level <= 2).length;
  const level3Count = triagePatients.filter(p => p.currentTriage && p.currentTriage.level === 3).length;
  const waitingCount = triagePatients.filter(p => p.currentTriage?.status === 'waiting').length;

  const getTriageBadge = (level: TriageLevel) => {
    const localized = tTriageBadge(level);
    switch (level) {
      case 1:
        return {
          bg: 'bg-[#FDF0EC] border-[#D4A373] text-[#A25032]',
          dot: 'bg-[#A25032] animate-ping',
          label: localized.label,
          time: localized.time
        };
      case 2:
        return {
          bg: 'bg-[#FDF0EC] border-[#D4A373] text-[#A25032]',
          dot: 'bg-[#A25032]',
          label: localized.label,
          time: localized.time
        };
      case 3:
        return {
          bg: 'bg-[#FDF9EE] border-[#D4A373] text-[#976C24]',
          dot: 'bg-[#D4A373]',
          label: localized.label,
          time: localized.time
        };
      case 4:
        return {
          bg: 'bg-[#F4F7EE] border-[#A3B18A] text-[#4A5D4E]',
          dot: 'bg-[#4A5D4E]',
          label: localized.label,
          time: localized.time
        };
      case 5:
      default:
        return {
          bg: 'bg-[#F8F7F2] border-[#E9E9E2] text-[#6B705C]',
          dot: 'bg-[#A3B18A]',
          label: localized.label,
          time: localized.time
        };
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E9E2] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white shadow-xs">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#2D332D] tracking-tight">
                {t('triage.title')}
              </h1>
              <p className="text-xs text-[#6B705C] mt-0.5">
                {t('triage.desc')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-triage-export-csv"
            onClick={() => {
              const triageList: Array<{ patient: Patient; triage: NonNullable<Patient['currentTriage']> }> = [];
              patients.forEach(p => {
                if (p.currentTriage) {
                  triageList.push({ patient: p, triage: p.currentTriage });
                }
              });
              exportService.exportTriageQueueCsv(triageList);
            }}
            className="flex items-center gap-1.5 bg-[#F8F7F2] hover:bg-[#E9E9E2] text-[#2D332D] px-3.5 py-2.5 rounded-2xl font-semibold text-xs border border-[#E9E9E2] transition-colors cursor-pointer"
            title={language === 'en' ? 'Export Queue CSV' : 'Exportar Guardia CSV'}
          >
            <Download className="w-4 h-4 text-[#4A5D4E]" />
            <span>CSV</span>
          </button>
          <button
            id="btn-triage-new-intake"
            onClick={onOpenNewTriage}
            className="flex items-center gap-2 bg-[#4A5D4E] hover:bg-[#3E4D41] text-white px-5 py-2.5 rounded-2xl font-semibold text-xs shadow-sm transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span>{t('triage.btn.new')}</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards - Natural Tones Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#E9E9E2] rounded-[24px] p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#A3B18A] font-bold uppercase tracking-wider">{t('triage.kpi.waiting')}</span>
            <div className="text-3xl font-light text-[#2D332D] mt-1">{waitingCount}</div>
            <span className="text-[11px] text-[#4A5D4E] font-medium">{t('triage.kpi.waiting_desc')}</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#F8F7F2] border border-[#E9E9E2] flex items-center justify-center text-[#4A5D4E]">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#E9E9E2] rounded-[24px] p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#D4A373] font-bold uppercase tracking-wider">{t('triage.kpi.l1_l2')}</span>
            <div className="text-3xl font-light text-[#D4A373] mt-1">{level1And2Count}</div>
            <span className="text-[11px] text-[#D4A373] font-medium">{t('triage.kpi.immediate')}</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#FDF0EC] border border-[#D4A373]/30 flex items-center justify-center text-[#A25032]">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#E9E9E2] rounded-[24px] p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#A3B18A] font-bold uppercase tracking-wider">{t('triage.kpi.l3')}</span>
            <div className="text-3xl font-light text-[#2D332D] mt-1">{level3Count}</div>
            <span className="text-[11px] text-[#6B705C] font-medium">{t('triage.kpi.l3_desc')}</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#FDF9EE] border border-[#D4A373]/30 flex items-center justify-center text-[#976C24]">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#DDE5B6] rounded-[24px] p-5 shadow-xs flex items-center justify-between text-[#4A5D4E]">
          <div>
            <span className="text-[10px] text-[#4A5D4E]/80 font-bold uppercase tracking-wider">{t('triage.kpi.active_boxes')}</span>
            <div className="text-3xl font-light text-[#4A5D4E] mt-1">
              9 <span className="text-xs font-normal text-[#4A5D4E]/70">/ 12</span>
            </div>
            <span className="text-[11px] text-[#4A5D4E] font-medium">{t('triage.kpi.free_boxes')}</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/60 border border-[#A3B18A]/40 flex items-center justify-center text-[#4A5D4E]">
            <Bed className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white border border-[#E9E9E2] p-3.5 rounded-[20px] shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          <span className="text-[#6B705C] font-semibold flex items-center gap-1 mr-1 text-[11px]">
            <Filter className="w-3.5 h-3.5 text-[#4A5D4E]" /> {t('triage.filter.scale')}
          </span>
          <button
            id="filter-triage-all"
            onClick={() => setSelectedLevelFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
              selectedLevelFilter === 'all' 
                ? 'bg-[#4A5D4E] text-white shadow-xs' 
                : 'text-[#6B705C] hover:bg-[#F8F7F2]'
            }`}
          >
            {t('triage.filter.all')} ({triagePatients.length})
          </button>
          <button
            id="filter-triage-l2"
            onClick={() => setSelectedLevelFilter(2)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedLevelFilter === 2 
                ? 'bg-[#A25032] text-white shadow-xs' 
                : 'text-[#A25032] hover:bg-[#FDF0EC]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#A25032]" /> {t('triage.filter.l2')} ({triagePatients.filter(p => p.currentTriage?.level === 2).length})
          </button>
          <button
            id="filter-triage-l3"
            onClick={() => setSelectedLevelFilter(3)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedLevelFilter === 3 
                ? 'bg-[#D4A373] text-white shadow-xs' 
                : 'text-[#976C24] hover:bg-[#FDF9EE]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#D4A373]" /> {t('triage.filter.l3')} ({triagePatients.filter(p => p.currentTriage?.level === 3).length})
          </button>
          <button
            id="filter-triage-l4"
            onClick={() => setSelectedLevelFilter(4)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedLevelFilter === 4 
                ? 'bg-[#4A5D4E] text-white shadow-xs' 
                : 'text-[#4A5D4E] hover:bg-[#F4F7EE]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#4A5D4E]" /> {t('triage.filter.l4')} ({triagePatients.filter(p => p.currentTriage?.level === 4).length})
          </button>
          <button
            id="filter-triage-l5"
            onClick={() => setSelectedLevelFilter(5)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              selectedLevelFilter === 5 
                ? 'bg-[#6B705C] text-white shadow-xs' 
                : 'text-[#6B705C] hover:bg-[#F8F7F2]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#A3B18A]" /> {t('triage.filter.l5')} ({triagePatients.filter(p => p.currentTriage?.level === 5).length})
          </button>
        </div>

        <div className="relative">
          <input
            id="search-triage-input"
            type="text"
            placeholder={t('triage.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-1.5 text-xs text-[#2D332D] placeholder-[#6B705C] focus:outline-none focus:border-[#4A5D4E]"
          />
        </div>
      </div>

      {/* Patient Queue Cards */}
      <div className="space-y-4">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E9E9E2] rounded-[32px] shadow-xs">
            <CheckCircle2 className="w-12 h-12 text-[#4A5D4E] mx-auto opacity-70 mb-3" />
            <h3 className="text-base font-bold text-[#2D332D]">{t('triage.empty.title')}</h3>
            <p className="text-xs text-[#6B705C] mt-1 max-w-sm mx-auto">
              {t('triage.empty.desc')}
            </p>
          </div>
        ) : (
          filteredPatients.map((patient) => {
            const triage = patient.currentTriage!;
            const badge = getTriageBadge(triage.level);

            return (
              <div
                key={patient.id}
                id={`triage-card-${patient.id}`}
                className="bg-white border border-[#E9E9E2] hover:border-[#A3B18A] rounded-[28px] p-6 shadow-xs transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  {/* Left Patient Info */}
                  <div className="space-y-3.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badge.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                      
                      <span className="text-[11px] font-mono text-[#6B705C] bg-[#F8F7F2] px-2.5 py-0.5 rounded-full border border-[#E9E9E2]">
                        MRN: {patient.mrn}
                      </span>

                      <span className="text-[11px] font-mono text-[#4A5D4E] bg-[#DDE5B6]/50 px-2.5 py-0.5 rounded-full border border-[#A3B18A]/40 font-semibold">
                        Box: {triage.assignedBox}
                      </span>

                      <span className="text-[11px] text-[#6B705C] flex items-center gap-1 ml-auto lg:ml-0">
                        <Clock className="w-3.5 h-3.5 text-[#A3B18A]" />
                        {t('triage.card.est_wait')} <strong className="text-[#2D332D] font-mono">{triage.estimatedWaitMinutes} {t('triage.card.min')}</strong>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-xl font-serif font-bold text-[#2D332D] tracking-tight">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <span className="text-xs text-[#6B705C]">
                        {patient.age} {t('triage.card.years')} • {patient.gender === 'F' ? t('triage.card.gender.female') : t('triage.card.gender.male')} • {t('triage.card.group')} {patient.bloodType}
                      </span>
                      <span className="text-xs text-[#6B705C]">
                        {t('triage.card.dni')} <strong className="text-[#2D332D] font-mono">{maskNationalId(patient.nationalId, isPrivacyMode)}</strong>
                      </span>
                      <span className="text-xs text-[#6B705C]">
                        {t('triage.card.phone')} <strong className="text-[#2D332D] font-mono">{maskPhone(patient.phone, isPrivacyMode)}</strong>
                      </span>
                    </div>

                    {/* Chief Complaint Box in Natural Tones */}
                    <div className="bg-[#F8F7F2] border border-[#E9E9E2] rounded-2xl p-4">
                      <div className="text-xs font-semibold text-[#4A5D4E] mb-1 flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-[#4A5D4E]" />
                        {t('triage.card.complaint_label')}
                      </div>
                      <p className="text-sm text-[#2D332D] leading-relaxed font-medium">
                        "{tClinicalText(triage.chiefComplaint)}"
                      </p>
                      <p className="text-xs text-[#6B705C] mt-1">
                        {tClinicalText(triage.symptoms)}
                      </p>
                    </div>

                    {/* Red Flags & Allergy Alerts */}
                    <div className="flex flex-wrap items-center gap-2">
                      {patient.allergies.map((allergy, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-[#FDF0EC] border border-[#D4A373] text-[#A25032]">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#A25032]" />
                          {t('triage.card.allergy')} {allergy}
                        </span>
                      ))}
                      {triage.redFlags.map((flag, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FDF9EE] border border-[#D4A373] text-[#976C24]">
                          <ShieldAlert className="w-3.5 h-3.5 text-[#D4A373]" />
                          {tClinicalText(flag)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Section: Vitals Grid & Action Buttons */}
                  <div className="lg:w-80 flex flex-col justify-between gap-4 bg-[#F8F7F2] border border-[#E9E9E2] rounded-[24px] p-5 shrink-0">
                    
                    {/* Vital Signs */}
                    <div>
                      <div className="text-[11px] font-bold text-[#A3B18A] uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>{t('triage.card.vitals')}</span>
                        <span className="text-[#4A5D4E] font-mono text-[10px] flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E]" /> {t('triage.card.monitor_active')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white border border-[#E9E9E2] rounded-xl p-2.5 shadow-2xs">
                          <span className="text-[10px] text-[#6B705C] flex items-center gap-1">
                            <Heart className="w-3 h-3 text-[#A25032]" /> {t('triage.card.bp')}
                          </span>
                          <div className="font-mono font-bold text-[#2D332D] text-sm mt-0.5">{triage.vitals.bp}</div>
                        </div>

                        <div className="bg-white border border-[#E9E9E2] rounded-xl p-2.5 shadow-2xs">
                          <span className="text-[10px] text-[#6B705C] flex items-center gap-1">
                            <Activity className="w-3 h-3 text-[#4A5D4E]" /> {t('triage.card.hr')}
                          </span>
                          <div className="font-mono font-bold text-[#2D332D] text-sm mt-0.5">{triage.vitals.hr} <span className="text-[10px] font-normal text-[#6B705C]">{t('triage.card.bpm')}</span></div>
                        </div>

                        <div className="bg-white border border-[#E9E9E2] rounded-xl p-2.5 shadow-2xs">
                          <span className="text-[10px] text-[#6B705C] flex items-center gap-1">
                            <Thermometer className="w-3 h-3 text-[#D4A373]" /> {t('triage.card.temp_spo2')}
                          </span>
                          <div className="font-mono font-bold text-[#2D332D] text-sm mt-0.5">
                            {triage.vitals.temp}°C • {triage.vitals.spo2}%
                          </div>
                        </div>

                        {/* EVA Pain Meter */}
                        <div className="bg-white border border-[#E9E9E2] rounded-xl p-2.5 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-[#6B705C]">{t('triage.card.pain_eva')}</span>
                            <span className={`font-mono font-bold text-xs ${
                              triage.vitals.painScore >= 8 ? 'text-[#A25032]' : triage.vitals.painScore >= 5 ? 'text-[#D4A373]' : 'text-[#4A5D4E]'
                            }`}>
                              {triage.vitals.painScore} / 10
                            </span>
                          </div>
                          <div className="w-full bg-[#F8F7F2] rounded-full h-1.5 mt-1.5 overflow-hidden border border-[#E9E9E2]">
                            <div
                              className={`h-full rounded-full transition-all ${
                                triage.vitals.painScore >= 8 ? 'bg-[#A25032]' : triage.vitals.painScore >= 5 ? 'bg-[#D4A373]' : 'bg-[#4A5D4E]'
                              }`}
                              style={{ width: `${(triage.vitals.painScore / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Diagnosis Suggestion */}
                    {triage.aiAnalysis && (
                      <div className="text-xs bg-white border border-[#E9E9E2] rounded-xl p-2.5">
                        <div className="text-[#4A5D4E] font-semibold flex items-center gap-1 text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" /> {t('triage.card.ai_diag')}
                        </div>
                        <div className="text-[#2D332D] mt-0.5 font-mono text-[10px] truncate">
                          {triage.aiAnalysis.suggestedICD10?.join(', ')}
                        </div>
                      </div>
                    )}

                    {/* Fast Action Buttons */}
                    <div className="space-y-2 pt-1 border-t border-[#E9E9E2]">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id={`btn-attend-box-${patient.id}`}
                          onClick={() => {
                            onUpdatePatientStatus(patient.id, 'in_chair');
                            onSelectPatient(patient);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold text-xs text-center transition-colors cursor-pointer shadow-xs"
                        >
                          {t('triage.btn.attend_box')}
                        </button>
                        <button
                          id={`btn-open-dental-${patient.id}`}
                          onClick={() => onOpenOdontogram(patient)}
                          className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Stethoscope className="w-3 h-3 text-[#4A5D4E]" />
                          {t('triage.btn.odontogram')}
                        </button>
                      </div>

                      <button
                        id={`btn-view-dossier-${patient.id}`}
                        onClick={() => onSelectPatient(patient)}
                        className="w-full py-1.5 text-center text-xs text-[#6B705C] hover:text-[#2D332D] flex items-center justify-center gap-1 transition-colors font-medium cursor-pointer"
                      >
                        <span>{t('triage.btn.view_dossier')}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#A3B18A]" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
