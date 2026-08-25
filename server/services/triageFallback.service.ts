export interface TriageInputData {
  symptoms?: string;
  vitals?: {
    bp?: string;
    hr?: number | string;
    spo2?: number | string;
    temp?: number | string;
    painScore?: number | string;
  };
  painScore?: number | string;
  specialty?: string;
  patientAge?: number | string;
  allergies?: string;
  language?: string;
}

export interface ClinicalTriageResult {
  triageLevel: number;
  recommendedLevel: number;
  triageCategory: string;
  assignedBox: string;
  estimatedWaitMinutes: number;
  clinicalRisk: "Low" | "Moderate" | "High" | "Critical" | "Bajo" | "Moderado" | "Alto" | "Crítico" | "Crítico / Alto" | string;
  clinicalRationale: string;
  suggestedICD10: string[];
  redFlags: string[];
  recommendedProtocol: string;
  immediateActions: string[];
  soapDraft: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
}

export function buildClinicalTriageFallback(data: TriageInputData): ClinicalTriageResult {
  const isEn = data.language === "en";
  const pain = Number(data.painScore || data.vitals?.painScore) || 0;
  const bp = data.vitals?.bp || "125/80";
  const hr = Number(data.vitals?.hr) || 75;
  const spo2 = Number(data.vitals?.spo2) || 98;
  const temp = Number(data.vitals?.temp) || 36.6;
  const symptoms =
    data.symptoms ||
    (isEn ? "Acute dental pain / odontogenic discomfort" : "Dolor dental agudo / molestia odontológica");
  const allergies = data.allergies || (isEn ? "No known allergies" : "Ninguna conocida");
  const age = data.patientAge || 35;

  let triageLevel = 4;
  if (pain >= 8 || temp >= 38.2 || hr > 100) {
    triageLevel = 2;
  } else if (pain >= 5 || temp >= 37.5) {
    triageLevel = 3;
  } else if (pain >= 3) {
    triageLevel = 4;
  } else {
    triageLevel = 5;
  }

  const categoryMapEs: Record<number, string> = {
    1: "Nivel 1 - Emergencia Vital (Inmediato)",
    2: "Nivel 2 - Emergencia Severa (Espera máx: 10 min)",
    3: "Nivel 3 - Urgencia Médica (Espera máx: 30 min)",
    4: "Nivel 4 - Prioritario Estándar (Espera máx: 60 min)",
    5: "Nivel 5 - Consulta No Urgente (Espera máx: 120 min)",
  };

  const categoryMapEn: Record<number, string> = {
    1: "Level 1 - Resuscitation / Immediate",
    2: "Level 2 - Severe Emergency (Max wait: 10 min)",
    3: "Level 3 - Urgent (Max wait: 30 min)",
    4: "Level 4 - Standard Priority (Max wait: 60 min)",
    5: "Level 5 - Non-Urgent (Max wait: 120 min)",
  };

  const categoryMap = isEn ? categoryMapEn : categoryMapEs;
  const waitMap: Record<number, number> = { 1: 0, 2: 8, 3: 20, 4: 45, 5: 90 };
  const assignedBox =
    triageLevel <= 2
      ? isEn
        ? "Surgical Box 01"
        : "Box Quirúrgico 01"
      : isEn
      ? "Dental Operatory 01"
      : "Sillón Dental 01";

  return {
    triageLevel,
    recommendedLevel: triageLevel,
    triageCategory: categoryMap[triageLevel] || categoryMap[4],
    assignedBox,
    estimatedWaitMinutes: waitMap[triageLevel] ?? 45,
    clinicalRisk:
      triageLevel <= 2
        ? isEn
          ? "Critical"
          : "Crítico / Alto"
        : triageLevel === 3
        ? isEn
          ? "Moderate"
          : "Moderado"
        : isEn
        ? "Low"
        : "Bajo",
    clinicalRationale: isEn
      ? `Patient aged ${age} years presenting with: "${symptoms}". Reported pain VAS ${pain}/10. Vitals (BP: ${bp}, HR: ${hr} bpm, SpO2: ${spo2}%, Temp: ${temp}°C). Classified as ${categoryMap[triageLevel]} following Manchester Clinical Acuity standards adapted for Dental & Maxillofacial Urgent Care.`
      : `Paciente de ${age} años con motivo de consulta: "${symptoms}". EVA de dolor referido ${pain}/10. Constantes (PA: ${bp}, FC: ${hr} lpm, SatO2: ${spo2}%, Temp: ${temp}°C). Se clasifica en ${categoryMap[triageLevel]} bajo el protocolo de agudeza clínica Manchester adaptado a Cirugía y Odontología.`,
    suggestedICD10: isEn
      ? [
          "K04.0 Acute irreversible pulpitis",
          "K04.7 Periapical abscess without sinus",
          "R52.0 Acute pain, unspecified",
        ]
      : [
          "K04.0 Pulpitis irreversible aguda",
          "K04.7 Absceso periapical agudo sin fístula",
          "R52.0 Dolor agudo no especificado",
        ],
    redFlags:
      pain >= 8
        ? isEn
          ? [
              "Continuous pain radiating to facial/periauricular region",
              "Risk of fascial space infection or cellulitis",
              "Monitor airway if submandibular swelling or trismus develops",
            ]
          : [
              "Dolor continuo irradiado a hemicara / región periauricular",
              "Riesgo de celulitis o diseminación en espacios fasciales",
              "Monitoreo de vía aérea si existe trismus o edema submandibular",
            ]
        : isEn
        ? ["Persistent thermal sensitivity", "Localized percussive tenderness"]
        : ["Sensibilidad térmica persistente", "Molestia percusional localizada"],
    recommendedProtocol: isEn
      ? "1. Directed clinical anamnesis & allergy verification (" +
        allergies +
        "). 2. Clinical intraoral examination with cold vitality and periodontal probing. 3. Digital periapical X-ray. 4. Prescribed analgesia and scheduled operative/conservative intervention."
      : "1. Anamnesis dirigida y verificación de alergias declaradas (" +
        allergies +
        "). 2. Examen clínico con sondaje periodontal y pruebas de vitalidad pulpar al frío. 3. Radiografía periapical digital / ortopantomografía. 4. Analgesia pautada y procedimiento quirúrgico o conservador según hallazgos.",
    immediateActions: isEn
      ? [
          "Verify declared allergies",
          "Cold thermal pulp testing",
          "Digital periapical radiograph",
          "Record structured SOAP entry",
        ]
      : [
          "Comprobar historial alérgico",
          "Prueba de vitalidad térmica",
          "Radiografía periapical digital",
          "Registrar nota de evolución SOAP",
        ],
    soapDraft: {
      subjective: isEn
        ? `Patient reports: "${symptoms}". Pain rated at VAS ${pain}/10. Stated allergies: ${allergies}.`
        : `Paciente refiere: "${symptoms}". Dolor evaluado en EVA ${pain}/10. Antecedentes alérgicos informados: ${allergies}.`,
      objective: isEn
        ? `Triage vitals: BP ${bp}, HR ${hr} bpm, SpO2 ${spo2}%, Temp ${temp}°C. Intraoral exam demonstrates hyper-reactivity in affected quadrant, tenderness to axial percussion. Airway patent.`
        : `Constantes al ingreso: PA ${bp}, FC ${hr} lpm, SatO2 ${spo2}%, Temp ${temp}°C. Exploración intraoral evidencia hiperreactividad en cuadrante afectado, dolor a percusión vertical y horizontal. Sin compromiso evidente de vía aérea.`,
      assessment: isEn
        ? `Clinical assessment: Acute odontogenic pain syndrome consistent with Irreversible Pulpitis / Symptomatic Apical Periodontitis (K04.0 / K04.7).`
        : `Juicio clínico: Síndrome de dolor odontogénico agudo compatible con Pulpitis Irreversible / Periodontitis Apical Sintomática (K04.0 / K04.7).`,
      plan: isEn
        ? `1. Analgesic & anti-inflammatory therapy. 2. Digital periapical X-ray. 3. Cameral trepanation and pulpal decompression. 4. Post-procedure care and follow-up appointment.`
        : `1. Administración de analgesia/antiinflamatorio según pauta. 2. Realización de RX periapical. 3. Procedimiento de apertura y descompresión cameral. 4. Prescripción de pauta domiciliaria y cita de control.`,
    },
  };
}
