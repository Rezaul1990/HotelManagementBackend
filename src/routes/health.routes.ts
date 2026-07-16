import { Router } from "express";
import { env } from "../config/env.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "hotel-management-system-api",
    status: "ok",
    databaseConfigured: env.hasDatabase,
    authConfigured: env.hasJwtSecret,
    timestamp: new Date().toISOString()
  });
});
