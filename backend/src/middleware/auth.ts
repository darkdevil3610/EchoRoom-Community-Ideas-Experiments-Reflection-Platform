// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, AuthPayload } from "../services/auth.service";
import { getUserById } from "../services/auth.service";

export interface AuthRequest extends Request {
  user?: AuthPayload;
  userId?: string;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "Access token required" });
      return;
    }

    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);

    if (!payload) {
      res.status(401).json({ success: false, message: "Invalid or expired token" });
      return;
    }

    req.user = payload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const payload = verifyAccessToken(token);
      if (payload) {
        req.user = payload;
        req.userId = payload.userId;
      }
    }
    next();
  } catch {
    next();
  }
};

export const loadUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.userId) {
      const user = await getUserById(req.userId);
      if (user) {
        req.user = { userId: user.id, email: user.email, username: user.username, role: user.role };
      }
    }
    next();
  } catch (error) {
    next();
  }
};
