import { Router } from "express";
import {
  getIdeas,
  getAllIdeasHandler,
  getDrafts,
  postIdea,
  postDraft,
  putDraft,
  publishDraftHandler,
  patchIdeaStatus,
  deleteIdeaById,
  getIdeaByIdHandler
} from "../controllers/ideas.controller";

const router = Router();

router.get("/", getIdeas);
router.get("/all", getAllIdeasHandler);
router.get("/drafts", getDrafts);
router.post("/", postIdea);
router.post("/drafts", postDraft);
router.put("/:id", putDraft);
router.patch("/:id/publish", publishDraftHandler);
router.patch("/:id/status", patchIdeaStatus);
router.delete("/:id", deleteIdeaById);
router.get("/:id", getIdeaByIdHandler);


export default router;
