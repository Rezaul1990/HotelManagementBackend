import mongoose, { Schema } from "mongoose";

export interface RoomDocument extends mongoose.Document {
  number: string;
  type: string;
  floor: number;
  capacity: number;
  rate: number;
  status: "available" | "occupied" | "reserved" | "cleaning" | "maintenance";
}

const roomSchema = new Schema<RoomDocument>(
  {
    number: { type: String, required: true, unique: true, trim: true },
    type: { type: String, required: true, trim: true },
    floor: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    rate: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["available", "occupied", "reserved", "cleaning", "maintenance"],
      default: "available"
    }
  },
  { timestamps: true }
);

export const Room = mongoose.model<RoomDocument>("Room", roomSchema);
