import { Request, Response } from "express";
import {
  createIdea,
  createDraft,
  updateDraft,
  publishDraft,
  getAllIdeas,
  getPublishedIdeas,
  getDraftIdeas,
  getIdeaById,
  IdeaStatus,
  updateIdeaStatus,
  deleteIdea
} from "../services/ideas.service";



function isValidString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidStatus(status: unknown): status is IdeaStatus {
  return ["draft", "proposed", "experiment", "outcome", "reflection"].includes(
    String(status)
  );
}

export const getIdeas = (_req: Request, res: Response): void => {
  const ideas = getPublishedIdeas();
  res.json({
    success: true,
    ideas,
  });
};

export const getAllIdeasHandler = (_req: Request, res: Response): void => {
  const ideas = getAllIdeas();
  res.json({
    success: true,
    ideas,
  });
};

export const getDrafts = (_req: Request, res: Response): void => {
  const drafts = getDraftIdeas();
  res.json({
    success: true,
    ideas: drafts,
  });
};

export const postDraft = (req: Request, res: Response): void => {
  const { title, description } = req.body;

  if (!isValidString(title) || !isValidString(description)) {
    res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
    return;
  }

  const draft = createDraft(title, description);
  res.status(201).json({
    success: true,
    idea: draft,
  });
};

export const putDraft = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid idea ID",
    });
    return;
  }

  if (!isValidString(title) || !isValidString(description)) {
    res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
    return;
  }

  try {
    const draft = updateDraft(id, title, description);

    if (!draft) {
      res.status(404).json({
        success: false,
        message: "Draft not found",
      });
      return;
    }

    res.json({
      success: true,
      idea: draft,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({
      success: false,
      message,
    });
  }
};

export const publishDraftHandler = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid idea ID",
    });
    return;
  }

  try {
    const idea = publishDraft(id);

    if (!idea) {
      res.status(404).json({
        success: false,
        message: "Draft not found",
      });
      return;
    }

    res.json({
      success: true,
      idea,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({
      success: false,
      message,
    });
  }
};

export const postIdea = (req: Request, res: Response): void => {
  const { title, description } = req.body;

  if (!isValidString(title) || !isValidString(description)) {
    res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
    return;
  }

  const idea = createIdea(title, description);
  res.status(201).json({
    success: true,
    idea,
  });
};

export const patchIdeaStatus = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (Number.isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid idea ID",
    });
    return;
  }

  if (!isValidStatus(status)) {
    res.status(400).json({
      success: false,
      message: "Invalid status value",
    });
    return;
  }

  try {
    const idea = updateIdeaStatus(id, status);

    if (!idea) {
      res.status(404).json({
        success: false,
        message: "Idea not found",
      });
      return;
    }

    res.json({
      success: true,
      idea,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({
      success: false,
      message,
    });
  }
};

export const deleteIdeaById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  console.log("DELETE request for ID:", id);
  

  if (Number.isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid idea ID",
    });
    return;
  }

  const deleted = deleteIdea(id);

  console.log("Deleted:", deleted);
  console.log("DELETE HIT:", id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Idea not found",
    });
    return;
  }

  res.json({
    success: true,
    message: "Idea deleted",
  });
};
export const getIdeaByIdHandler = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid idea ID",
    });
    return;
  }

  const idea = getIdeaById(id);

  if (!idea) {
    res.status(404).json({
      success: false,
      message: "Idea not found",
    });
    return;
  }

  res.json({
  success: true,
  idea,
});

};
