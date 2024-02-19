import { Request, Response } from "express";
import TrainingType from "../../models/trainingType";

const addTrainingType = async (req: Request, res: Response): Promise<Response> => {
    try {
        const programType = req.body;
        const { user_id, user_role } = res.locals.decodedToken;
        programType.createdBy = user_id;

        if (user_role === "L&D") {
            if (!programType) {
                console.error("Missing required fields");
                return res.status(422).json({
                    success: false,
                    error: "Invalid request. Missing required fields.",
                });
            }

            //checks whether the program type already exists
            const isExisting = await TrainingType.findOne({
                where: { trainingType: programType.trainingType },
                raw: true,
            });

            if (isExisting) {
                console.log("Training type already exists");
                return res
                    .status(409)
                    .json({ success: false, message: "Training Type already exists" });
            } else {
                //adds new program type in the trainingType table
                const addedTrainingType = await TrainingType.create(
                    { ...programType },
                    { raw: true }
                );
                return res
                    .status(200)
                    .json({ success: true, message: "Training Type added successfully" });
            }
        } else {
            console.error("Invalid Authorization");
            return res.status(401).json({
                success: false,
                error: "Invalid Authorization",
            })
        }
    } catch (error: any) {
        console.log("Error adding training type :", error)
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

export default addTrainingType;
