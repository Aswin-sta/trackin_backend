import { Request, Response } from "express";
import TrainingProgram from "../../models/trainingProgram";
import sequelize from "../../config/sequelize";
import ProgramTrainer from "../../models/programTrainer";

const editTrainingProgram = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { trainingProgramId } = req.query;
    const { user_id, user_role } = res.locals.decodedToken;
    const updateTrainingProgram = req.body;
    updateTrainingProgram.createdBy = user_id;

    const transaction = await sequelize.transaction();
    try {
        if (user_role === "L&D") {
            if (!updateTrainingProgram) {
                console.error("Missing required fields");
                return res
                    .status(422)
                    .json({
                        success: false,
                        error: "Invalid request. Missing required fields.",
                    });
            }
            //updates training program data other than target audience and trainer in TrainingProgram table 
            const editedTrainingProgram = await TrainingProgram.update(
                { ...updateTrainingProgram },
                { where: { id: trainingProgramId }, transaction: transaction }
            );

            await ProgramTrainer.destroy({
                where: { trainingProgramId: trainingProgramId },
                transaction: transaction,
            });

            if (
                updateTrainingProgram.trainerId &&
                updateTrainingProgram.trainerId.length > 0
            ) {
                const trainerData = updateTrainingProgram.trainerId.map(
                    (trainerId: number) => ({
                        trainingProgramId: trainingProgramId,
                        trainerId: trainerId,
                    })
                );
                await ProgramTrainer.bulkCreate(trainerData, {
                    transaction: transaction,
                });
            }

            await transaction.commit();
            return res
                .status(200)
                .json({ success: true, message: "Training program updated successfully" });
        } else {
            console.error("Invalid Authorization");
            return res.status(401).json({
                success: false,
                error: "Invalid Authorization",
            })
        }
    } catch (error: any) {
        await transaction.rollback();
        console.log("Error updating training program:", error)
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

export default editTrainingProgram;
