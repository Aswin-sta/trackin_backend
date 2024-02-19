import express from "express";
import { Request, Response } from "express";
import postNominationRequests from "../controllers/nominationRequests/postSelfNominationRequest";
import jwtVerification from "../middleware/jwtVerification";
import deleteNominationRequests from "../controllers/nominationRequests/deleteNominationRequests";
import putNominationRequests from "../controllers/nominationRequests/putNominationRequests";
import getNominationCount from "../controllers/nominationRequests/getNominationCount";
import getNominationRequests from "../controllers/nominationRequests/getNominationRequests";

const nominationRouter = express.Router();

nominationRouter.get(
  "/view-nomination",
  jwtVerification,
  async (req: Request, res: Response) => {
    getNominationRequests(req, res);
  }
);

nominationRouter.post(
  "/post-nomination-requests",
  jwtVerification,
  async (req: Request, res: Response) => {
    postNominationRequests(req, res);
  }
);

nominationRouter.put(
  "/delete-nomination-requests",
  jwtVerification,
  async (req: Request, res: Response) => {
    deleteNominationRequests(req, res);
  }
);

nominationRouter.put(
  "/put-nomination-requests",
  jwtVerification,
  async (req: Request, res: Response) => {
    putNominationRequests(req, res);
  }
);

nominationRouter.get(
  "/get-nomination-count",
  jwtVerification,
  async (req: Request, res: Response) => {
    getNominationCount(req, res);
  }
);

export default nominationRouter;
