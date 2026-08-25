import express from "express";
import { SERVER_CONFIG } from "./server/config/index";
import { apiRouter } from "./server/routes/api.routes";
import { setupFrontendMiddleware } from "./server/middleware/vite.middleware";

async function bootstrapServer() {
  const app = express();
  const PORT = SERVER_CONFIG.PORT;

  // JSON Body Parser
  app.use(express.json());

  // Mount API Domain Routes
  app.use("/api", apiRouter);

  // Mount Frontend Serving (Vite dev middleware or Production Static)
  await setupFrontendMiddleware(app);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tresval Clinic OS server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrapServer();
