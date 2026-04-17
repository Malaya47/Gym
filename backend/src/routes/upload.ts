import { Router, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { requireAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  },
});

// Allow only image files
const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowed = /\.(jpg|jpeg|png|webp|gif|svg)$/i;
  if (allowed.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// ─── POST /api/upload (admin only) ─────────────────────
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  (req: AuthRequest, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ error: "No image file provided" });
      return;
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
  },
);

export default router;
