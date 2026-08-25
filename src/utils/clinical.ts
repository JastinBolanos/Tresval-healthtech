import { TriageLevel } from "../types";

export interface TriageLevelConfig {
  level: TriageLevel;
  nameEs: string;
  nameEn: string;
  maxWaitMinutes: number;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  riskEs: string;
  riskEn: string;
}

export const TRIAGE_CONFIGS: Record<TriageLevel, TriageLevelConfig> = {
  1: {
    level: 1,
    nameEs: "Nivel 1 - Reanimación / Vital",
    nameEn: "Level 1 - Resuscitation",
    maxWaitMinutes: 0,
    badgeBg: "bg-red-500/10",
    badgeText: "text-red-700",
    badgeBorder: "border-red-500/30",
    dotColor: "bg-red-500",
    riskEs: "Crítico Inmediato",
    riskEn: "Immediate Critical",
  },
  2: {
    level: 2,
    nameEs: "Nivel 2 - Emergencia Severa",
    nameEn: "Level 2 - Emergency",
    maxWaitMinutes: 10,
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-500/30",
    dotColor: "bg-amber-500",
    riskEs: "Alto Riesgo",
    riskEn: "High Risk",
  },
  3: {
    level: 3,
    nameEs: "Nivel 3 - Urgencia Médica",
    nameEn: "Level 3 - Urgent",
    maxWaitMinutes: 30,
    badgeBg: "bg-yellow-500/10",
    badgeText: "text-yellow-800",
    badgeBorder: "border-yellow-500/30",
    dotColor: "bg-yellow-500",
    riskEs: "Moderado",
    riskEn: "Moderate Risk",
  },
  4: {
    level: 4,
    nameEs: "Nivel 4 - Prioritario Estándar",
    nameEn: "Level 4 - Standard Priority",
    maxWaitMinutes: 60,
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-500/30",
    dotColor: "bg-emerald-500",
    riskEs: "Bajo / Estable",
    riskEn: "Low / Stable",
  },
  5: {
    level: 5,
    nameEs: "Nivel 5 - No Urgente",
    nameEn: "Level 5 - Non-Urgent",
    maxWaitMinutes: 120,
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-800",
    badgeBorder: "border-blue-500/30",
    dotColor: "bg-blue-500",
    riskEs: "Mínimo",
    riskEn: "Minimal",
  },
};

export function getTriageConfig(level: TriageLevel): TriageLevelConfig {
  return TRIAGE_CONFIGS[level] || TRIAGE_CONFIGS[4];
}
