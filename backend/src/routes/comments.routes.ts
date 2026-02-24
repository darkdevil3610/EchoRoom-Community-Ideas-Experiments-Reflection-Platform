import { Router } from "express";
import { getCommentsHandler, postCommentHandler } from "../controllers/comments.controller";
import { optionalAuth } from "../middleware/auth";

// We'll define these in a way that ideaId is available from the URL
const router = Router({ mergeParams: true });

router.get("/", getCommentsHandler);
router.post("/", optionalAuth, postCommentHandler);

export default router;
