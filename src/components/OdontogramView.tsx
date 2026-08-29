import React, { useState } from 'react';
import { 
  Stethoscope, 
  Check, 
  AlertCircle, 
  Plus, 
  Sparkles, 
  FileText, 
  RotateCcw, 
  Layers, 
  Eye, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { Patient, ToothState, ToothCondition, ToothSurfaceState, TreatmentItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface OdontogramViewProps {
  patients: Patient[];
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
  onUpdateTooth: (patientId: string, toothNumber: number, updatedState: Partial<ToothState>) => void;
  onAddTreatmentItem: (patientId: string, item: Omit<TreatmentItem, 'id'>) => void;
  onNavigateToBilling: (patientId: string) => void;
}

export const OdontogramView: React.FC<OdontogramViewProps> = ({
  patients,
  selectedPatient,
  onSelectPatient,
  onUpdateTooth,
  onAddTreatmentItem,
  onNavigateToBilling,
}) => {
  const { language, t, tCondition } = useLanguage();
  const [selectedToothNum, setSelectedToothNum] = useState<number>(46);
  const [activeTool, setActiveTool] = useState<ToothCondition>('caries');
  const [showArchMode, setShowArchMode] = useState<'both' | 'upper' | 'lower'>('both');
  const [treatmentAddedToast, setTreatmentAddedToast] = useState<string | null>(null);

  const selectedTooth = selectedPatient.dentalChart.find(t => t.toothNumber === selectedToothNum) || selectedPatient.dentalChart[0];

  // Helper for quadrant groupings
  const quad1 = selectedPatient.dentalChart.filter(t => t.toothNumber >= 11 && t.toothNumber <= 18).sort((a, b) => b.toothNumber - a.toothNumber);
  const quad2 = selectedPatient.dentalChart.filter(t => t.toothNumber >= 21 && t.toothNumber <= 28).sort((a, b) => a.toothNumber - b.toothNumber);
  const quad4 = selectedPatient.dentalChart.filter(t => t.toothNumber >= 41 && t.toothNumber <= 48).sort((a, b) => b.toothNumber - a.toothNumber);
  const quad3 = selectedPatient.dentalChart.filter(t => t.toothNumber >= 31 && t.toothNumber <= 38).sort((a, b) => a.toothNumber - b.toothNumber);

  const getConditionColor = (cond: ToothCondition) => {
    switch (cond) {
      case 'caries':
        return { border: 'border-[#A25032]', fill: 'bg-[#FDF0EC] text-[#A25032]', badge: 'bg-[#FDF0EC] text-[#A25032] border-[#D4A373]', name: t('odontogram.cond.caries') };
      case 'endodontic':
        return { border: 'border-[#4A5D4E]', fill: 'bg-[#DDE5B6]/50 text-[#4A5D4E]', badge: 'bg-[#DDE5B6] text-[#4A5D4E] border-[#A3B18A]', name: t('odontogram.cond.endodontic') };
      case 'implant':
        return { border: 'border-[#4A5D4E]', fill: 'bg-[#4A5D4E] text-white', badge: 'bg-[#4A5D4E] text-white border-[#3E4D41]', name: t('odontogram.cond.implant') };
      case 'crown':
        return { border: 'border-[#D4A373]', fill: 'bg-[#FDF9EE] text-[#976C24]', badge: 'bg-[#FDF9EE] text-[#976C24] border-[#D4A373]', name: t('odontogram.cond.crown') };
      case 'extraction_needed':
        return { border: 'border-[#A25032]', fill: 'bg-[#FDF0EC] text-[#A25032]', badge: 'bg-[#FDF0EC] text-[#A25032] border-[#A25032]', name: t('odontogram.cond.extraction') };
      case 'missing':
        return { border: 'border-[#E9E9E2]', fill: 'bg-[#F8F7F2] text-[#6B705C] line-through', badge: 'bg-[#F8F7F2] text-[#6B705C] border-[#E9E9E2]', name: t('odontogram.cond.missing') };
      case 'veneer':
        return { border: 'border-[#A3B18A]', fill: 'bg-[#F4F7EE] text-[#4A5D4E]', badge: 'bg-[#F4F7EE] text-[#4A5D4E] border-[#A3B18A]', name: t('odontogram.cond.veneer') };
      case 'sealant':
        return { border: 'border-[#A3B18A]', fill: 'bg-[#F4F7EE] text-[#4A5D4E]', badge: 'bg-[#F4F7EE] text-[#4A5D4E] border-[#A3B18A]', name: t('odontogram.cond.sealant') };
      case 'healthy':
      default:
        return { border: 'border-[#E9E9E2]', fill: 'bg-[#F8F7F2] text-[#2D332D]', badge: 'bg-[#F8F7F2] text-[#2D332D] border-[#E9E9E2]', name: t('odontogram.cond.healthy') };
    }
  };

  const handleToothClick = (toothNum: number) => {
    setSelectedToothNum(toothNum);
  };

  const handleApplyQuickCondition = (cond: ToothCondition) => {
    onUpdateTooth(selectedPatient.id, selectedTooth.toothNumber, {
      condition: cond,
      plannedProcedure: cond === 'caries' ? (language === 'en' ? 'Aesthetic Composite Filling' : 'Obturación / Composite Estético') :
                        cond === 'endodontic' ? (language === 'en' ? 'Mechanized Root Canal Therapy' : 'Biopulpectomía Mecanizada') :
                        cond === 'implant' ? (language === 'en' ? 'Straumann Dental Implant Placement' : 'Colocación de Implante Straumann') :
                        cond === 'crown' ? (language === 'en' ? 'CAD/CAM Zirconia Crown' : 'Corona Zirconio CAD/CAM') :
                        cond === 'extraction_needed' ? (language === 'en' ? 'Surgical or Simple Extraction' : 'Exodoncia Simple o Quirúrgica') : ''
    });
  };

  const handleToggleSurface = (surfaceName: keyof ToothSurfaceState) => {
    const currentSurfaces = selectedTooth.surfaces || {};
    const updated = {
      ...currentSurfaces,
      [surfaceName]: !currentSurfaces[surfaceName]
    };
    onUpdateTooth(selectedPatient.id, selectedTooth.toothNumber, {
      surfaces: updated
    });
  };

  const handleAddConditionToTreatmentPlan = () => {
    let description = `${language === 'en' ? 'Treatment Tooth' : 'Tratamiento Pieza'} ${selectedTooth.toothNumber} (${selectedTooth.name})`;
    let code = 'CDT-D0150';
    let unitPrice = 60;
    let category: TreatmentItem['category'] = 'preventive';
    let phase: TreatmentItem['phase'] = 'Fase 1: Urgencia & Saneamiento';

    if (selectedTooth.condition === 'caries') {
      description = `${language === 'en' ? 'Composite Restoration Tooth' : 'Obturación Composite Estético Pieza'} ${selectedTooth.toothNumber}`;
      code = 'CDT-D2391';
      unitPrice = 85;
      category = 'restorative';
      phase = 'Fase 1: Urgencia & Saneamiento';
    } else if (selectedTooth.condition === 'endodontic') {
      description = `${language === 'en' ? 'Multi-canal Endodontic Therapy Tooth' : 'Endodoncia Mecanizada Multirradicular Pieza'} ${selectedTooth.toothNumber}`;
      code = 'CDT-D3330';
      unitPrice = 380;
      category = 'endodontics';
      phase = 'Fase 2: Restauración & Cirugía';
    } else if (selectedTooth.condition === 'implant') {
      description = `${language === 'en' ? 'Straumann Titanium Implant Tooth' : 'Implante Quirúrgico Titanio Straumann BLX Pieza'} ${selectedTooth.toothNumber}`;
      code = 'CDT-D6010';
      unitPrice = 850;
      category = 'surgery';
      phase = 'Fase 2: Restauración & Cirugía';
    } else if (selectedTooth.condition === 'crown') {
      description = `${language === 'en' ? 'Monolithic Zirconia Crown Tooth' : 'Corona Cerámica Zirconio Monolítico Pieza'} ${selectedTooth.toothNumber}`;
      code = 'CDT-D2740';
      unitPrice = 620;
      category = 'prosthetics';
      phase = 'Fase 3: Estética & Mantenimiento';
    } else if (selectedTooth.condition === 'extraction_needed') {
      description = `${language === 'en' ? 'Surgical Root Extraction Tooth' : 'Exodoncia Quirúrgica de Resto Radicular Pieza'} ${selectedTooth.toothNumber}`;
      code = 'CDT-D7210';
      unitPrice = 140;
      category = 'surgery';
      phase = 'Fase 1: Urgencia & Saneamiento';
    } else if (selectedTooth.condition === 'veneer') {
      description = `${language === 'en' ? 'E.max Lithium Disilicate Veneer Tooth' : 'Carilla Estética Disilicato de Litio E.max Pieza'} ${selectedTooth.toothNumber}`;
      code = 'CDT-D2962';
      unitPrice = 480;
      category = 'prosthetics';
      phase = 'Fase 3: Estética & Mantenimiento';
    }

    const insuranceDiscount = Math.round(unitPrice * (selectedPatient.insurance?.coverageRate || 0.8));

    onAddTreatmentItem(selectedPatient.id, {
      code,
      toothNumber: selectedTooth.toothNumber,
      description,
      category,
      unitPrice,
      insuranceCoverage: insuranceDiscount,
      patientCopay: unitPrice - insuranceDiscount,
      status: 'planned',
      phase,
      notes: language === 'en' 
        ? `Logged from interactive odontogram for tooth ${selectedTooth.toothNumber}.`
        : `Registrado desde odontograma interactivo para pieza ${selectedTooth.toothNumber}.`
    });

    setTreatmentAddedToast(language === 'en'
      ? `Treatment for Tooth #${selectedTooth.toothNumber} added to estimate!`
      : `¡Tratamiento para Pieza #${selectedTooth.toothNumber} añadido al presupuesto!`);
    setTimeout(() => setTreatmentAddedToast(null), 4000);
  };

  const renderToothVisual = (tooth: ToothState, isSelected: boolean) => {
    const condInfo = getConditionColor(tooth.condition);
    const surfaces = tooth.surfaces || {};

    return (
      <button
        key={tooth.toothNumber}
        id={`tooth-node-${tooth.toothNumber}`}
        onClick={() => handleToothClick(tooth.toothNumber)}
        className={`relative flex flex-col items-center p-1 rounded-xl transition-all duration-150 cursor-pointer shrink-0 w-11 sm:w-12 select-none ${
          isSelected 
            ? 'bg-[#DDE5B6]/50 ring-2 ring-[#4A5D4E] scale-105 shadow-xs z-10' 
            : 'bg-white hover:bg-[#F8F7F2] border border-[#E9E9E2]'
        }`}
        title={`${language === 'en' ? 'Tooth' : 'Pieza'} ${tooth.toothNumber}: ${tooth.name} (${condInfo.name})`}
      >
        {/* FDI Tooth Number Badge */}
        <span className={`text-[10px] font-mono font-bold leading-none mb-0.5 ${
          isSelected ? 'text-[#4A5D4E]' : 'text-[#6B705C]'
        }`}>
          {tooth.toothNumber}
        </span>

        {/* 5-Surface FDI Geometric Schematic Representation */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 my-0.5 rounded-md border border-[#E9E9E2] bg-white overflow-hidden shadow-2xs">
          
          {/* Top Surface (Vestibular / Buccal) */}
          <div 
            className={`absolute top-0.5 left-1.5 right-1.5 h-2 rounded-t-xs transition-colors ${
              surfaces.vestibular ? 'bg-[#A25032]' : 'bg-[#F8F7F2] hover:bg-[#E9E9E2]'
            }`}
            title={language === 'en' ? 'Buccal / Vestibular' : 'Vestibular'}
          />

          {/* Bottom Surface (Lingual / Palatal) */}
          <div 
            className={`absolute bottom-0.5 left-1.5 right-1.5 h-2 rounded-b-xs transition-colors ${
              surfaces.lingual ? 'bg-[#A25032]' : 'bg-[#F8F7F2] hover:bg-[#E9E9E2]'
            }`}
            title={language === 'en' ? 'Lingual / Palatal' : 'Lingual/Palatino'}
          />

          {/* Left Surface (Mesial) */}
          <div 
            className={`absolute top-1.5 bottom-1.5 left-0.5 w-2 rounded-l-xs transition-colors ${
              surfaces.mesial ? 'bg-[#A25032]' : 'bg-[#F8F7F2] hover:bg-[#E9E9E2]'
            }`}
            title="Mesial"
          />

          {/* Right Surface (Distal) */}
          <div 
            className={`absolute top-1.5 bottom-1.5 right-0.5 w-2 rounded-r-xs transition-colors ${
              surfaces.distal ? 'bg-[#A25032]' : 'bg-[#F8F7F2] hover:bg-[#E9E9E2]'
            }`}
            title="Distal"
          />

          {/* Center (Occlusal / Incisal) */}
          <div 
            className={`absolute inset-1.5 rounded-xs transition-colors flex items-center justify-center text-[7px] sm:text-[8px] font-bold ${
              surfaces.occlusal 
                ? 'bg-[#A25032] text-white' 
                : tooth.condition === 'implant' 
                  ? 'bg-[#4A5D4E] text-white' 
                  : tooth.condition === 'endodontic'
                    ? 'bg-[#A3B18A] text-[#2D332D]'
                    : tooth.condition === 'crown'
                      ? 'bg-[#D4A373] text-white'
                      : 'bg-[#E9E9E2] hover:bg-[#DDE5B6]'
            }`}
            title={language === 'en' ? 'Occlusal' : 'Oclusal'}
          >
            {tooth.condition === 'implant' && 'IM'}
            {tooth.condition === 'endodontic' && 'EN'}
            {tooth.condition === 'crown' && 'CR'}
            {tooth.condition === 'missing' && '✕'}
          </div>
        </div>

        {/* Condition mini-pill */}
        <span className={`text-[8.5px] font-semibold mt-0.5 px-1 py-0.2 rounded-full truncate max-w-[42px] border ${condInfo.badge}`}>
          {tooth.condition === 'healthy' ? (language === 'en' ? 'Sound' : 'Sano') : condInfo.name.split(' ')[0]}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Toast Notification for Treatment Added */}
      {treatmentAddedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#4A5D4E] border border-[#A3B18A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3">
          <Check className="w-5 h-5 text-[#DDE5B6] shrink-0" />
          <span className="text-xs font-semibold">{treatmentAddedToast}</span>
          <button
            onClick={() => onNavigateToBilling(selectedPatient.id)}
            className="text-xs bg-[#DDE5B6] text-[#4A5D4E] px-3 py-1 rounded-xl font-bold hover:bg-white transition-colors ml-2 cursor-pointer"
          >
            {t('odontogram.toast.view_plan')}
          </button>
        </div>
      )}

      {/* Header with Patient Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E9E2] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#2D332D] tracking-tight">
                {t('odontogram.title')}
              </h1>
              <p className="text-xs text-[#6B705C] mt-0.5">
                {t('odontogram.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Selection Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6B705C] font-medium hidden md:inline">{t('odontogram.patient_select')}:</span>
          <select
            id="odontogram-patient-select"
            value={selectedPatient.id}
            onChange={(e) => {
              const p = patients.find(pat => pat.id === e.target.value);
              if (p) onSelectPatient(p);
            }}
            className="bg-white border border-[#E9E9E2] text-[#4A5D4E] text-xs font-bold rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#4A5D4E] shadow-2xs cursor-pointer"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.firstName} {p.lastName} (MRN: {p.mrn})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Odontogram Chart & Inspection/Billing Drawer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 cols): Dental Arch Viewer */}
        <div className="xl:col-span-8 space-y-5 bg-white border border-[#E9E9E2] rounded-[32px] p-6 shadow-xs">
          
          {/* Arch Toolbar */}
          <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2D332D] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#4A5D4E]" />
                {t('odontogram.arch.title')}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#F8F7F2] p-1 rounded-xl border border-[#E9E9E2] text-xs">
              <button
                id="arch-mode-both"
                onClick={() => setShowArchMode('both')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  showArchMode === 'both' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:text-[#2D332D]'
                }`}
              >
                {t('odontogram.arch.both')}
              </button>
              <button
                id="arch-mode-upper"
                onClick={() => setShowArchMode('upper')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  showArchMode === 'upper' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:text-[#2D332D]'
                }`}
              >
                {t('odontogram.arch.upper')}
              </button>
              <button
                id="arch-mode-lower"
                onClick={() => setShowArchMode('lower')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  showArchMode === 'lower' ? 'bg-[#4A5D4E] text-white shadow-xs' : 'text-[#6B705C] hover:text-[#2D332D]'
                }`}
              >
                {t('odontogram.arch.lower')}
              </button>
            </div>
          </div>

          {/* Visual Legend */}
          <div className="flex flex-wrap gap-2.5 text-[11px] bg-[#F8F7F2] p-3 rounded-2xl border border-[#E9E9E2]">
            <span className="flex items-center gap-1.5 text-[#2D332D]">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#E9E9E2] border border-[#E9E9E2]" /> {t('odontogram.cond.healthy')}
            </span>
            <span className="flex items-center gap-1.5 text-[#A25032] font-semibold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#A25032]" /> {t('odontogram.cond.caries')}
            </span>
            <span className="flex items-center gap-1.5 text-[#4A5D4E] font-semibold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#A3B18A]" /> {t('odontogram.cond.endodontic')}
            </span>
            <span className="flex items-center gap-1.5 text-[#4A5D4E] font-semibold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#4A5D4E]" /> {t('odontogram.cond.implant')}
            </span>
            <span className="flex items-center gap-1.5 text-[#976C24] font-semibold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D4A373]" /> {t('odontogram.cond.crown')}
            </span>
            <span className="flex items-center gap-1.5 text-[#A25032] font-semibold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#A25032]" /> {t('odontogram.cond.extraction')}
            </span>
            <span className="flex items-center gap-1.5 text-[#4A5D4E] font-semibold">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#DDE5B6]" /> {t('odontogram.cond.veneer')}
            </span>
          </div>

          {/* MAXILAR SUPERIOR (Cuadrante 1 y 2) */}
          {(showArchMode === 'both' || showArchMode === 'upper') && (
            <div className="space-y-2 bg-[#F8F7F2] p-3.5 sm:p-4 rounded-2xl border border-[#E9E9E2]">
              <div className="text-[11px] font-bold text-[#6B705C] uppercase tracking-wider flex items-center justify-between px-1 pb-1 border-b border-[#E9E9E2]/60">
                <span className="truncate">{t('odontogram.quad.1')}</span>
                <span className="text-[#4A5D4E] font-medium px-2 py-0.5 bg-[#E9E9E2]/70 rounded-md text-[10px] shrink-0">{t('odontogram.midline')}</span>
                <span className="truncate">{t('odontogram.quad.2')}</span>
              </div>

              <div className="overflow-x-auto pb-2 pt-1 scrollbar-thin">
                <div className="min-w-[660px] sm:min-w-[720px] flex items-center justify-between gap-1 px-1">
                  {/* Quad 1: 18 -> 11 */}
                  <div className="flex items-center gap-1 sm:gap-1.5 justify-end flex-1">
                    {quad1.map(tooth => renderToothVisual(tooth, tooth.toothNumber === selectedToothNum))}
                  </div>

                  {/* Vertical Midline Divider */}
                  <div className="h-16 w-0.5 bg-[#4A5D4E]/30 mx-2 shrink-0 rounded-full" />

                  {/* Quad 2: 21 -> 28 */}
                  <div className="flex items-center gap-1 sm:gap-1.5 justify-start flex-1">
                    {quad2.map(tooth => renderToothVisual(tooth, tooth.toothNumber === selectedToothNum))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MANDÍBULA INFERIOR (Cuadrante 4 y 3) */}
          {(showArchMode === 'both' || showArchMode === 'lower') && (
            <div className="space-y-2 bg-[#F8F7F2] p-3.5 sm:p-4 rounded-2xl border border-[#E9E9E2]">
              <div className="text-[11px] font-bold text-[#6B705C] uppercase tracking-wider flex items-center justify-between px-1 pb-1 border-b border-[#E9E9E2]/60">
                <span className="truncate">{t('odontogram.quad.4')}</span>
                <span className="text-[#4A5D4E] font-medium px-2 py-0.5 bg-[#E9E9E2]/70 rounded-md text-[10px] shrink-0">{t('odontogram.midline')}</span>
                <span className="truncate">{t('odontogram.quad.3')}</span>
              </div>

              <div className="overflow-x-auto pb-2 pt-1 scrollbar-thin">
                <div className="min-w-[660px] sm:min-w-[720px] flex items-center justify-between gap-1 px-1">
                  {/* Quad 4: 48 -> 41 */}
                  <div className="flex items-center gap-1 sm:gap-1.5 justify-end flex-1">
                    {quad4.map(tooth => renderToothVisual(tooth, tooth.toothNumber === selectedToothNum))}
                  </div>

                  {/* Vertical Midline Divider */}
                  <div className="h-16 w-0.5 bg-[#4A5D4E]/30 mx-2 shrink-0 rounded-full" />

                  {/* Quad 3: 31 -> 38 */}
                  <div className="flex items-center gap-1 sm:gap-1.5 justify-start flex-1">
                    {quad3.map(tooth => renderToothVisual(tooth, tooth.toothNumber === selectedToothNum))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Patient Dental Summary Banner */}
          <div className="bg-[#F8F7F2] border border-[#E9E9E2] p-4 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#DDE5B6] border border-[#A3B18A]/40 flex items-center justify-center text-[#4A5D4E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-[#2D332D]">{t('odontogram.plan_in_progress')}</div>
                <div className="text-[#6B705C] text-[11px]">
                  {selectedPatient.dentalChart.filter(t => t.condition !== 'healthy').length} {t('odontogram.findings_count')}
                </div>
              </div>
            </div>

            <button
              id="btn-goto-patient-billing"
              onClick={() => onNavigateToBilling(selectedPatient.id)}
              className="flex items-center gap-1.5 bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <span>{t('odontogram.view_billing')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right Column (4 cols): Selected Tooth Inspector & Treatment Generator */}
        <div className="xl:col-span-4 bg-white border border-[#E9E9E2] rounded-[32px] p-6 shadow-xs space-y-5">
          
          {/* Tooth Header Card */}
          <div className="flex items-center justify-between border-b border-[#E9E9E2] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-[#4A5D4E]">
                  #{selectedTooth.toothNumber}
                </span>
                <span className="text-sm font-bold text-[#2D332D]">
                  {selectedTooth.name}
                </span>
              </div>
              <p className="text-[11px] text-[#6B705C] mt-0.5">
                {language === 'en' ? 'Quadrant' : 'Cuadrante'} {selectedTooth.quadrant} • {selectedTooth.quadrant <= 2 ? (language === 'en' ? 'Maxillary Arch' : 'Maxilar Superior') : (language === 'en' ? 'Mandibular Arch' : 'Mandíbula Inferior')}
              </p>
            </div>

            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getConditionColor(selectedTooth.condition).badge}`}>
              {getConditionColor(selectedTooth.condition).name}
            </span>
          </div>

          {/* Quick Pathology Selector Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2D332D] uppercase tracking-wider">
              {t('odontogram.diagnosis_label')}:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                id="btn-cond-healthy"
                onClick={() => handleApplyQuickCondition('healthy')}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer truncate flex items-center gap-1.5 ${
                  selectedTooth.condition === 'healthy'
                    ? 'bg-[#F8F7F2] border-[#4A5D4E] text-[#4A5D4E] font-bold shadow-2xs'
                    : 'bg-white border-[#E9E9E2] text-[#6B705C] hover:bg-[#F8F7F2]'
                }`}
              >
                <span className="font-bold text-[#4A5D4E]">✓</span>
                <span className="truncate">{t('odontogram.cond.healthy')}</span>
              </button>

              <button
                id="btn-cond-caries"
                onClick={() => handleApplyQuickCondition('caries')}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer truncate flex items-center gap-1.5 ${
                  selectedTooth.condition === 'caries'
                    ? 'bg-[#FDF0EC] border-[#D4A373] text-[#A25032] font-bold shadow-2xs'
                    : 'bg-white border-[#E9E9E2] text-[#A25032] hover:bg-[#FDF0EC]'
                }`}
              >
                <span className="text-[#A25032]">●</span>
                <span className="truncate">{t('odontogram.cond.caries')}</span>
              </button>

              <button
                id="btn-cond-endodontic"
                onClick={() => handleApplyQuickCondition('endodontic')}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer truncate flex items-center gap-1.5 ${
                  selectedTooth.condition === 'endodontic'
                    ? 'bg-[#DDE5B6] border-[#A3B18A] text-[#4A5D4E] font-bold shadow-2xs'
                    : 'bg-white border-[#E9E9E2] text-[#4A5D4E] hover:bg-[#F4F7EE]'
                }`}
              >
                <span className="text-[#4A5D4E]">◆</span>
                <span className="truncate">{t('odontogram.cond.endodontic')}</span>
              </button>

              <button
                id="btn-cond-implant"
                onClick={() => handleApplyQuickCondition('implant')}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer truncate flex items-center gap-1.5 ${
                  selectedTooth.condition === 'implant'
                    ? 'bg-[#4A5D4E] border-[#3E4D41] text-white font-bold shadow-2xs'
                    : 'bg-white border-[#E9E9E2] text-[#4A5D4E] hover:bg-[#F4F7EE]'
                }`}
              >
                <span>▲</span>
                <span className="truncate">{t('odontogram.cond.implant')}</span>
              </button>

              <button
                id="btn-cond-crown"
                onClick={() => handleApplyQuickCondition('crown')}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer truncate flex items-center gap-1.5 ${
                  selectedTooth.condition === 'crown'
                    ? 'bg-[#FDF9EE] border-[#D4A373] text-[#976C24] font-bold shadow-2xs'
                    : 'bg-white border-[#E9E9E2] text-[#976C24] hover:bg-[#FDF9EE]'
                }`}
              >
                <span className="text-[#976C24]">★</span>
                <span className="truncate">{t('odontogram.cond.crown')}</span>
              </button>

              <button
                id="btn-cond-extraction"
                onClick={() => handleApplyQuickCondition('extraction_needed')}
                className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer truncate flex items-center gap-1.5 ${
                  selectedTooth.condition === 'extraction_needed'
                    ? 'bg-[#FDF0EC] border-[#A25032] text-[#A25032] font-bold shadow-2xs'
                    : 'bg-white border-[#E9E9E2] text-[#A25032] hover:bg-[#FDF0EC]'
                }`}
              >
                <span className="text-[#A25032]">✕</span>
                <span className="truncate">{t('odontogram.cond.extraction')}</span>
              </button>
            </div>
          </div>

          {/* Interactive Surfaces Matrix Selector */}
          <div className="space-y-2 bg-[#F8F7F2] p-4 rounded-2xl border border-[#E9E9E2]">
            <label className="text-xs font-bold text-[#2D332D] uppercase tracking-wider flex items-center justify-between">
              <span>{t('odontogram.surfaces_label')}:</span>
              <span className="text-[10px] text-[#4A5D4E] font-medium">{t('odontogram.click_toggle')}</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5 text-xs text-center">
              <button
                id="surf-mesial"
                onClick={() => handleToggleSurface('mesial')}
                className={`p-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                  selectedTooth.surfaces?.mesial ? 'bg-[#A25032] text-white shadow-2xs' : 'bg-white border border-[#E9E9E2] text-[#6B705C]'
                }`}
              >
                M
                <div className="text-[9px] font-sans font-normal">{t('odontogram.surf.m')}</div>
              </button>

              <button
                id="surf-occlusal"
                onClick={() => handleToggleSurface('occlusal')}
                className={`p-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                  selectedTooth.surfaces?.occlusal ? 'bg-[#A25032] text-white shadow-2xs' : 'bg-white border border-[#E9E9E2] text-[#6B705C]'
                }`}
              >
                O
                <div className="text-[9px] font-sans font-normal">{t('odontogram.surf.o')}</div>
              </button>

              <button
                id="surf-distal"
                onClick={() => handleToggleSurface('distal')}
                className={`p-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                  selectedTooth.surfaces?.distal ? 'bg-[#A25032] text-white shadow-2xs' : 'bg-white border border-[#E9E9E2] text-[#6B705C]'
                }`}
              >
                D
                <div className="text-[9px] font-sans font-normal">{t('odontogram.surf.d')}</div>
              </button>

              <button
                id="surf-vestibular"
                onClick={() => handleToggleSurface('vestibular')}
                className={`p-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                  selectedTooth.surfaces?.vestibular ? 'bg-[#A25032] text-white shadow-2xs' : 'bg-white border border-[#E9E9E2] text-[#6B705C]'
                }`}
              >
                V
                <div className="text-[9px] font-sans font-normal">{t('odontogram.surf.v')}</div>
              </button>

              <button
                id="surf-lingual"
                onClick={() => handleToggleSurface('lingual')}
                className={`p-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                  selectedTooth.surfaces?.lingual ? 'bg-[#A25032] text-white shadow-2xs' : 'bg-white border border-[#E9E9E2] text-[#6B705C]'
                }`}
              >
                L/P
                <div className="text-[9px] font-sans font-normal">{t('odontogram.surf.l')}</div>
              </button>
            </div>
          </div>

          {/* Periodontal Pocket Depth & Clinical Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6B705C] font-medium">{t('odontogram.perio_probing')}:</span>
              <div className="flex items-center gap-2">
                <input
                  id="periodontal-depth-slider"
                  type="range"
                  min="1"
                  max="8"
                  value={selectedTooth.periodontalDepthMm || 2}
                  onChange={(e) => onUpdateTooth(selectedPatient.id, selectedTooth.toothNumber, { periodontalDepthMm: Number(e.target.value) })}
                  className="w-24 accent-[#4A5D4E]"
                />
                <span className={`font-mono font-bold ${
                  (selectedTooth.periodontalDepthMm || 2) >= 5 ? 'text-[#A25032]' : 'text-[#4A5D4E]'
                }`}>
                  {selectedTooth.periodontalDepthMm || 2} mm
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#2D332D] block mb-1">
                {t('odontogram.notes_label')}:
              </label>
              <textarea
                id="tooth-clinical-notes"
                rows={2}
                value={selectedTooth.notes || ''}
                onChange={(e) => onUpdateTooth(selectedPatient.id, selectedTooth.toothNumber, { notes: e.target.value })}
                placeholder={t('odontogram.notes_placeholder')}
                className="w-full bg-[#F8F7F2] border border-[#E9E9E2] rounded-xl p-2.5 text-xs text-[#2D332D] placeholder-[#6B705C] focus:outline-none focus:border-[#4A5D4E]"
              />
            </div>
          </div>

          {/* Add to Treatment Plan CTA Button */}
          <div className="pt-2 border-t border-[#E9E9E2] space-y-2">
            <button
              id="btn-add-tooth-to-treatment"
              onClick={handleAddConditionToTreatmentPlan}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#4A5D4E] hover:bg-[#3E4D41] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{t('odontogram.btn.add_to_plan')}</span>
            </button>
            <p className="text-[11px] text-center text-[#6B705C]">
              {t('odontogram.auto_calc_hint')}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
