import { Router, Request, Response } from "express";

const router = Router();

// Allowed lifecycle states
type IdeaStatus = "proposed" | "experiment" | "outcome" | "reflection";


// Temporary in-memory storage
interface Idea {
  id: number;
  title: string;
  description: string;
  status: string;
  status: IdeaStatus;

}

let ideas: Idea[] = [];
let nextId = 1;
// Define valid state transitions
const allowedTransitions: Record<IdeaStatus, IdeaStatus[]> = {
  proposed: ["experiment"],
  experiment: ["outcome"],
  outcome: ["reflection"],
  reflection: [],
};


// GET /ideas
router.get("/", (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      ideas: ideas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch ideas",
    });
  }
});

// POST /ideas
router.post("/", (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    // validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newIdea: Idea = {
      id: nextId++,
      title,
      description,
      status: "proposed",
    };

    ideas.push(newIdea);

    res.status(201).json({
      success: true,
      idea: newIdea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create idea",
    });
  }
});
// PATCH /ideas/:id/status
router.patch("/:id/status", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body as { status: IdeaStatus };

    const idea = ideas.find(i => i.id === id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found",
      });
    }

    // validate transition
    const allowed = allowedTransitions[idea.status];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid transition from '${idea.status}' to '${status}'`,
      });
    }

    idea.status = status;

    res.json({
      success: true,
      idea,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update idea status",
    });
  }
});


export default router;
