import express, { Request, Response, Router } from "express";
import addTrainingProgram from "../controllers/trainingProgram/postTrainingProgram";
import jwtVerification from "../middleware/jwtVerification";
import viewTrainingProgram from "../controllers/trainingProgram/getTrainingProgram";
import editTrainingProgram from "../controllers/trainingProgram/putTrainingProgram";

import getCountOfProgramsByDate from "../controllers/trainingProgram/getCountOfProgramsByDate";
import getCountOfPrograms from "../controllers/trainingProgram/getCountOfPrograms";
import getCountOfTrainings from "../controllers/trainingProgram/getCountofTrainings";


const trainingProgram: Router = express.Router();

trainingProgram.post(
    "/add-training-program",
    jwtVerification,
    (req: Request, res: Response) => {
        addTrainingProgram(req, res);
    }
);

trainingProgram.get(
    "/view-training-program",
    jwtVerification,
    async (req: Request, res: Response) => {
        viewTrainingProgram(req, res);
    }
);

trainingProgram.put(
    "/edit-training-program",
    jwtVerification,
    async (req: Request, res: Response) => {
        editTrainingProgram(req, res);
    }
);

trainingProgram.get('/get-count', jwtVerification, async (req: Request, res: Response) => {
    getCountOfPrograms(req, res);
});

trainingProgram.get('/programs-this-month', jwtVerification, async (req: Request, res: Response) => {
    getCountOfProgramsByDate(req, res);
});

trainingProgram.get('/get-training-count', jwtVerification, async (req: Request, res: Response) => {
    getCountOfTrainings(req, res);
});

export default trainingProgram;
