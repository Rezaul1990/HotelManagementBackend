import { Router } from "express";
import { z } from "zod";
import { requireDatabase } from "../middleware/requireConfig.js";
import { Room } from "../models/Room.js";

export const roomsRouter = Router();

const roomSchema = z.object({
  number: z.string().min(1),
  type: z.string().min(2),
  floor: z.number().int().min(0),
  capacity: z.number().int().min(1),
  rate: z.number().min(0),
  status: z.enum(["available", "occupied", "reserved", "cleaning", "maintenance"]).default("available")
});

roomsRouter.get("/", requireDatabase, async (_req, res, next) => {
  try {
    const rooms = await Room.find().sort({ number: 1 });
    res.json({ success: true, data: rooms });
  } catch (error) {
    next(error);
  }
});

roomsRouter.post("/", requireDatabase, async (req, res, next) => {
  try {
    const payload = roomSchema.parse(req.body);
    const room = await Room.create(payload);
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
});
