import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { requireDatabase, requireJwtSecret } from "../middleware/requireConfig.js";
import { AppError } from "../middleware/errors.js";
import { User } from "../models/User.js";

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["owner", "manager", "receptionist", "housekeeping", "accountant", "maintenance", "guest"]).default("receptionist")
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

authRouter.post("/register", requireDatabase, requireJwtSecret, async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const existing = await User.findOne({ email: payload.email });
    if (existing) {
      throw new AppError(409, "A user with this email already exists.", "EMAIL_EXISTS");
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);
    const user = await User.create({ ...payload, passwordHash });

    res.status(201).json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", requireDatabase, requireJwtSecret, async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const user = await User.findOne({ email: payload.email });
    if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
      throw new AppError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
    }

    const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret as string, {
      expiresIn: env.jwtExpiresIn
    } as jwt.SignOptions);

    res.json({
      success: true,
      data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }
    });
  } catch (error) {
    next(error);
  }
});
