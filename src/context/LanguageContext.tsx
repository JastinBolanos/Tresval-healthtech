import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../i18n/translations';
import { ToothCondition, TriageLevel } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  tCondition: (cond: ToothCondition) => string;
  tTriageBadge: (level: TriageLevel) => { label: string; time: string };
  tStaffRole: (role: string) => string;
  tSpecialty: (specialty: string) => string;
  tToothName: (toothNumber: number, originalName?: string) => string;
  tProcedure: (text: string) => string;
  tClinicalText: (text: string) => string;
  tAllergy: (allergy: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('tresvalclinic_lang') || localStorage.getItem('auraclinic_lang');
      if (saved === 'es' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('tresvalclinic_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'es' ? 'en' : 'es';
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key]) {
      return translations[key][language] || fallback || key;
    }
    return fallback || key;
  };

  const tCondition = (cond: ToothCondition): string => {
    const key = `cond.${cond}`;
    if (translations[key]) {
      return translations[key][language];
    }
    return cond;
  };

  const tTriageBadge = (level: TriageLevel) => {
    if (language === 'en') {
      switch (level) {
        case 1:
          return {
            label: 'LEVEL 1 • RESUSCITATION / IMMEDIATE',
            time: 'Immediate (0 min)',
          };
        case 2:
          return {
            label: 'LEVEL 2 • SEVERE EMERGENCY',
            time: '< 10 min',
          };
        case 3:
          return {
            label: 'LEVEL 3 • MEDICAL URGENCY',
            time: '< 30 min',
          };
        case 4:
          return {
            label: 'LEVEL 4 • PRIORITY CARE',
            time: '< 60 min',
          };
        case 5:
        default:
          return {
            label: 'LEVEL 5 • NON-URGENT',
            time: '< 120 min',
          };
      }
    }
    switch (level) {
      case 1:
        return {
          label: 'NIVEL 1 • RESUCITACIÓN / INMEDIATO',
          time: 'Inmediato (0 min)',
        };
      case 2:
        return {
          label: 'NIVEL 2 • EMERGENCIA SEVERA',
          time: '< 10 min',
        };
      case 3:
        return {
          label: 'NIVEL 3 • URGENCIA MÉDICA',
          time: '< 30 min',
        };
      case 4:
        return {
          label: 'NIVEL 4 • PRIORITARIO',
          time: '< 60 min',
        };
      case 5:
      default:
        return {
          label: 'NIVEL 5 • NO URGENTE',
          time: '< 120 min',
        };
    }
  };

  const tStaffRole = (role: string): string => {
    if (language === 'en') {
      switch (role) {
        case 'surgeon':
          return 'Oral & Maxillofacial Surgeon';
        case 'dentist':
          return 'Restorative Dentist';
        case 'triage_nurse':
          return 'Triage Nurse Specialist';
        case 'billing_admin':
          return 'Billing & Insurance Director';
        case 'medical_director':
          return 'Medical Director';
        default:
          return role;
      }
    }
    switch (role) {
      case 'surgeon':
        return 'Cirujano Maxilofacial';
      case 'dentist':
        return 'Odontólogo Restaurador';
      case 'triage_nurse':
        return 'Enfermera de Triaje';
      case 'billing_admin':
        return 'Administrador de Facturación';
      case 'medical_director':
        return 'Director Médico';
      default:
        return role;
    }
  };

  const tSpecialty = (specialty: string): string => {
    if (language === 'es') return specialty;
    const map: Record<string, string> = {
      'Cirugía Maxilofacial e Implantes Cigomáticos': 'Maxillofacial Surgery & Zygomatic Implants',
      'Cirugía Maxilofacial': 'Maxillofacial Surgery',
      'Endodoncia Microscópica & Rehabilitación': 'Microscopic Endodontics & Rehabilitation',
      'Odontología General': 'General Dentistry',
      'Triaje Manchester & Soporte Vital Avanzado': 'Manchester Triage & Advanced Life Support',
      'Gestión de Coberturas Médicas & Planes Financieros': 'Insurance Claims & Financial Plans Management',
      'Urgencias & Triaje': 'Emergency & Triage',
      'Especialista Tresval Clinic': 'Tresval Clinic Specialist',
      'Especialista AuraClinic': 'Tresval Clinic Specialist',
      'Ortodoncia': 'Orthodontics',
      'Implantología': 'Implantology',
    };
    return map[specialty] || specialty;
  };

  const tToothName = (toothNumber: number, originalName?: string): string => {
    if (language === 'es') return originalName || `Pieza ${toothNumber}`;
    const enToothNames: Record<number, string> = {
      18: 'Upper Right 3rd Molar (Wisdom)', 17: 'Upper Right 2nd Molar', 16: 'Upper Right 1st Molar',
      15: 'Upper Right 2nd Premolar', 14: 'Upper Right 1st Premolar', 13: 'Upper Right Canine',
      12: 'Upper Right Lateral Incisor', 11: 'Upper Right Central Incisor',
      21: 'Upper Left Central Incisor', 22: 'Upper Left Lateral Incisor', 23: 'Upper Left Canine',
      24: 'Upper Left 1st Premolar', 25: 'Upper Left 2nd Premolar', 26: 'Upper Left 1st Molar',
      27: 'Upper Left 2nd Molar', 28: 'Upper Left 3rd Molar (Wisdom)',
      38: 'Lower Left 3rd Molar (Wisdom)', 37: 'Lower Left 2nd Molar', 36: 'Lower Left 1st Molar',
      35: 'Lower Left 2nd Premolar', 34: 'Lower Left 1st Premolar', 33: 'Lower Left Canine',
      32: 'Lower Left Lateral Incisor', 31: 'Lower Left Central Incisor',
      41: 'Lower Right Central Incisor', 42: 'Lower Right Lateral Incisor', 43: 'Lower Right Canine',
      44: 'Lower Right 1st Premolar', 45: 'Lower Right 2nd Premolar', 46: 'Lower Right 1st Molar',
      47: 'Lower Right 2nd Molar', 48: 'Lower Right 3rd Molar (Wisdom)',
    };
    return enToothNames[toothNumber] || `Tooth #${toothNumber}`;
  };

  const tProcedure = (text: string): string => {
    if (language === 'es') return text;
    const dictionary: Record<string, string> = {
      'Obturación / Composite Estético': 'Esthetic Composite Restoration',
      'Biopulpectomía Mecanizada': 'Rotary Endodontic Therapy',
      'Colocación de Implante Straumann': 'Straumann Titanium Implant Placement',
      'Corona Zirconio CAD/CAM': 'CAD/CAM Monolithic Zirconia Crown',
      'Exodoncia Simple o Quirúrgica': 'Surgical / Simple Tooth Extraction',
      'Carilla Estética Disilicato de Litio E.max': 'E.max Lithium Disilicate Cosmetic Veneer',
      'Sellador de Fosas y Fisuras': 'Pit & Fissure Sealant',
      'Limpieza y Profilaxis Ultrasónica': 'Ultrasonic Prophylaxis & Scaling',
      'Reconstrucción Dental con Poste de Fibra': 'Fiber Post Core Build-up',
      'Gingivectomía Estética Láser': 'Cosmetic Laser Gingivectomy',
      'Exodoncia de Cordal Incluido': 'Impacted Wisdom Tooth Extraction',
    };
    return dictionary[text] || text;
  };

  const tClinicalText = (text: string): string => {
    if (language === 'es') return text;
    // Map common mock phrases into natural English
    const phraseMap: [RegExp | string, string][] = [
      ['Dolor agudo e inflamación en molar inferior derecho (4.6) con irradiación a oído.', 'Acute pain and swelling in lower right molar (4.6) radiating to ear.'],
      ['Hipersensibilidad térmica intensa, dolor pulsátil nocturno.', 'Intense thermal hypersensitivity, nocturnal throbbing pain.'],
      ['Dolor agudo mandibular', 'Acute mandibular pain'],
      ['Pulpitis aguda irreversible', 'Acute irreversible pulpitis'],
      ['Fractura coronaria en incisivo central superior (2.1) tras traumatismo deportivo.', 'Coronal fracture on upper left central incisor (2.1) following sports trauma.'],
      ['Pérdida de esmalte y dentina sin exposición pulpar visible.', 'Loss of enamel and dentin without visible pulp exposure.'],
      ['Traumatismo dental', 'Dental trauma'],
      ['Fractura de esmalte y dentina', 'Enamel and dentin fracture'],
      ['Control postoperatorio tras colocación de implante 1.4.', 'Postoperative follow-up after implant placement #14.'],
      ['Cicatrización adecuada, sin signos de periimplantitis.', 'Proper healing, no signs of peri-implantitis.'],
      ['Control de implante', 'Implant follow-up'],
      ['Osteointegración en curso', 'Osseointegration in progress'],
      ['Hemorragia gingival profusa espontánea y dolor gingival difuso.', 'Profuse spontaneous gingival bleeding and diffuse gingival tenderness.'],
      ['Bolsas periodontales > 6mm generalizadas, cálculo subgingival abundante.', 'Generalized periodontal pockets > 6mm, heavy subgingival calculus.'],
      ['Hemorragia gingival activa', 'Active gingival bleeding'],
      ['Periodontitis crónica avanzada', 'Advanced chronic periodontitis'],
      ['Molestia masticatoria en premolar 3.5 con restauración antigua desadaptada.', 'Masticatory discomfort in premolar 3.5 with ill-fitting old restoration.'],
      ['Filtración marginal visible y dolor a la percusión vertical.', 'Visible marginal leakage and tenderness to vertical percussion.'],
      ['Filtración protésica', 'Prosthetic leakage'],
      ['Caries secundaria bajo restauración', 'Secondary caries under restoration'],
      ['Dolor agudo molar 3.6', 'Acute pain on molar 3.6'],
      ['Implante Transalveolar', 'Transalveolar Implant'],
      ['Endodoncia Multirradicular & Reconstrucción', 'Multi-rooted Endodontics & Build-up'],
      ['Obturación Composite Estético', 'Esthetic Composite Filling'],
      ['Endodoncia Mecanizada Multirradicular', 'Multi-rooted Rotary Endodontics'],
      ['Implante Quirúrgico Titanio Straumann BLX', 'Straumann BLX Titanium Surgical Implant'],
      ['Corona Cerámica Zirconio Monolítico', 'Monolithic Zirconia Ceramic Crown'],
      ['Exodoncia Quirúrgica de Resto Radicular', 'Surgical Extraction of Retained Root'],
      ['Carilla Estética Disilicato de Litio E.max', 'E.max Lithium Disilicate Cosmetic Veneer'],
      ['Fase 1: Urgencia & Saneamiento', 'Phase 1: Emergency & Sanitation'],
      ['Fase 2: Restauración & Cirugía', 'Phase 2: Restoration & Surgery'],
      ['Fase 3: Estética & Mantenimiento', 'Phase 3: Esthetics & Maintenance'],
    ];

    let result = text;
    for (const [pattern, repl] of phraseMap) {
      if (typeof pattern === 'string') {
        result = result.replace(new RegExp(pattern, 'g'), repl);
      } else {
        result = result.replace(pattern, repl);
      }
    }
    return result;
  };

  const tAllergy = (allergy: string): string => {
    if (language === 'es') return allergy;
    const allergyMap: Record<string, string> = {
      'Penicilina': 'Penicillin',
      'Penicilinas': 'Penicillins',
      'AINEs (Ibuprofeno)': 'NSAIDs (Ibuprofen)',
      'Látex': 'Latex',
      'Sulfamidas': 'Sulfonamides',
      'Codeína': 'Codeine',
      'Polen': 'Pollen',
      'Ácaros': 'Dust mites',
      'Gramíneas': 'Grasses',
      'Ninguna': 'None',
      'Sin alergias conocidas': 'No known allergies',
      'Sin alergias': 'No allergies',
    };
    return allergyMap[allergy] || allergy;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        tCondition,
        tTriageBadge,
        tStaffRole,
        tSpecialty,
        tToothName,
        tProcedure,
        tClinicalText,
        tAllergy,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
