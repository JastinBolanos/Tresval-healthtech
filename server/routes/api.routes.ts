import { Router } from "express";
import { healthCheckController } from "../controllers/health.controller";
import {
  triageAnalyzeController,
  copilotChatController,
  treatmentExplainerController,
} from "../controllers/ai.controller";

export const apiRouter = Router();

// Health Check
apiRouter.get("/health", healthCheckController);

// AI Medical Intelligence Endpoints
apiRouter.post("/ai/triage-analyze", triageAnalyzeController);
apiRouter.post("/ai/copilot-chat", copilotChatController);
apiRouter.post("/ai/treatment-explainer", treatmentExplainerController);
