import express, { Router } from "express";
import { Request, Response } from "express";
import { addFeedbackTemplate } from "../controllers/feedbackTemplate/postFeedbackTemplate";
import jwtVerification from "../middleware/jwtVerification";
import { getFeedbackTemplateById } from "../controllers/feedbackTemplate/getFeedbackTemplateById";
import { getFeedbackTemplate } from "../controllers/feedbackTemplate/getFeedbackTemplate";
import { updateFeedbackTemplate } from "../controllers/feedbackTemplate/putFeedbackTemplate";
import { getFeedbackTemplateByMappingId } from "../controllers/feedbackTemplate/getFeedbackTemplateByMappingId";
import { postTrainingProgramFeedback } from "../controllers/feedback/postTrainingProgramFeedback";
import { getTrainingProgramAverageFeedback } from "../controllers/feedback/getTrainingProgramAverageFeedback";
import { getTrainingProgramFeedbackById } from "../controllers/feedback/getTrainingProgramFeedbackById";
import { getTrainingProgramFeedbackByProgramId } from "../controllers/feedback/getTrainingProgramFeedbackByProgramId";
const feedbackRouter = express.Router();

feedbackRouter.post(
  "/create-feedback",
  jwtVerification,
  async (req: Request, res: Response) => {
    await postTrainingProgramFeedback(req, res);
  }
);

feedbackRouter.get(
  "/view-average-feedback",
  jwtVerification,
  async (req: Request, res: Response) => {
    await getTrainingProgramAverageFeedback(req, res);
  }
);

feedbackRouter.get(
  "/view-feedback-by-id",
  jwtVerification,
  async (req: Request, res: Response) => {
    await getTrainingProgramFeedbackById(req, res);
  }
);

feedbackRouter.get(
  "/view-feedback-by-program-id",
  jwtVerification,
  async (req: Request, res: Response) => {
    await getTrainingProgramFeedbackByProgramId(req, res);
  }
);
export { feedbackRouter };
