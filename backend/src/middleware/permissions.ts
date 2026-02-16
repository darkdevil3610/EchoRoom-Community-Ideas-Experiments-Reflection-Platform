// backend/src/middleware/permissions.ts
import { Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";
import { AuthRequest } from "./auth";

const roleHierarchy: Record<UserRole, number> = {
  ADMIN: 4,
  MODERATOR: 3,
  MEMBER: 2,
  GUEST: 1,
};

export type Permission =
  | "ideas:create" | "ideas:read" | "ideas:update" | "ideas:delete"
  | "experiments:create" | "experiments:read" | "experiments:update" | "experiments:delete"
  | "outcomes:create" | "outcomes:read" | "outcomes:update" | "outcomes:delete"
  | "reflections:create" | "reflections:read" | "reflections:update" | "reflections:delete"
  | "users:manage" | "moderation:manage";

const rolePermissions: Record<UserRole, Permission[]> = {
  ADMIN: ["ideas:create", "ideas:read", "ideas:update", "ideas:delete", "experiments:create", "experiments:read", "experiments:update", "experiments:delete", "outcomes:create", "outcomes:read", "outcomes:update", "outcomes:delete", "reflections:create", "reflections:read", "reflections:update", "reflections:delete", "users:manage", "moderation:manage"],
  MODERATOR: ["ideas:create", "ideas:read", "ideas:update", "experiments:create", "experiments:read", "experiments:update", "outcomes:create", "outcomes:read", "outcomes:update", "reflections:create", "reflections:read", "reflections:update", "moderation:manage"],
  MEMBER: ["ideas:create", "ideas:read", "ideas:update", "experiments:create", "experiments:read", "experiments:update", "outcomes:create", "outcomes:read", "reflections:create", "reflections:read"],
  GUEST: ["ideas:read", "experiments:read", "outcomes:read", "reflections:read"],
};

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return rolePermissions[role]?.includes(permission) ?? false;
};

export const hasRoleLevel = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export const requirePermission = (permission: Permission) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    if (!hasPermission(req.user.role, permission)) {
      res.status(403).json({ success: false, message: `Permission denied. Required: ${permission}` });
      return;
    }
    next();
  };
};

export const requireRole = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: `Access denied. Required roles: ${roles.join(", ")}` });
      return;
    }
    next();
  };
};

export const requireMinRole = (minRole: UserRole) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    if (!hasRoleLevel(req.user.role, minRole)) {
      res.status(403).json({ success: false, message: `Access denied. Minimum role required: ${minRole}` });
      return;
    }
    next();
  };
};

export const requireOwnership = (resourceUserIdField: string = "createdById") => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }
    if (req.user.role === "ADMIN" || req.user.role === "MODERATOR") {
      return next();
    }
    const ownerId = req.body[resourceUserIdField] || req.params[resourceUserIdField] || req.query[resourceUserIdField];
    if (!ownerId) {
      res.status(400).json({ success: false, message: "Cannot verify ownership: owner ID not found" });
      return;
    }
    if (ownerId !== req.user.userId) {
      res.status(403).json({ success: false, message: "You can only modify your own resources" });
      return;
    }
    next();
  };
};
