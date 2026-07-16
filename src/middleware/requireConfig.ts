import type { RequestHandler } from "express";
import { env } from "../config/env.js";
import { AppError } from "./errors.js";

export const requireDatabase: RequestHandler = (_req, _res, next) => {
  if (!env.hasDatabase) {
    next(new AppError(503, "MONGODB_URI is not configured. Add it to backend/.env to use this route.", "DATABASE_NOT_CONFIGURED"));
    return;
  }
  next();
};

export const requireJwtSecret: RequestHandler = (_req, _res, next) => {
  if (!env.hasJwtSecret) {
    next(new AppError(503, "JWT_SECRET is not configured. Add it to backend/.env to use authentication.", "JWT_NOT_CONFIGURED"));
    return;
  }
  next();
};
