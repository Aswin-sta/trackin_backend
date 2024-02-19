import { Request, Response } from "express";
import TrainingProgram from "../../models/trainingProgram";
import ProgramAudience from "../../models/programAudience";
import ProgramTrainer from "../../models/programTrainer";
import sequelize from "../../config/sequelize";
import TargetAudience from "../../models/targetAudience";
import Trainer from "../../models/trainer";

const addTrainingProgram = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const trainingProgram = req.body;
    const { user_id, user_role } = res.locals.decodedToken;
    trainingProgram.createdBy = user_id;

    const transaction = await sequelize.transaction();
    try {
        if (!trainingProgram) {
            console.error("Missing required fields");
            return res
                .status(422)
                .json({
                    success: false,
                    error: "Invalid request. Missing required fields.",
                });
        }

        if (user_role === "L&D") {
            //checks whether the program already exists
            const isExisting = await TrainingProgram.findOne({
                where: {
                    title: trainingProgram.title,
                    startDate: trainingProgram.startDate,
                    duration: trainingProgram.duration,
                    status: "Upcoming",
                },
                raw: true,
            });

            if (isExisting) {
                console.log("Program already exists")
                return res.status(409).json({ success: false, message: "Program already exists" });
            } else {
                const addedTrainingProgram = await TrainingProgram.create(
                    trainingProgram,
                    { transaction: transaction }
                );

                //from the received target audience array from body each audienceId is mapped into audienceData variable
                const audienceData = trainingProgram.audienceId.map(
                    (id: TargetAudience) => ({
                        trainingProgramId: addedTrainingProgram.id,
                        audienceId: id,
                    })
                );
                //adds target audience for a particular program in programAudience table 
                await ProgramAudience.bulkCreate(audienceData, {
                    transaction: transaction,
                });

                //from the received trainer array from body each trainerId is mapped into trainerData variable
                const trainerData = trainingProgram.trainerId.map((id: Trainer) => ({
                    trainingProgramId: addedTrainingProgram.id,
                    trainerId: id,
                }));
                //adds trainer for a particular program in programTrainer table 
                await ProgramTrainer.bulkCreate(trainerData, {
                    transaction: transaction,
                });

                await transaction.commit();
                return res
                    .status(200)
                    .json({ success: true, message: "Training program added successfully." });
            }
        } else {
            console.error("Invalid Authorization");
            return res.status(401).json({
                success: false,
                error: "Invalid Authorization",
            })
        }
    } catch (error: any) {
        await transaction.rollback(); //roll back tranasaction if any db operation fails
        console.log("Error adding training program:", error)
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

export default addTrainingProgram;
