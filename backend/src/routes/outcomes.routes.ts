import { Router, Request, Response } from "express";
import { experiments } from "./experiments.routes";

const router = Router();

/**
 * Outcome model (temporary in-memory)
 */
interface Outcome {
  id: number;
  experimentId: number;
  result: string;
  notes: string;
  createdAt: Date;
}

/**
 * Temporary storage
 */
export let outcomes: Outcome[] = [];
let nextId = 1;


/**
 * POST /outcomes
 * Create a new outcome
 *
 * Learning loop rule enforced:
 * Experiment must exist before Outcome can be created
 */
router.post("/", (req: Request, res: Response) => {
  try {
    const { experimentId, result, notes } = req.body;

    // 1. Validate required fields
    if (!experimentId || !result) {
      return res.status(400).json({
        success: false,
        message: "experimentId and result are required",
      });
    }

    // 2. Validate experiment exists
    const experimentExists = experiments.find(
      (e) => e.id === experimentId
    );

    if (!experimentExists) {
      return res.status(400).json({
        success: false,
        message: "Experiment does not exist",
      });
    }

    // 3. Create outcome
    const newOutcome: Outcome = {
      id: nextId++,
      experimentId,
      result,
      notes: notes || "",
      createdAt: new Date(),
    };

    // 4. Store outcome
    outcomes.push(newOutcome);

    // 5. Return response
    return res.status(201).json({
      success: true,
      message: "Outcome created successfully",
      data: newOutcome,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create outcome",
    });
  }
});


/**
 * GET /outcomes
 * Get all outcomes
 */
router.get("/", (_req: Request, res: Response) => {
  return res.json({
    success: true,
    count: outcomes.length,
    data: outcomes,
  });
});


/**
 * GET /outcomes/:experimentId
 * Get outcomes for a specific experiment
 */
router.get("/:experimentId", (req: Request, res: Response) => {
  try {
    const experimentId = Number(req.params.experimentId);

    if (!experimentId) {
      return res.status(400).json({
        success: false,
        message: "Valid experimentId is required",
      });
    }

    const filteredOutcomes = outcomes.filter(
      (outcome) => outcome.experimentId === experimentId
    );

    return res.json({
      success: true,
      count: filteredOutcomes.length,
      data: filteredOutcomes,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch outcomes",
    });
  }
});


export default router;
