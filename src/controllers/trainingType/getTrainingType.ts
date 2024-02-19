import { Request, Response } from "express";
import TrainingType from "../../models/trainingType";

const viewTrainingType = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { user_role } = res.locals.decodedToken;

        if (user_role === "L&D") {
            const trainingType = await TrainingType.findAll({ raw: true });
            return res
                .status(200)
                .json({
                    success: true,
                    data: trainingType,
                    message: "Training types fetched successfully",
                });
        } else {
            console.error("Invalid Authorization");
            return res.status(401).json({
                success: false,
                error: "Invalid Authorization",
            });
        }
    } catch (error: any) {
        console.error("Error fetching training type:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

export default viewTrainingType;
