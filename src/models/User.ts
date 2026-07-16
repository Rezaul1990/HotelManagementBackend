import mongoose, { Schema } from "mongoose";

export type UserRole = "owner" | "manager" | "receptionist" | "housekeeping" | "accountant" | "maintenance" | "guest";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["owner", "manager", "receptionist", "housekeeping", "accountant", "maintenance", "guest"],
      default: "receptionist"
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
