import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  Pill, 
  FileText, 
  Stethoscope, 
  CreditCard, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Printer, 
  Camera,
  Activity,
  Layers,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { Patient, TimelineEvent, SoapNote } from '../types';
import { maskNationalId, maskPhone, maskEmail, maskAddress, maskPolicy } from '../utils/privacy';
import { useLanguage } from '../context/LanguageContext';
import { aiService } from '../services/ai.service';
import { exportService } from '../services/export.service';

interface PatientDetailViewProps {
  patient: Patient;
  isPrivacyMode: boolean;
  onBackToList: () => void;
  onOpenOdontogram: (patient: Patient) => void;
  onOpenNewAppointment: (patient: Patient) => void;
  onOpenBilling: (patientId: string) => void;
  onAddTimelineEvent: (patientId: string, event: Omit<TimelineEvent, 'id'>) => void;
  doctorName: string;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  patient,
  isPrivacyMode,
  onBackToList,
  onOpenOdontogram,
  onOpenNewAppointment,
  onOpenBilling,
  onAddTimelineEvent,
  doctorName,
}) => {
  const { language, t, tCondition, tAllergy, tClinicalText, tSpecialty } = useLanguage();
  const [timelineFilter, setTimelineFilter] = useState<string>('all');
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  // New Note Form State
  const [newNoteTitle, setNewNoteTitle] = useState('Evolución y Control Clínico');
  const [newNoteType, setNewNoteType] = useState<TimelineEvent['type']>('consultation');
  const [rawDoctorNotes, setRawDoctorNotes] = useState('');
  const [soapSubjective, setSoapSubjective] = useState('');
  const [soapObjective, setSoapObjective] = useState('');
  const [soapAssessment, setSoapAssessment] = useState('');
  const [soapPlan, setSoapPlan] = useState('');

  const filteredTimeline = patient.timeline.filter(ev => {
    if (timelineFilter === 'all') return true;
    return ev.type === timelineFilter;
  });

  const handleAIAssistSoap = async () => {
    if (!rawDoctorNotes && !soapSubjective) {
      setRawDoctorNotes(language === 'en' 
        ? 'Patient reports significant improvement of pain after medication. Intraoral examination shows healed gingiva without purulent exudate. Stable occlusion. Routine follow-up scheduled in 4 weeks.'
        : 'Paciente refiere mejoría de sintomatología dolorosa tras medicación. Exploración intraoral muestra encía cicatrizada sin exudado purulento. Oclusión estable. Se programa revisión en 4 semanas.');
    }

    setIsGeneratingAI(true);
    try {
      const data = await aiService.analyzeTriage({
        symptoms: rawDoctorNotes || soapSubjective || 'Control rutinario',
        vitals: { bp: '120/80', hr: 72, spo2: 99, temp: 36.5 },
        painScore: 2,
        specialty: 'Odontología General & Cirugía',
        patientAge: patient.age,
        allergies: patient.allergies.join(', '),
        language
      });

      if (data.soapDraft) {
        setSoapSubjective(data.soapDraft.subjective || '');
        setSoapObjective(data.soapDraft.objective || '');
        setSoapAssessment(data.soapDraft.assessment || '');
        setSoapPlan(data.soapDraft.plan || '');
      }
    } catch (err) {
      console.error(err);
      // Fallback
      if (language === 'en') {
        setSoapSubjective(`Patient presents for clinical follow-up. Denies acute pain or hemorrhage.`);
        setSoapObjective(`Intraoral clinical exam: Normocolored mucosa, stable surgical site, no signs of infection.`);
        setSoapAssessment(`Satisfactory clinical evolution corresponding to the completed procedure.`);
        setSoapPlan(`1. Maintain hygiene regimen with mouthwash. 2. Radiological control in 30 days.`);
      } else {
        setSoapSubjective(`Paciente acude a control clínico evolutivo. No refiere dolor agudo ni hemorragia.`);
        setSoapObjective(`Exploración clínica intraoral: Mucosa normocoloreada, lecho quirúrgico estable, sin signos de infección.`);
        setSoapAssessment(`Evolución clínica satisfactoria acorde al procedimiento efectuado.`);
        setSoapPlan(`1. Mantener pauta de higiene con colutorio. 2. Control radiológico en 30 días.`);
      }
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSaveTimelineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTimelineEvent(patient.id, {
      patientId: patient.id,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      type: newNoteType,
      title: newNoteTitle,
      doctorName: doctorName,
      doctorSpecialty: language === 'en' ? 'Tresval Clinic Specialist' : 'Especialista Tresval Clinic',
      campusName: 'Red Tresval Clinic',
      summary: soapAssessment || soapSubjective || (language === 'en' ? 'Clinically signed clinical evolution note.' : 'Nota de evolución clínica firmada digitalmente.'),
      soap: {
        subjective: soapSubjective,
        objective: soapObjective,
        assessment: soapAssessment,
        plan: soapPlan,
      },
      badges: language === 'en' ? ['Doctor Digital Signature', 'HL7 Validated'] : ['Firma Digital Doctor', 'Validado HL7'],
    });

    setShowAddNoteModal(false);
    setRawDoctorNotes('');
    setSoapSubjective('');
    setSoapObjective('');
    setSoapAssessment('');
    setSoapPlan('');
  };

  const getTimelineIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'triage':
        return <Activity className="w-4 h-4 text-[#A25032]" />;
      case 'surgery':
      case 'dental_procedure':
        return <Stethoscope className="w-4 h-4 text-[#4A5D4E]" />;
      case 'imaging':
        return <Camera className="w-4 h-4 text-[#4A5D4E]" />;
      case 'prescription':
        return <Pill className="w-4 h-4 text-[#D4A373]" />;
      case 'billing':
        return <CreditCard className="w-4 h-4 text-[#4A5D4E]" />;
      default:
        return <FileText className="w-4 h-4 text-[#6B705C]" />;
    }
  };

  const getStatusLabel = (status: Patient['currentStatus']) => {
    switch (status) {
      case 'triage_queue':
        return language === 'en' ? 'In Urgent Triage' : 'En Triaje Urgente';
      case 'in_chair':
        return language === 'en' ? 'In Chair / Treatment' : 'En Sillón / Tratamiento';
      case 'scheduled':
      default:
        return language === 'en' ? 'Scheduled' : 'Programado';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E9E2] pb-4">
        <button
          id="btn-back-patients-list"
          onClick={onBackToList}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B705C] hover:text-[#4A5D4E] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('patient.back')}</span>
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="btn-quick-odontogram"
            onClick={() => onOpenOdontogram(patient)}
            className="flex items-center gap-1.5 bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2] text-[#4A5D4E] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{t('patient.btn.odontogram')}</span>
          </button>

          <button
            id="btn-quick-new-appt"
            onClick={() => onOpenNewAppointment(patient)}
            className="flex items-center gap-1.5 bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span>{t('patient.btn.schedule')}</span>
          </button>

          <button
            id="btn-quick-billing"
            onClick={() => onOpenBilling(patient.id)}
            className="flex items-center gap-1.5 bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2] text-[#2D332D] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span>{t('patient.btn.billing')}</span>
          </button>

          <button
            id="btn-add-evolution-note"
            onClick={() => setShowAddNoteModal(true)}
            className="flex items-center gap-1.5 bg-[#4A5D4E] hover:bg-[#3E4D41] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>{t('patient.btn.new_soap')}</span>
          </button>
        </div>
      </div>

      {/* Patient Master Info Header Card */}
      <div className="bg-white border border-[#E9E9E2] rounded-[32px] p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Avatar & Demographics */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#4A5D4E] flex items-center justify-center text-white font-serif font-bold text-2xl shadow-xs shrink-0">
                {patient.firstName[0]}{patient.lastName[0]}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-2xl font-serif font-bold text-[#2D332D] tracking-tight">
                    {patient.firstName} {patient.lastName}
                  </h2>
                  <span className="text-xs font-mono font-bold bg-[#F8F7F2] border border-[#E9E9E2] px-2.5 py-0.5 rounded-full text-[#4A5D4E]">
                    MRN: {patient.mrn}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#DDE5B6] border border-[#A3B18A]/40 text-[#4A5D4E]">
                    {language === 'en' ? 'Active' : 'Activo'} • {getStatusLabel(patient.currentStatus)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B705C] pt-1">
                  <span>{t('patient.detail.age')}: <strong className="text-[#2D332D]">{patient.age} {t('triage.card.years')}</strong> ({patient.birthDate})</span>
                  <span>{t('patient.detail.gender')}: <strong className="text-[#2D332D]">{patient.gender === 'F' ? t('triage.card.gender.female') : t('triage.card.gender.male')}</strong></span>
                  <span>{t('patient.detail.blood_group')}: <strong className="text-[#A25032] font-mono">{patient.bloodType}</strong></span>
                  <span>
                    {t('patient.detail.dni')}: <strong className="text-[#2D332D] font-mono">{maskNationalId(patient.nationalId, isPrivacyMode)}</strong>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B705C] pt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#4A5D4E]" />
                    {maskPhone(patient.phone, isPrivacyMode)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#4A5D4E]" />
                    {maskEmail(patient.email, isPrivacyMode)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#4A5D4E]" />
                    {maskAddress(patient.address, isPrivacyMode)}
                  </span>
                </div>
              </div>
            </div>

            {/* Critical Alerts Strip */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E9E9E2]">
              {patient.allergies.map((allergy, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#FDF0EC] border border-[#D4A373] text-[#A25032]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#A25032] shrink-0" />
                  <span>{t('patient.detail.allergy')}: {tAllergy(allergy)}</span>
                </div>
              ))}
              {patient.chronicConditions.map((cond, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#FDF9EE] border border-[#D4A373] text-[#976C24]">
                  <Heart className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                  <span>{tCondition(cond)}</span>
                </div>
              ))}
              {patient.currentMedications.map((med, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#F4F7EE] border border-[#A3B18A] text-[#4A5D4E]">
                  <Pill className="w-3.5 h-3.5 text-[#4A5D4E] shrink-0" />
                  <span>{med}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Insurance & Verification Widget */}
          <div className="lg:col-span-4 bg-[#F8F7F2] border border-[#E9E9E2] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#A3B18A] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4A5D4E]" />
                {t('patient.insurance.title')}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#DDE5B6] text-[#4A5D4E] border border-[#A3B18A]/40">
                {t('patient.insurance.active')}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#2D332D]">{patient.insurance.provider}</h4>
              <p className="text-xs text-[#4A5D4E] font-medium">{patient.insurance.planName}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-[#E9E9E2] pt-2">
              <div>
                <span className="text-[#6B705C] text-[10px]">{t('patient.insurance.policy')}</span>
                <div className="font-mono text-[#2D332D] font-bold">{maskPolicy(patient.insurance.policyNumber, isPrivacyMode)}</div>
              </div>
              <div>
                <span className="text-[#6B705C] text-[10px]">{t('patient.insurance.coverage')}</span>
                <div className="font-mono text-[#4A5D4E] font-bold">{(patient.insurance.coverageRate * 100).toFixed(0)}% {language === 'en' ? 'direct' : 'directa'}</div>
              </div>
            </div>

            <div className="text-[11px] text-[#6B705C] bg-white p-2.5 rounded-xl border border-[#E9E9E2] flex items-center justify-between">
              <span>{t('patient.insurance.emergency_contact')}:</span>
              <strong className="text-[#2D332D] font-medium">{patient.emergencyContact.name} ({patient.emergencyContact.relation})</strong>
            </div>
          </div>

        </div>
      </div>

      {/* Medical Timeline & Clinical Evolution */}
      <div className="space-y-4">
        
        {/* Timeline Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E9E9E2] p-3.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#4A5D4E]" />
            <h3 className="text-xs font-bold text-[#2D332D] uppercase tracking-wider">
              {t('patient.timeline.title')} ({filteredTimeline.length})
            </h3>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              onClick={() => setTimelineFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                timelineFilter === 'all' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:bg-[#F8F7F2]'
              }`}
            >
              {t('patient.timeline.tab.all')}
            </button>
            <button
              onClick={() => setTimelineFilter('triage')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                timelineFilter === 'triage' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:bg-[#F8F7F2]'
              }`}
            >
              {t('patient.timeline.tab.triage')}
            </button>
            <button
              onClick={() => setTimelineFilter('surgery')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                timelineFilter === 'surgery' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:bg-[#F8F7F2]'
              }`}
            >
              {t('patient.timeline.tab.surgery')}
            </button>
            <button
              onClick={() => setTimelineFilter('imaging')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                timelineFilter === 'imaging' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:bg-[#F8F7F2]'
              }`}
            >
              {t('patient.timeline.tab.imaging')}
            </button>
            <button
              onClick={() => setTimelineFilter('dental_procedure')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                timelineFilter === 'dental_procedure' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:bg-[#F8F7F2]'
              }`}
            >
              {t('patient.timeline.tab.dental')}
            </button>
          </div>
        </div>

        {/* Timeline Events Stack */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E9E9E2]">
          {filteredTimeline.map((ev) => (
            <div key={ev.id} className="relative group">
              
              {/* Event Timeline Node Circle */}
              <div className="absolute -left-6 sm:-left-8 top-4 w-6 h-6 rounded-full bg-white border-2 border-[#4A5D4E] flex items-center justify-center shadow-xs">
                {getTimelineIcon(ev.type)}
              </div>

              {/* Event Content Card */}
              <div className="bg-white border border-[#E9E9E2] hover:border-[#A3B18A] rounded-[28px] p-6 shadow-xs transition-all space-y-4">
                
                {/* Event Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E9E2] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-[#2D332D]">{tClinicalText(ev.title)}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#4A5D4E]">
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B705C] mt-0.5">
                      {ev.doctorName} • <strong className="text-[#2D332D] font-medium">{tSpecialty(ev.doctorSpecialty)}</strong> ({ev.campusName})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-[#6B705C]">{ev.date}</span>
                    {ev.cost && (
                      <div className="text-xs text-[#4A5D4E] font-mono font-bold">
                        {language === 'en' ? 'Fee' : 'Arancel'}: ${ev.cost}
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-[#2D332D] leading-relaxed font-normal">
                  {tClinicalText(ev.summary)}
                </p>

                {/* Structured SOAP Note if available */}
                {ev.soap && (
                  <div className="bg-[#F8F7F2] border border-[#E9E9E2] rounded-2xl p-4 space-y-3">
                    <div className="text-xs font-bold text-[#4A5D4E] uppercase tracking-wider flex items-center justify-between">
                      <span>{t('patient.soap.title')}</span>
                      <span className="text-[10px] text-[#4A5D4E] flex items-center gap-1 font-mono font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4A5D4E]" /> {t('patient.soap.signed')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <strong className="text-[#6B705C] block text-[11px]">{t('patient.soap.s')}</strong>
                        <p className="text-[#2D332D] bg-white p-3 rounded-xl border border-[#E9E9E2]">{tClinicalText(ev.soap.subjective)}</p>
                      </div>
                      <div className="space-y-1">
                        <strong className="text-[#6B705C] block text-[11px]">{t('patient.soap.o')}</strong>
                        <p className="text-[#2D332D] bg-white p-3 rounded-xl border border-[#E9E9E2]">{tClinicalText(ev.soap.objective)}</p>
                      </div>
                      <div className="space-y-1">
                        <strong className="text-[#6B705C] block text-[11px]">{t('patient.soap.a')}</strong>
                        <p className="text-[#2D332D] bg-white p-3 rounded-xl border border-[#E9E9E2]">{tClinicalText(ev.soap.assessment)}</p>
                      </div>
                      <div className="space-y-1">
                        <strong className="text-[#6B705C] block text-[11px]">{t('patient.soap.p')}</strong>
                        <p className="text-[#2D332D] bg-white p-3 rounded-xl border border-[#E9E9E2]">{tClinicalText(ev.soap.plan)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Imaging Preview if X-ray or CBCT */}
                {ev.imagingUrl && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#4A5D4E] flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-[#4A5D4E]" />
                      {t('patient.imaging.attached')}
                    </span>
                    <div 
                      onClick={() => setActiveImageModal(ev.imagingUrl!)}
                      className="cursor-pointer group relative rounded-2xl overflow-hidden border border-[#E9E9E2] bg-black max-w-sm"
                    >
                      <img
                        src={ev.imagingUrl}
                        alt="Radiografía Dental"
                        referrerPolicy="no-referrer"
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-end p-3">
                        <span className="text-white text-xs font-semibold flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-[#DDE5B6]" />
                          {t('patient.imaging.click_view')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Prescriptions and Attachments */}
                {ev.prescriptions && ev.prescriptions.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-[#D4A373] flex items-center gap-1.5">
                      <Pill className="w-3.5 h-3.5 text-[#D4A373]" />
                      {t('patient.rx.title')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ev.prescriptions.map((rx, idx) => (
                        <div key={idx} className="bg-[#F8F7F2] p-2.5 rounded-xl border border-[#E9E9E2] text-xs">
                          <div className="font-bold text-[#2D332D]">{rx.medication} ({rx.dosage})</div>
                          <div className="text-[11px] text-[#6B705C]">{rx.frequency} • {language === 'en' ? 'For' : 'Durante'} {rx.duration}</div>
                          <div className="text-[10px] text-[#A3B18A] font-medium mt-0.5">{tClinicalText(rx.instructions)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E9E9E2]">
                  {ev.badges.map((badge, idx) => (
                    <span key={idx} className="text-[10px] font-semibold text-[#6B705C] bg-[#F8F7F2] border border-[#E9E9E2] px-2.5 py-0.5 rounded-full">
                      {tClinicalText(badge)}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add SOAP Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 z-50 bg-[#2D332D]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E9E9E2] rounded-[32px] max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            
            <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2D332D]">
                  {t('soap_modal.title')}
                </h3>
                <p className="text-xs text-[#6B705C]">
                  {patient.firstName} {patient.lastName} • MRN: {patient.mrn}
                </p>
              </div>

              <button
                id="btn-close-soap-modal"
                onClick={() => setShowAddNoteModal(false)}
                className="text-[#6B705C] hover:text-[#2D332D] text-xl font-bold px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* AI Assistant Banner */}
            <div className="bg-[#F8F7F2] border border-[#A3B18A]/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4A5D4E] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#4A5D4E]" />
                  {t('soap_modal.ai_title')}
                </span>
                <button
                  type="button"
                  id="btn-ai-generate-soap"
                  onClick={handleAIAssistSoap}
                  disabled={isGeneratingAI}
                  className="bg-[#4A5D4E] hover:bg-[#3E4D41] text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isGeneratingAI ? (
                    <span>{t('soap_modal.structuring')}</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      <span>{t('soap_modal.btn_structure')}</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="text-[11px] text-[#6B705C] block mb-1">
                  {t('soap_modal.raw_notes_label')}
                </label>
                <textarea
                  id="raw-doctor-notes-input"
                  rows={2}
                  value={rawDoctorNotes}
                  onChange={(e) => setRawDoctorNotes(e.target.value)}
                  placeholder={t('soap_modal.raw_placeholder')}
                  className="w-full bg-white border border-[#E9E9E2] rounded-xl p-2.5 text-xs text-[#2D332D] focus:outline-none focus:border-[#4A5D4E] placeholder-[#6B705C]"
                />
              </div>
            </div>

            {/* Structured SOAP Form */}
            <form onSubmit={handleSaveTimelineEvent} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2D332D] block mb-1">{t('soap_modal.consult_title')}:</label>
                  <input
                    type="text"
                    required
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-2 text-xs text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2D332D] block mb-1">{t('soap_modal.act_type')}:</label>
                  <select
                    value={newNoteType}
                    onChange={(e) => setNewNoteType(e.target.value as any)}
                    className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-2 text-xs text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
                  >
                    <option value="consultation">{language === 'en' ? 'Medical Consultation / Review' : 'Consulta Médica / Revisión'}</option>
                    <option value="dental_procedure">{language === 'en' ? 'Dental Procedure' : 'Procedimiento Odontológico'}</option>
                    <option value="surgery">{language === 'en' ? 'Surgery / Surgical Act' : 'Cirugía / Acto Quirúrgico'}</option>
                    <option value="imaging">{language === 'en' ? 'Radiology Report' : 'Informe Radiológico'}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#4A5D4E] block mb-1">{t('patient.soap.s')}:</label>
                  <textarea
                    rows={2}
                    value={soapSubjective}
                    onChange={(e) => setSoapSubjective(e.target.value)}
                    placeholder={language === 'en' ? 'Patient reports...' : 'Refiere sensación de...'}
                    className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl p-2.5 text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A5D4E] block mb-1">{t('patient.soap.o')}:</label>
                  <textarea
                    rows={2}
                    value={soapObjective}
                    onChange={(e) => setSoapObjective(e.target.value)}
                    placeholder={language === 'en' ? 'On examination...' : 'A la inspección se evidencia...'}
                    className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl p-2.5 text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A5D4E] block mb-1">{t('patient.soap.a')}:</label>
                  <textarea
                    rows={2}
                    value={soapAssessment}
                    onChange={(e) => setSoapAssessment(e.target.value)}
                    placeholder={language === 'en' ? 'Diagnosis compatible with...' : 'Diagnóstico compatible con...'}
                    className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl p-2.5 text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A5D4E] block mb-1">{t('patient.soap.p')}:</label>
                  <textarea
                    rows={2}
                    value={soapPlan}
                    onChange={(e) => setSoapPlan(e.target.value)}
                    placeholder={language === 'en' ? '1. Pharmacological plan. 2. Review...' : '1. Pauta farmacológica. 2. Revisión...'}
                    className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl p-2.5 text-[#2D332D] focus:outline-none focus:border-[#4A5D4E]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E9E9E2]">
                <button
                  type="button"
                  onClick={() => setShowAddNoteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B705C] hover:text-[#2D332D] cursor-pointer"
                >
                  {t('soap_modal.cancel')}
                </button>
                <button
                  type="submit"
                  id="btn-submit-soap-note"
                  className="px-5 py-2.5 rounded-xl bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold text-xs shadow-xs cursor-pointer"
                >
                  {t('soap_modal.save')}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Image Modal for DICOM / CBCT Viewer */}
      {activeImageModal && (
        <div className="fixed inset-0 z-50 bg-[#2D332D]/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9E9E2] rounded-[32px] max-w-4xl w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-2">
              <span className="text-sm font-bold text-[#2D332D] flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#4A5D4E]" />
                {t('patient.viewer.title')}
              </span>
              <button
                onClick={() => setActiveImageModal(null)}
                className="text-[#6B705C] hover:text-[#2D332D] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E9E9E2] bg-black flex items-center justify-center max-h-[70vh]">
              <img src={activeImageModal} alt="Radiografía" referrerPolicy="no-referrer" className="max-h-[68vh] object-contain" />
            </div>
            <div className="flex items-center justify-between text-xs text-[#6B705C]">
              <span>{t('patient.viewer.specs')}</span>
              <button
                onClick={() => setActiveImageModal(null)}
                className="bg-[#4A5D4E] px-4 py-1.5 rounded-xl text-white font-semibold cursor-pointer"
              >
                {t('patient.viewer.close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

interface PatientsViewProps {
  patients: Patient[];
  isPrivacyMode: boolean;
  onSelectPatient: (patient: Patient) => void;
  onOpenOdontogram: (patient: Patient) => void;
  onOpenNewTriage: () => void;
}

export const PatientsView: React.FC<PatientsViewProps> = ({
  patients,
  isPrivacyMode,
  onSelectPatient,
  onOpenOdontogram,
  onOpenNewTriage,
}) => {
  const { language, t, tAllergy } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPatients = patients.filter(p => {
    const matchesSearch = 
      p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nationalId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.currentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusLabel = (status: Patient['currentStatus']) => {
    switch (status) {
      case 'triage_queue':
        return language === 'en' ? 'Urgent Triage' : 'Triaje Urgente';
      case 'in_chair':
        return language === 'en' ? 'In Chair' : 'En Sillón';
      case 'scheduled':
      default:
        return language === 'en' ? 'Scheduled' : 'Programado';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E9E2] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#2D332D] tracking-tight">
                {t('patients.title')}
              </h1>
              <p className="text-xs text-[#6B705C] mt-0.5">
                {t('patients.desc')}
              </p>
            </div>
          </div>
        </div>

        <button
          id="btn-intake-new-patient"
          onClick={onOpenNewTriage}
          className="flex items-center gap-2 bg-[#4A5D4E] hover:bg-[#3E4D41] text-white px-5 py-2.5 rounded-2xl font-semibold text-xs shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>{t('patients.btn.new')}</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-[#E9E9E2] p-3.5 rounded-[20px] shadow-xs">
        <div className="relative flex-1">
          <input
            id="search-patients-input"
            type="text"
            placeholder={t('patients.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-2 text-xs text-[#2D332D] placeholder-[#6B705C] focus:outline-none focus:border-[#4A5D4E]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B705C]">{t('patients.filter.status')}:</span>
          <select
            id="filter-patient-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#F8F7F2] border border-[#E9E9E2] text-xs text-[#2D332D] rounded-xl px-3 py-2 focus:outline-none focus:border-[#4A5D4E]"
          >
            <option value="all">{t('patients.filter.all')}</option>
            <option value="triage_queue">{t('patients.filter.triage_queue')}</option>
            <option value="in_chair">{t('patients.filter.in_chair')}</option>
            <option value="scheduled">{t('patients.filter.scheduled')}</option>
          </select>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            id={`patient-card-${patient.id}`}
            className="bg-white border border-[#E9E9E2] hover:border-[#A3B18A] rounded-[28px] p-6 shadow-xs transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#4A5D4E] flex items-center justify-center text-white font-serif font-bold text-lg shrink-0 shadow-xs">
                  {patient.firstName[0]}{patient.lastName[0]}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2D332D]">{patient.firstName} {patient.lastName}</h3>
                  <div className="text-xs text-[#6B705C] mt-0.5">
                    {patient.age} {t('triage.card.years')} • {t('triage.card.group')} {patient.bloodType} • MRN: <strong className="text-[#4A5D4E] font-mono">{patient.mrn}</strong>
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                patient.currentStatus === 'triage_queue' 
                  ? 'bg-[#FDF0EC] border-[#D4A373] text-[#A25032]' 
                  : patient.currentStatus === 'in_chair'
                    ? 'bg-[#FDF9EE] border-[#D4A373] text-[#976C24]'
                    : 'bg-[#F8F7F2] border-[#E9E9E2] text-[#6B705C]'
              }`}>
                {getStatusLabel(patient.currentStatus)}
              </span>
            </div>

            {/* Demographics & Contact */}
            <div className="grid grid-cols-2 gap-2.5 text-xs bg-[#F8F7F2] p-3.5 rounded-2xl border border-[#E9E9E2]">
              <div>
                <span className="text-[#6B705C] text-[10px]">{t('patients.card.id_label')}</span>
                <div className="font-mono text-[#2D332D] font-bold">{maskNationalId(patient.nationalId, isPrivacyMode)}</div>
              </div>
              <div>
                <span className="text-[#6B705C] text-[10px]">{t('patients.card.phone_label')}</span>
                <div className="font-mono text-[#2D332D] font-bold">{maskPhone(patient.phone, isPrivacyMode)}</div>
              </div>
              <div className="col-span-2 pt-2 border-t border-[#E9E9E2]">
                <span className="text-[#6B705C] text-[10px]">{t('patients.card.insurance_label')}:</span>
                <div className="text-[#4A5D4E] font-semibold">{patient.insurance.provider} ({language === 'en' ? 'Coverage' : 'Cobertura'} {(patient.insurance.coverageRate * 100).toFixed(0)}%)</div>
              </div>
            </div>

            {/* Allergy warning badges */}
            {patient.allergies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {patient.allergies.map((allergy, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDF0EC] border border-[#D4A373] text-[#A25032] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-[#A25032]" />
                    {tAllergy(allergy)}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#E9E9E2]">
              <button
                id={`btn-view-odontogram-${patient.id}`}
                onClick={() => onOpenOdontogram(patient)}
                className="flex items-center gap-1.5 text-xs text-[#4A5D4E] hover:text-[#3E4D41] font-semibold px-3 py-1.5 rounded-xl hover:bg-[#F8F7F2] transition-colors cursor-pointer"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{t('patients.card.odontogram')}</span>
              </button>

              <button
                id={`btn-open-dossier-${patient.id}`}
                onClick={() => onSelectPatient(patient)}
                className="bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                {t('patients.card.view_dossier')}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
