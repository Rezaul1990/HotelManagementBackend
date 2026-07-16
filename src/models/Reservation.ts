import mongoose, { Schema } from "mongoose";

export interface ReservationDocument extends mongoose.Document {
  guestName: string;
  guestEmail: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled";
  paymentStatus: "unpaid" | "partial" | "paid" | "refunded";
  totalAmount: number;
}

const reservationSchema = new Schema<ReservationDocument>(
  {
    guestName: { type: String, required: true, trim: true },
    guestEmail: { type: String, required: true, trim: true, lowercase: true },
    roomNumber: { type: String, required: true, trim: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "checked_in", "checked_out", "cancelled"],
      default: "pending"
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid", "refunded"],
      default: "unpaid"
    },
    totalAmount: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

reservationSchema.index({ roomNumber: 1, checkIn: 1, checkOut: 1 });

export const Reservation = mongoose.model<ReservationDocument>("Reservation", reservationSchema);
