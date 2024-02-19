import express, { Router } from "express";
import { Request, Response } from "express";
import { addFeedbackTemplate } from "../controllers/feedbackTemplate/postFeedbackTemplate";
import jwtVerification from "../middleware/jwtVerification";
import { getFeedbackTemplateById } from "../controllers/feedbackTemplate/getFeedbackTemplateById";
import { getFeedbackTemplate } from "../controllers/feedbackTemplate/getFeedbackTemplate";
import { updateFeedbackTemplate } from "../controllers/feedbackTemplate/putFeedbackTemplate";
import { getFeedbackTemplateByMappingId } from "../controllers/feedbackTemplate/getFeedbackTemplateByMappingId";
const feedbackTemplateRouter = express.Router();

feedbackTemplateRouter.post(
  "/create-feedback-template",
  jwtVerification,
  async (req: Request, res: Response) => {
    await addFeedbackTemplate(req, res);
  }
);

feedbackTemplateRouter.get(
  "/view-feedback-template",
  jwtVerification,
  async (req: Request, res: Response) => {
    await getFeedbackTemplate(req, res);
  }
);

feedbackTemplateRouter.get(
  "/view-feedback-template-by-id",
  jwtVerification,
  async (req: Request, res: Response) => {
    await getFeedbackTemplateById(req, res);
  }
);

feedbackTemplateRouter.put(
  "/edit-feedback-template",
  jwtVerification,
  async (req: Request, res: Response) => {
    await updateFeedbackTemplate(req, res);
  }
);
feedbackTemplateRouter.get(
  "/view-feedback-template-by-mapping-id",
  jwtVerification,
  async (req: Request, res: Response) => {
    await getFeedbackTemplateByMappingId(req, res);
  }
);
export { feedbackTemplateRouter };
