import { Request, Response } from "express";
import TrainingType from "../../models/trainingType";

const editTrainingType = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { user_id, user_role } = res.locals.decodedToken;
        const programType = req.body;
        programType.createdBy = user_id;

        if (user_role === "L&D") {
            if (!programType.id || !programType.trainingType) {
                console.error("Missing required fields");
                return res
                    .status(422)
                    .json({
                        success: false,
                        error: "Invalid request. Missing required fields.",
                    });
            }

            const isExists = await TrainingType.findOne({
                attributes: ["trainingType"],
                where: { id: programType.id },
            });

            //checks whether the program type already exists
            if (programType.trainingType === isExists?.trainingType) {
                return res
                    .status(304)
                    .json({ success: false, message: "No changes made. Data is already up to date." });
            } else {
                //updates training type
                const editedTrainingType = await TrainingType.update(
                    { ...programType },
                    { where: { id: programType.id } }
                );
                return res
                    .status(200)
                    .json({ success: true, message: "Training type updated successfully" });
            }
        } else {
            console.error("Invalid Authorization");
            return res.status(401).json({
                success: false,
                error: "Invalid Authorization",
            })
        }
    } catch (error: any) {
        console.log("Error updating training type:", error)
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

export default editTrainingType;
