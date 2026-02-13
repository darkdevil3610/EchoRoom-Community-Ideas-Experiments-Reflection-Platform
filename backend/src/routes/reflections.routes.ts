import { Router, Request, Response } from "express";
import { outcomes } from "./outcomes.routes";

const router = Router();

/**
 * Reflection model (temporary in-memory)
 */
interface Reflection {
  id: number;
  outcomeId: number;
  content: string;
  createdAt: Date;
}

/**
 * Temporary storage
 */
export let reflections: Reflection[] = [];
let nextId = 1;


/**
 * POST /reflections
 * Create a reflection for an outcome
 *
 * Learning loop rule enforced:
 * Outcome must exist before Reflection
 */
router.post("/", (req: Request, res: Response) => {
  try {
    const { outcomeId, content } = req.body;

    // 1. Validate required fields
    if (!outcomeId || !content) {
      return res.status(400).json({
        success: false,
        message: "outcomeId and content are required",
      });
    }

    // 2. Check outcome exists
    const outcomeExists = outcomes.find(
      (o) => o.id === outcomeId
    );

    if (!outcomeExists) {
      return res.status(400).json({
        success: false,
        message: "Outcome does not exist",
      });
    }

    // 3. Create reflection
    const newReflection: Reflection = {
      id: nextId++,
      outcomeId,
      content,
      createdAt: new Date(),
    };

    // 4. Store reflection
    reflections.push(newReflection);

    return res.status(201).json({
      success: true,
      message: "Reflection created successfully",
      data: newReflection,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create reflection",
    });
  }
});


/**
 * GET /reflections
 * Get all reflections
 */
router.get("/", (_req: Request, res: Response) => {
  return res.json({
    success: true,
    count: reflections.length,
    data: reflections,
  });
});


/**
 * GET /reflections/:outcomeId
 * Get reflections for specific outcome
 */
router.get("/:outcomeId", (req: Request, res: Response) => {
  try {
    const outcomeId = Number(req.params.outcomeId);

    if (!outcomeId) {
      return res.status(400).json({
        success: false,
        message: "Valid outcomeId is required",
      });
    }

    const filtered = reflections.filter(
      (r) => r.outcomeId === outcomeId
    );

    return res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reflections",
    });
  }
});


export default router;
