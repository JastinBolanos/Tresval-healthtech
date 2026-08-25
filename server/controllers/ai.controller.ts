import { Request, Response } from "express";
import { getAIClient } from "../config/index";
import { callGeminiWithTimeout } from "../services/gemini.service";
import { buildClinicalTriageFallback, TriageInputData } from "../services/triageFallback.service";

export async function triageAnalyzeController(req: Request, res: Response): Promise<void> {
  const { symptoms, vitals, painScore, specialty, patientAge, allergies, language } = req.body;
  const isEn = language === "en";

  const fallbackData: TriageInputData = {
    symptoms,
    vitals,
    painScore,
    specialty,
    patientAge,
    allergies,
    language,
  };

  const fallbackResponse = buildClinicalTriageFallback(fallbackData);

  try {
    const ai = getAIClient();
    if (!ai) {
      res.json(fallbackResponse);
      return;
    }

    const prompt = `Act as Medical Director & Triage Lead for Tresval Clinic OS.
Analyze the patient data to output an emergency triage assessment (Manchester/START level 1 to 5, where 1 is immediate resuscitation/critical and 5 non-urgent), ICD-10/CDT diagnoses, clinical red flags, and structured SOAP draft.
Language for response text: ${isEn ? "English" : "Spanish"}.

Patient Data:
- Specialty: ${specialty || (isEn ? "General Dentistry / Maxillofacial" : "Clínica General / Odontología")}
- Age: ${patientAge || 35}
- Chief Complaint & Symptoms: ${symptoms}
- Pain Score (VAS 1-10): ${painScore}
- Vital Signs: BP: ${vitals?.bp || "N/A"}, HR: ${vitals?.hr || "N/A"} bpm, SpO2: ${vitals?.spo2 || "N/A"}%, Temp: ${vitals?.temp || "N/A"}°C
- Allergies: ${allergies || (isEn ? "None" : "Ninguna")}

Respond strictly in JSON format with this structure:
{
  "triageLevel": number (1 to 5),
  "recommendedLevel": number (1 to 5),
  "triageCategory": "string",
  "assignedBox": "string",
  "estimatedWaitMinutes": number,
  "clinicalRisk": "Low" | "Moderate" | "High" | "Critical" | "Bajo" | "Moderado" | "Alto" | "Crítico",
  "clinicalRationale": "string",
  "suggestedICD10": ["string", "string"],
  "redFlags": ["string"],
  "recommendedProtocol": "string",
  "immediateActions": ["string", "string"],
  "soapDraft": {
    "subjective": "string",
    "objective": "string",
    "assessment": "string",
    "plan": "string"
  }
}`;

    const text = await callGeminiWithTimeout(prompt, 7000);
    if (!text) {
      res.json(fallbackResponse);
      return;
    }

    const parsed = JSON.parse(text);

    // Merge with fallback keys to ensure all frontend consumers receive required fields
    res.json({
      ...fallbackResponse,
      ...parsed,
      recommendedLevel: parsed.recommendedLevel || parsed.triageLevel || fallbackResponse.triageLevel,
      triageLevel: parsed.triageLevel || parsed.recommendedLevel || fallbackResponse.triageLevel,
      soapDraft: {
        ...fallbackResponse.soapDraft,
        ...(parsed.soapDraft || {}),
      },
    });
  } catch {
    res.json(fallbackResponse);
  }
}

export async function copilotChatController(req: Request, res: Response): Promise<void> {
  const { query, activePatient, language } = req.body;
  const isEn = language === "en";
  const patientAllergies = activePatient?.allergies?.length
    ? activePatient.allergies.join(", ")
    : isEn
    ? "None declared"
    : "Ninguna";

  const fallbackReply = isEn
    ? `Tresval Clinic OS Clinical Protocol:
1. Clinical Inquiry Analysis: "${query || "General Consultation"}".
2. Pharmacological Care: Verify declared allergies (${patientAllergies}). Adjust posology according to renal/hepatic clearance and body weight.
3. Clinical Action: In case of acute pulpal/periapical pain, confirm with digital periapical radiography and cold thermal testing, followed by chamber decompression.
4. Charting: Ensure all treatment and drug prescription is signed in the patient SOAP clinical record.`
    : `Protocolo Clínico Tresval Clinic OS:
1. Análisis de consulta: "${query || "Consulta general"}".
2. Manejo Farmacológico: Verificar alergias registradas (${patientAllergies}). Ajustar dosis según función renal/hepática y peso.
3. Procedimiento Clínico: En caso de dolor agudo pulpar o periapical, proceder a diagnóstico con vitalometría y RX digital, seguido de descompresión o instrumentación según protocolo GPC.
4. Registro: Toda prescripción y acto clínico debe quedar firmado en la Nota SOAP del expediente.`;

  const fallbackActions = isEn
    ? ["Review SOAP note", "Check declared allergies", "Prescribe per protocol"]
    : ["Revisar nota SOAP", "Verificar alergias", "Prescribir según protocolo"];

  try {
    const ai = getAIClient();
    if (!ai) {
      res.json({
        reply: fallbackReply,
        immediateActions: fallbackActions,
      });
      return;
    }

    const prompt = `Act as an expert Clinical AI Assistant for Tresval Clinic OS (specialized in Dentistry, Oral & Maxillofacial Surgery, Pharmacology, and Emergency Triage).
Language for response: ${isEn ? "English" : "Spanish"}.
Clinician Query:
"${query}"

${
  activePatient
    ? `Active Patient Context:
- Name: ${activePatient.firstName} ${activePatient.lastName} (${activePatient.age} yo)
- Allergies: ${patientAllergies}
- Medical History: ${
        activePatient.medicalHistory?.join(", ") ||
        (isEn ? "No relevant history" : "Sin antecedentes relevantes")
      }`
    : isEn
    ? "No patient selected in context."
    : "Sin paciente seleccionado en contexto."
}

Instructions:
1. Provide a concise, medically rigorous response grounded in clinical guidelines.
2. Include exact dosages, contraindications, and precautions if medications are discussed.
3. Suggest 2 or 3 immediate clinical actions.

Respond strictly in JSON format with:
{
  "reply": "string with clear clinical explanation and formatting",
  "immediateActions": ["string", "string"]
}`;

    const text = await callGeminiWithTimeout(prompt, 7000);
    if (!text) {
      res.json({
        reply: fallbackReply,
        immediateActions: fallbackActions,
      });
      return;
    }

    const parsed = JSON.parse(text);
    res.json({
      reply: parsed.reply || fallbackReply,
      immediateActions: parsed.immediateActions || fallbackActions,
    });
  } catch {
    res.json({
      reply: fallbackReply,
      immediateActions: fallbackActions,
    });
  }
}

export async function treatmentExplainerController(req: Request, res: Response): Promise<void> {
  const { patientName, treatments, totalCost, notes, language } = req.body;
  const isEn = language === "en";

  const fallbackResponse = {
    patientExplanation: isEn
      ? `Dear ${patientName || "Patient"}, your comprehensive treatment plan has been personalized to restore your oral health and overall well-being. It is structured into sequential phases for optimal comfort and lasting clinical success.`
      : `Estimado/a ${patientName || "Paciente"}, su plan de tratamiento integral ha sido diseñado para restaurar su salud bucodental y bienestar general. Consta de fases planificadas para máxima comodidad y éxito clínico a largo plazo.`,
    phasesSummary: isEn
      ? [
          { phase: "Phase 1: Hygiene & Decontamination", description: "Soft tissue preparation and removal of bacterial deposits." },
          { phase: "Phase 2: Core Interventions", description: "Specialized procedures agreed with your clinical team." },
          { phase: "Phase 3: Maintenance & Care", description: "Scheduled follow-up evaluations and preventive hygiene regimen." },
        ]
      : [
          { phase: "Fase 1: Higienización y Control", description: "Preparación de tejidos y eliminación de focos bacterianos." },
          { phase: "Fase 2: Intervención Principal", description: "Procedimientos específicos acordados con su especialista." },
          { phase: "Fase 3: Mantenimiento y Garantía", description: "Revisiones periódicas y pautas de higiene post-tratamiento." },
        ],
    homeCareRecommendations: isEn
      ? [
          "Avoid hard, very hot or cold foods during the first 24 hours.",
          "Maintain gentle hygiene with a soft surgical toothbrush and prescribed rinse.",
          "Take prescribed medications exactly according to your doctor's schedule.",
        ]
      : [
          "Evitar alimentos duros o a temperaturas extremas las primeras 24h.",
          "Mantener una higiene suave con cepillo quirúrgico o colutorio prescrito.",
          "Tomar la medicación exactamente en los horarios pautados por su doctor/a.",
        ],
  };

  try {
    const ai = getAIClient();
    if (!ai) {
      res.json(fallbackResponse);
      return;
    }

    const prompt = `Act as Medical Communication Specialist at Tresval Clinic OS. 
Craft a clear, empathetic, and reassuring explanation of the treatment plan for patient "${patientName}".
Language for output: ${isEn ? "English" : "Spanish"}.
Treatments included: ${JSON.stringify(treatments)}
Clinical Notes: ${notes || (isEn ? "Standard clinical plan" : "Tratamiento estándar planificado")}
Total estimated cost: $${totalCost}

Return strict JSON with:
{
  "patientExplanation": "Empathetic text in 2 clear paragraphs",
  "phasesSummary": [
    { "phase": "string", "description": "string" }
  ],
  "homeCareRecommendations": ["string", "string", "string"]
}`;

    const text = await callGeminiWithTimeout(prompt, 7000);
    if (!text) {
      res.json(fallbackResponse);
      return;
    }

    const parsed = JSON.parse(text);
    res.json({
      ...fallbackResponse,
      ...parsed,
    });
  } catch {
    res.json(fallbackResponse);
  }
}
