import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errors.js";
import { authRouter } from "./routes/auth.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { overviewRouter } from "./routes/overview.routes.js";
import { reservationsRouter } from "./routes/reservations.routes.js";
import { roomsRouter } from "./routes/rooms.routes.js";

export const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Hotel Management System API" });
});

app.use("/api/health", healthRouter);
app.use("/api/overview", overviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/reservations", reservationsRouter);

app.use(notFound);
app.use(errorHandler);
