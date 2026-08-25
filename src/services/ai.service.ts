import { Patient } from "../types";

export interface TriageAnalysisRequest {
  symptoms: string;
  vitals?: {
    bp?: string;
    hr?: number | string;
    spo2?: number | string;
    temp?: number | string;
    painScore?: number | string;
  };
  painScore?: number;
  specialty?: string;
  patientAge?: number | string;
  allergies?: string;
  language?: string;
}

export interface TriageAnalysisResponse {
  triageLevel: number;
  recommendedLevel: number;
  triageCategory: string;
  assignedBox: string;
  estimatedWaitMinutes: number;
  clinicalRisk: string;
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

export interface CopilotChatRequest {
  query: string;
  activePatient?: Patient | null;
  language?: string;
}

export interface CopilotChatResponse {
  reply: string;
  immediateActions: string[];
}

export interface TreatmentExplainerRequest {
  patientName: string;
  treatments: string[];
  totalCost: number;
  notes?: string;
  language?: string;
}

export interface TreatmentExplainerResponse {
  patientExplanation: string;
  phasesSummary: Array<{ phase: string; description: string }>;
  homeCareRecommendations: string[];
}

class AIService {
  /**
   * Request Clinical Triage analysis and Manchester priority recommendation
   */
  async analyzeTriage(payload: TriageAnalysisRequest): Promise<TriageAnalysisResponse> {
    const res = await fetch("/api/ai/triage-analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`AI Triage request failed with status ${res.status}`);
    }

    return res.json();
  }

  /**
   * Request conversational clinical intelligence from AI Copilot
   */
  async sendCopilotMessage(payload: CopilotChatRequest): Promise<CopilotChatResponse> {
    const res = await fetch("/api/ai/copilot-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`AI Copilot request failed with status ${res.status}`);
    }

    return res.json();
  }

  /**
   * Request patient-friendly treatment explanation and phased breakdown
   */
  async explainTreatment(payload: TreatmentExplainerRequest): Promise<TreatmentExplainerResponse> {
    const res = await fetch("/api/ai/treatment-explainer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`AI Treatment Explainer failed with status ${res.status}`);
    }

    return res.json();
  }
}

export const aiService = new AIService();
