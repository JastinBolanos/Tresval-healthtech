import { Request, Response } from "express";
import { SERVER_CONFIG } from "../config/index";

export function healthCheckController(req: Request, res: Response): void {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    system: SERVER_CONFIG.SYSTEM_NAME,
  });
}
