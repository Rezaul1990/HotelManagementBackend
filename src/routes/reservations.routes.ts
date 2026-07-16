import { Router } from "express";
import { z } from "zod";
import { requireDatabase } from "../middleware/requireConfig.js";
import { Reservation } from "../models/Reservation.js";

export const reservationsRouter = Router();

const reservationSchema = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  roomNumber: z.string().min(1),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  guests: z.number().int().min(1),
  totalAmount: z.number().min(0),
  status: z.enum(["pending", "confirmed", "checked_in", "checked_out", "cancelled"]).default("pending"),
  paymentStatus: z.enum(["unpaid", "partial", "paid", "refunded"]).default("unpaid")
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date.",
  path: ["checkOut"]
});

reservationsRouter.get("/", requireDatabase, async (_req, res, next) => {
  try {
    const reservations = await Reservation.find().sort({ checkIn: 1 });
    res.json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
});

reservationsRouter.post("/", requireDatabase, async (req, res, next) => {
  try {
    const payload = reservationSchema.parse(req.body);
    const reservation = await Reservation.create(payload);
    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
});
