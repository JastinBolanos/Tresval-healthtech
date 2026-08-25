import { useState, useEffect, useCallback } from "react";
import { Patient } from "../types";
import { aiService } from "../services/ai.service";

export interface CopilotMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  immediateActions?: string[];
}

export interface UseAICopilotProps {
  activePatient?: Patient | null;
  language: "es" | "en";
}

export function useAICopilot({ activePatient, language }: UseAICopilotProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize or reset welcome message when language changes
  useEffect(() => {
    const welcome =
      language === "en"
        ? `Hello, I am the Tresval Clinic OS Clinical AI Assistant. I am calibrated for triage support, maxillofacial surgery protocols, restorative dentistry, and drug-drug interactions. ${
            activePatient
              ? `Patient in context: ${activePatient.firstName} ${activePatient.lastName} (${
                  activePatient.allergies.length ? activePatient.allergies.join(", ") : "No declared allergies"
                }).`
              : ""
          }`
        : `Hola, soy el Asistente Clínico IA de Tresval Clinic OS. Estoy calibrado para soporte en triaje, protocolos de cirugía maxilofacial, odontología restauradora e interacciones medicamentosas. ${
            activePatient
              ? `Paciente en contexto: ${activePatient.firstName} ${activePatient.lastName} (${
                  activePatient.allergies.length ? activePatient.allergies.join(", ") : "Sin alergias"
                }).`
              : ""
          }`;

    setMessages([
      {
        id: "msg-welcome",
        sender: "ai",
        text: welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        immediateActions:
          language === "en"
            ? ["Triage protocol for acute pain", "Odontogenic antibiotic dosing", "Surgical hemostasis in anticoagulated"]
            : ["Protocolo triaje dolor agudo", "Posología antibiótica odontogénica", "Hemostasia quirúrgica en anticoagulado"],
      },
    ]);
  }, [language, activePatient?.id]);

  const sendMessage = useCallback(
    async (overrideText?: string) => {
      const textToSend = (overrideText || inputQuery).trim();
      if (!textToSend || isLoading) return;

      const userMsg: CopilotMessage = {
        id: `usr-${Date.now()}`,
        sender: "user",
        text: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputQuery("");
      setIsLoading(true);

      try {
        const response = await aiService.sendCopilotMessage({
          query: textToSend,
          activePatient: activePatient || undefined,
          language,
        });

        const aiMsg: CopilotMessage = {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: response.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          immediateActions: response.immediateActions,
        };

        setMessages((prev) => [...prev, aiMsg]);
      } catch {
        const fallbackMsg: CopilotMessage = {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text:
            language === "en"
              ? "Clinical protocol: In case of acute pulpal/periapical symptoms, perform vitality tests and digital periapical radiography. Review declared allergies before prescribing."
              : "Protocolo clínico: Ante síntomas pulpares o periapicales agudos, realizar pruebas de vitalidad y RX periapical. Verificar alergias antes de prescribir.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputQuery, isLoading, activePatient, language]
  );

  return {
    messages,
    inputQuery,
    setInputQuery,
    isLoading,
    sendMessage,
  };
}
