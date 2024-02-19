import express, { Request, Response, Router } from "express";
import addTrainingType from "../controllers/trainingType/postTrainingType";
import jwtVerification from "../middleware/jwtVerification";
import viewTrainingType from "../controllers/trainingType/getTrainingType";
import editTrainingType from "../controllers/trainingType/putTrainingType";

const trainingType: Router = express.Router();

trainingType.post(
    "/add-training-type",
    jwtVerification,
    async (req: Request, res: Response) => {
        addTrainingType(req, res);
    }
);

trainingType.get(
    "/view-training-type",
    jwtVerification,
    async (req: Request, res: Response) => {
        viewTrainingType(req, res);
    }
);

trainingType.patch(
    "/edit-training-type",
    jwtVerification,
    async (req: Request, res: Response) => {
        editTrainingType(req, res);
    }
);

export default trainingType;
