import { ToothState, VitalSigns } from "../types";

export interface VitalSignAssessment {
  status: "normal" | "warning" | "critical";
  message: string;
}

class ClinicalService {
  /**
   * Determine FDI Dental Quadrant (1=Upper Right, 2=Upper Left, 3=Lower Left, 4=Lower Right)
   */
  getQuadrant(toothNumber: number): { quadrant: 1 | 2 | 3 | 4; nameEs: string; nameEn: string; arch: "maxillary" | "mandibular" } {
    const q = Math.floor(toothNumber / 10);
    switch (q) {
      case 1:
        return { quadrant: 1, nameEs: "Cuadrante 1 (Superior Derecho)", nameEn: "Quadrant 1 (Upper Right)", arch: "maxillary" };
      case 2:
        return { quadrant: 2, nameEs: "Cuadrante 2 (Superior Izquierdo)", nameEn: "Quadrant 2 (Upper Left)", arch: "maxillary" };
      case 3:
        return { quadrant: 3, nameEs: "Cuadrante 3 (Inferior Izquierdo)", nameEn: "Quadrant 3 (Lower Left)", arch: "mandibular" };
      case 4:
      default:
        return { quadrant: 4, nameEs: "Cuadrante 4 (Inferior Derecho)", nameEn: "Quadrant 4 (Lower Right)", arch: "mandibular" };
    }
  }

  /**
   * Assess vital signs against standard clinical limits
   */
  assessVitals(vitals?: Partial<VitalSigns>): {
    hr: VitalSignAssessment;
    temp: VitalSignAssessment;
    spo2: VitalSignAssessment;
  } {
    const hr = vitals?.hr ?? 75;
    const temp = vitals?.temp ?? 36.6;
    const spo2 = vitals?.spo2 ?? 98;

    return {
      hr:
        hr > 110 || hr < 50
          ? { status: "critical", message: hr > 110 ? "Taquicardia severa" : "Bradicardia" }
          : hr > 95
          ? { status: "warning", message: "Frecuencia elevada" }
          : { status: "normal", message: "Rango normal" },
      temp:
        temp >= 38.5
          ? { status: "critical", message: "Fiebre alta / Riesgo bacteriemia" }
          : temp >= 37.5
          ? { status: "warning", message: "Febrícula" }
          : { status: "normal", message: "Afebril" },
      spo2:
        spo2 < 92
          ? { status: "critical", message: "Hipoxemia severa" }
          : spo2 < 95
          ? { status: "warning", message: "Saturación limítrofe" }
          : { status: "normal", message: "Normoxemia" },
    };
  }

  /**
   * Return human-friendly tooth type name from FDI number
   */
  getToothTypeName(toothNumber: number, language: "es" | "en" = "es"): string {
    const pos = toothNumber % 10;
    const isEn = language === "en";

    switch (pos) {
      case 1:
        return isEn ? "Central Incisor" : "Incisivo Central";
      case 2:
        return isEn ? "Lateral Incisor" : "Incisivo Lateral";
      case 3:
        return isEn ? "Canine" : "Canino";
      case 4:
        return isEn ? "First Premolar" : "Primer Premolar";
      case 5:
        return isEn ? "Second Premolar" : "Segundo Premolar";
      case 6:
        return isEn ? "First Molar" : "Primer Molar";
      case 7:
        return isEn ? "Second Molar" : "Segundo Molar";
      case 8:
        return isEn ? "Third Molar (Wisdom)" : "Tercer Molar (Cordal)";
      default:
        return isEn ? `Tooth ${toothNumber}` : `Pieza ${toothNumber}`;
    }
  }

  /**
   * Compute overall dental chart statistics
   */
  computeChartStats(teeth: ToothState[]) {
    const total = teeth.length;
    const healthy = teeth.filter((t) => t.condition === "healthy").length;
    const caries = teeth.filter((t) => t.condition === "caries").length;
    const missing = teeth.filter((t) => t.condition === "missing").length;
    const implants = teeth.filter((t) => t.condition === "implant").length;
    const endo = teeth.filter((t) => t.condition === "endodontic").length;
    const crowns = teeth.filter((t) => t.condition === "crown").length;

    return {
      total,
      healthy,
      caries,
      missing,
      implants,
      endo,
      crowns,
      needsTreatment: caries + (endo ? 1 : 0),
    };
  }
}

export const clinicalService = new ClinicalService();
