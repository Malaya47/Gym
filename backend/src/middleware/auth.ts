import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

// ─── Verify user JWT ────────────────────────────────────
export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized – token missing" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, secret) as { userId: number };
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized – invalid token" });
  }
}

// ─── Verify admin JWT ───────────────────────────────────
export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized – token missing" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_ADMIN_SECRET as string;
    const payload = jwt.verify(token, secret) as {
      adminId: number;
      isAdmin: boolean;
    };
    if (!payload.isAdmin) {
      res.status(403).json({ error: "Forbidden – not an admin" });
      return;
    }
    req.userId = payload.adminId;
    req.isAdmin = true;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized – invalid admin token" });
  }
}
