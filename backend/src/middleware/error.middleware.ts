import { NextFunction, Request, Response } from "express";
import { ConflictError } from "../lib/conflictError";

export const notFoundMiddleware = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error);

  // 🔹 Optimistic Lock Conflict
  if (error instanceof ConflictError) {
    res.status(409).json({
      success: false,
      message: error.message,
    });
    return;
  }

  // 🔹 Default error
  const message =
    error instanceof Error ? error.message : "Internal server error";

  res.status(500).json({
    success: false,
    message,
  });
};
