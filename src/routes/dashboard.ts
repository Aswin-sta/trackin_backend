import express from "express";
import { Request, Response } from "express";
import getParticipantsCount from "../controllers/dashboard/getParticipantsCount";
import getCompletedPending from "../controllers/dashboard/getCompletedPending";
import getAttendenceCount from "../controllers/dashboard/getAttendenceCount";
import getTrainingHours from "../controllers/dashboard/getTrainingHours";
import getUpcomingTrainingPrograms from "../controllers/dashboard/getUpcomingPrograms";
import getOngoingTrainingPrograms from "../controllers/dashboard/getOngoingPrograms";

const dashboardRouter = express.Router();

dashboardRouter.get(
  "/participants-count",
  async (req: Request, res: Response) => {
    getParticipantsCount(req, res);
  }
);

dashboardRouter.get(
  "/attendence-count",
  async (req: Request, res: Response) => {
    getAttendenceCount(req, res);
  }
);

dashboardRouter.get(
  "/completed-pending",
  async (req: Request, res: Response) => {
    getCompletedPending(req, res);
  }
);

dashboardRouter.get(
  "/ongoing-programs",
  async (req: Request, res: Response) => {
    getOngoingTrainingPrograms(req, res);
  }
);

dashboardRouter.get(
  "/upcoming-programs",
  async (req: Request, res: Response) => {
    getUpcomingTrainingPrograms(req, res);
  }
);

dashboardRouter.get(
  "/training-hours",
  async (req: Request, res: Response) => {
    getTrainingHours(req, res);
  }
);

export default dashboardRouter;
