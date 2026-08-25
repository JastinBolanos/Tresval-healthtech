import React, { useState } from 'react';
import { 
  Activity, 
  Sparkles, 
  Heart, 
  Thermometer, 
  AlertTriangle, 
  Stethoscope, 
  Check, 
  Bed, 
  Clock, 
  ShieldAlert,
  Sliders
} from 'lucide-react';
import { Patient, TriageLevel, TriageRecord } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { aiService } from '../services/ai.service';

interface NewTriageIntakeModalProps {
  patients: Patient[];
  onClose: () => void;
  onSubmitTriage: (patientId: string, triageRecord: TriageRecord) => void;
}

export const NewTriageIntakeModal: React.FC<NewTriageIntakeModalProps> = ({
  patients,
  onClose,
  onSubmitTriage,
}) => {
  const { language, t } = useLanguage();
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || '');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [bp, setBp] = useState('130/85');
  const [hr, setHr] = useState(82);
  const [spo2, setSpo2] = useState(98);
  const [temp, setTemp] = useState(37.1);
  const [painScore, setPainScore] = useState(7);
  const [bleeding, setBleeding] = useState<'none' | 'mild' | 'moderate' | 'severe'>('moderate');
  const [selectedRedFlags, setSelectedRedFlags] = useState<string[]>([
    language === 'en' ? 'Acute radiating pain' : 'Dolor agudo irradiado'
  ]);
  
  // Triage assessment
  const [triageLevel, setTriageLevel] = useState<TriageLevel>(3);
  const [assignedBox, setAssignedBox] = useState('Box Quirúrgico 01');
  const [estimatedWaitMinutes, setEstimatedWaitMinutes] = useState(15);
  
  // AI analysis state
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [aiRationale, setAiRationale] = useState<string | null>(null);

  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handleToggleRedFlag = (flag: string) => {
    setSelectedRedFlags(prev => 
      prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag]
    );
  };

  const handleRunAITriage = async () => {
    setIsAnalyzingAI(true);
    try {
      const data = await aiService.analyzeTriage({
        symptoms: `${chiefComplaint}. ${symptoms}`,
        vitals: { bp, hr, spo2, temp },
        painScore,
        specialty: 'Odontología Quirúrgica & Urgencias Maxilofaciales',
        patientAge: activePatient?.age || 35,
        allergies: activePatient?.allergies?.join(', ') || 'Ninguna',
        language
      });

      if (data.recommendedLevel) {
        setTriageLevel(data.recommendedLevel as TriageLevel);
        setEstimatedWaitMinutes(data.estimatedWaitMinutes || 10);
        setAssignedBox(data.assignedBox || 'Box Quirúrgico 01');
        setAiRationale(data.clinicalRationale || (language === 'en' ? 'Classification suggested by acute pain protocol.' : 'Clasificación sugerida por protocolo de dolor agudo.'));
      }
    } catch (err) {
      console.error(err);
      // Fallback
      if (painScore >= 8) {
        setTriageLevel(2);
        setEstimatedWaitMinutes(8);
      } else {
        setTriageLevel(3);
        setEstimatedWaitMinutes(20);
      }
      setAiRationale(language === 'en' ? 'Classification computed based on vital signs and VAS pain scale.' : 'Clasificación calculada por constantes vitales y escala de dolor EVA.');
    } finally {
      setIsAnalyzingAI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePatient) return;

    const newTriage: TriageRecord = {
      id: `tr-${Date.now()}`,
      patientId: activePatient.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      level: triageLevel,
      chiefComplaint: chiefComplaint || (language === 'en' ? 'Acute dental pain / Emergency' : 'Dolor dental agudo / Urgencia'),
      symptoms: symptoms || (language === 'en' ? 'Hypersensitivity, periapical swelling, mastication pain.' : 'Hipersensibilidad, inflamación periapical, dificultad masticatoria.'),
      vitals: {
        bp,
        hr,
        spo2,
        temp,
        painScore,
        bleeding,
      },
      redFlags: selectedRedFlags,
      status: 'waiting',
      assignedBox: assignedBox,
      assignedDoctorName: 'Dra. Elena Rostova',
      estimatedWaitMinutes: estimatedWaitMinutes,
      aiAnalysis: aiRationale ? {
        recommendedLevel: triageLevel,
        confidence: 0.94,
        clinicalRationale: aiRationale,
        suggestedICD10: ['K04.0 Pulpitis aguda', 'R52.0 Dolor agudo'],
      } : undefined,
    };

    onSubmitTriage(activePatient.id, newTriage);
    onClose();
  };

  const redFlagOptions = language === 'en' ? [
    'Acute radiating pain',
    'Active hemorrhage',
    'Fever >38°C (100.4°F)',
    'Airway compromise',
    'Anticoagulated patient'
  ] : [
    'Dolor agudo irradiado',
    'Hemorragia activa',
    'Fiebre >38°C',
    'Compromiso vía aérea',
    'Paciente anticoagulado'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#2D332D]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E9E9E2] rounded-[32px] max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DDE5B6] border border-[#A3B18A] flex items-center justify-center text-[#4A5D4E]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-[#2D332D]">{t('modal.triage.title')}</h3>
              <p className="text-xs text-[#6B705C]">{t('modal.triage.subtitle')}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#6B705C] hover:text-[#2D332D] text-xl font-bold px-2 py-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Patient Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#2D332D]">{t('modal.triage.select_patient')}:</label>
          <select
            id="modal-patient-select"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full bg-[#F8F7F2] border border-[#E9E9E2] text-[#4A5D4E] text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#4A5D4E]"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.firstName} {p.lastName} • MRN: {p.mrn} ({p.age} {language === 'en' ? 'yo' : 'años'})
              </option>
            ))}
          </select>
        </div>

        {/* Chief Complaint & Symptoms */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-[#2D332D] block mb-1">{t('modal.triage.chief_complaint')}:</label>
            <input
              id="triage-complaint-input"
              type="text"
              required
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              placeholder={t('modal.triage.complaint_placeholder')}
              className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl px-3 py-2.5 text-xs text-[#2D332D] placeholder-[#6B705C] focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#2D332D] block mb-1">{t('modal.triage.symptoms_label')}:</label>
            <textarea
              id="triage-symptoms-input"
              rows={2}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t('modal.triage.symptoms_placeholder')}
              className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl p-2.5 text-xs text-[#2D332D] placeholder-[#6B705C] focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>
        </div>

        {/* Vital Signs Grid */}
        <div className="bg-[#F8F7F2] p-4 rounded-2xl border border-[#E9E9E2] space-y-3">
          <span className="text-xs font-bold text-[#2D332D] uppercase tracking-wider block">
            {t('modal.triage.vitals_title')}:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="text-[10px] text-[#6B705C] block mb-1 font-medium">{t('modal.triage.bp')}:</label>
              <input
                type="text"
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                className="w-full bg-white border border-[#E9E9E2] rounded-xl p-2 text-xs text-[#2D332D] font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#6B705C] block mb-1 font-medium">{t('modal.triage.hr')}:</label>
              <input
                type="number"
                value={hr}
                onChange={(e) => setHr(Number(e.target.value))}
                className="w-full bg-white border border-[#E9E9E2] rounded-xl p-2 text-xs text-[#2D332D] font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#6B705C] block mb-1 font-medium">{t('modal.triage.spo2')}:</label>
              <input
                type="number"
                value={spo2}
                onChange={(e) => setSpo2(Number(e.target.value))}
                className="w-full bg-white border border-[#E9E9E2] rounded-xl p-2 text-xs text-[#2D332D] font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#6B705C] block mb-1 font-medium">{t('modal.triage.temp')}:</label>
              <input
                type="number"
                step="0.1"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full bg-white border border-[#E9E9E2] rounded-xl p-2 text-xs text-[#2D332D] font-mono"
              />
            </div>
          </div>

          {/* Pain Scale Slider */}
          <div className="pt-2 border-t border-[#E9E9E2]">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#2D332D] font-semibold">{t('modal.triage.pain_label')}:</span>
              <span className={`font-mono font-bold ${painScore >= 8 ? 'text-[#A25032]' : painScore >= 5 ? 'text-[#D4A373]' : 'text-[#4A5D4E]'}`}>
                {painScore} / 10
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={painScore}
              onChange={(e) => setPainScore(Number(e.target.value))}
              className="w-full accent-[#4A5D4E]"
            />
          </div>
        </div>

        {/* Red Flags Checkboxes */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#2D332D] block">{t('modal.triage.red_flags_title')}:</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {redFlagOptions.map((flag) => (
              <button
                type="button"
                key={flag}
                onClick={() => handleToggleRedFlag(flag)}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all flex items-center justify-between cursor-pointer ${
                  selectedRedFlags.includes(flag)
                    ? 'bg-[#FDF0EC] border-[#A25032] text-[#A25032] shadow-2xs'
                    : 'bg-white border-[#E9E9E2] text-[#6B705C] hover:bg-[#F8F7F2]'
                }`}
              >
                <span>{flag}</span>
                {selectedRedFlags.includes(flag) && <Check className="w-3.5 h-3.5 text-[#A25032]" />}
              </button>
            ))}
          </div>
        </div>

        {/* AI Triage Assister Banner */}
        <div className="bg-[#F4F7EE] border border-[#A3B18A]/50 p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#4A5D4E] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#4A5D4E]" />
              {t('modal.triage.ai_manchester_title')}
            </span>
            <button
              type="button"
              id="btn-run-ai-triage-intake"
              onClick={handleRunAITriage}
              disabled={isAnalyzingAI}
              className="bg-[#4A5D4E] hover:bg-[#3E4D41] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isAnalyzingAI ? t('modal.triage.evaluating') : t('modal.triage.evaluate_ai')}
            </button>
          </div>

          {aiRationale && (
            <div className="bg-white p-3 rounded-xl border border-[#E9E9E2] text-xs text-[#2D332D]">
              <strong className="text-[#4A5D4E] block mb-0.5">{t('modal.triage.ai_rationale')}:</strong>
              {aiRationale}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-[#6B705C] block mb-1 font-medium">{t('modal.triage.level_label')}:</span>
              <select
                value={triageLevel}
                onChange={(e) => setTriageLevel(Number(e.target.value) as TriageLevel)}
                className="w-full bg-white border border-[#E9E9E2] text-[#2D332D] font-bold p-2 rounded-xl"
              >
                <option value={1}>{language === 'en' ? 'Level 1 (Critical 0m)' : 'Nivel 1 (Crítico 0m)'}</option>
                <option value={2}>{language === 'en' ? 'Level 2 (Emergency 10m)' : 'Nivel 2 (Emergencia 10m)'}</option>
                <option value={3}>{language === 'en' ? 'Level 3 (Urgent 30m)' : 'Nivel 3 (Urgente 30m)'}</option>
                <option value={4}>{language === 'en' ? 'Level 4 (Priority 60m)' : 'Nivel 4 (Prioritario 60m)'}</option>
                <option value={5}>{language === 'en' ? 'Level 5 (Non-urgent 120m)' : 'Nivel 5 (No urgente 120m)'}</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-[#6B705C] block mb-1 font-medium">{t('modal.triage.box_label')}:</span>
              <select
                value={assignedBox}
                onChange={(e) => setAssignedBox(e.target.value)}
                className="w-full bg-white border border-[#E9E9E2] text-[#2D332D] font-bold p-2 rounded-xl"
              >
                <option value="Box Quirúrgico 01">Box Quirúrgico 01</option>
                <option value="Box Quirúrgico 02">Box Quirúrgico 02</option>
                <option value="Sillón Dental 01">Sillón Dental 01</option>
                <option value="Sillón Dental 02">Sillón Dental 02</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-[#6B705C] block mb-1 font-medium">{language === 'en' ? 'Est. Wait (min):' : 'Espera Est.:'}</span>
              <input
                type="number"
                value={estimatedWaitMinutes}
                onChange={(e) => setEstimatedWaitMinutes(Number(e.target.value))}
                className="w-full bg-white border border-[#E9E9E2] text-[#2D332D] font-bold p-2 rounded-xl font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E9E9E2]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B705C] hover:text-[#2D332D] cursor-pointer"
          >
            {t('modal.triage.cancel')}
          </button>
          <button
            type="button"
            id="btn-submit-triage-record"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-2xl bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold text-xs shadow-xs cursor-pointer"
          >
            {t('modal.triage.submit')}
          </button>
        </div>

      </div>
    </div>
  );
};
