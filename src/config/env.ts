import dotenv from "dotenv";

dotenv.config();

const isPlaceholder = (value: string | undefined) =>
  !value || value.includes("your_") || value.trim().length === 0;

export const env = {
  port: Number(process.env.PORT ?? 5000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  get hasDatabase() {
    return !isPlaceholder(this.mongoUri);
  },
  get hasJwtSecret() {
    return !isPlaceholder(this.jwtSecret);
  }
};
