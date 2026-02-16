// backend/src/routes/auth.routes.ts
import { Router, Request, Response } from "express";
import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../services/auth.service";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ success: false, message: "Email, username, and password are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }
    const { user, tokens } = await registerUser(email, username, password);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user: { id: user.id, email: user.email, username: user.username, role: user.role }, tokens },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || "Registration failed" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const { user, tokens } = await loginUser(email, password);
    res.json({
      success: true,
      message: "Login successful",
      data: { user: { id: user.id, email: user.email, username: user.username, role: user.role }, tokens },
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message || "Invalid credentials" });
  }
});

router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "Refresh token is required" });
    }
    const tokens = await refreshAccessToken(refreshToken);
    res.json({ success: true, message: "Token refreshed successfully", data: tokens });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message || "Invalid or expired refresh token" });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) await logoutUser(refreshToken);
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Logout failed" });
  }
});

export default router;
