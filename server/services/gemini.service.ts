import { getAIClient, SERVER_CONFIG } from "../config/index";

export function sanitizeJsonResponse(rawText: string): string {
  let text = rawText.trim();
  if (text.startsWith("```json")) {
    text = text.slice(7);
  } else if (text.startsWith("```")) {
    text = text.slice(3);
  }
  if (text.endsWith("```")) {
    text = text.slice(0, -3);
  }
  return text.trim();
}

export async function callGeminiWithTimeout(
  prompt: string,
  timeoutMs: number = SERVER_CONFIG.DEFAULT_TIMEOUT_MS
): Promise<string | null> {
  const ai = getAIClient();
  if (!ai) return null;

  for (const model of SERVER_CONFIG.CANDIDATE_MODELS) {
    try {
      const aiPromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout calling model ${model}`)), timeoutMs)
      );

      const response = await Promise.race([aiPromise, timeoutPromise]);
      const rawText = response.text || "";
      const cleaned = sanitizeJsonResponse(rawText);
      if (cleaned) {
        return cleaned;
      }
    } catch (err: any) {
      // Gracefully try candidate fallback model on high load or timeout
      const status = err?.status || err?.code || "";
      const msg = err?.message || "";
      if (
        status === 503 ||
        status === 429 ||
        msg.includes("high demand") ||
        msg.includes("timed out") ||
        msg.includes("Timeout")
      ) {
        continue;
      }
    }
  }
  return null;
}
