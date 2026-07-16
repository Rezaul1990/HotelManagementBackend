import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  if (!env.hasDatabase || !env.mongoUri) {
    console.warn("MONGODB_URI is not configured. Database-backed routes will return setup errors.");
    return;
  }

  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
}
