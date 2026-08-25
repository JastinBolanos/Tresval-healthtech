import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

export const SERVER_CONFIG = {
  PORT: 3000,
  CANDIDATE_MODELS: ["gemini-3.7-flash", "gemini-flash-latest"],
  DEFAULT_TIMEOUT_MS: 7000,
  SYSTEM_NAME: "Tresval Clinic OS Core",
} as const;

let aiClientInstance: GoogleGenAI | null = null;

export function getAIClient(): GoogleGenAI | null {
  if (!aiClientInstance && process.env.GEMINI_API_KEY) {
    aiClientInstance = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClientInstance;
}
