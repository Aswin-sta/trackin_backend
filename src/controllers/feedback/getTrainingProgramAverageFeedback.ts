import { Request, Response } from "express";
import { Sequelize, fn, col } from "sequelize";
import TrainingProgramFeedback from "../../models/trainingProgramFeedback";
import UserTraining from "../../models/userTraining";
import TrainingProgram from "../../models/trainingProgram";
import ProgramTrainer from "../../models/programTrainer";
import Trainer from "../../models/trainer";

const getTrainingProgramAverageFeedback = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const feedback = await TrainingProgramFeedback.findAll({
      attributes: [
        [Sequelize.col("UserTraining.TrainingProgram.title"), "training"],
        [Sequelize.col("UserTraining.TrainingProgram.id"), "training_id"],
        [
          Sequelize.col(
            "UserTraining->TrainingProgram->ProgramTrainers->Trainer.fullname"
          ),
          "trainer",
        ],
        [
          Sequelize.cast(
            Sequelize.fn(
              "AVG",
              Sequelize.col("TrainingProgramFeedback.rating")
            ),
            "DECIMAL(2, 1)"
          ),
          "rating",
        ],
      ],
      include: [
        {
          model: UserTraining,
          required: true,
          attributes: [],
          include: [
            {
              model: TrainingProgram,
              required: true,
              attributes: [],
              include: [
                {
                  model: ProgramTrainer,
                  required: true,
                  attributes: [],
                  include: [
                    {
                      model: Trainer,
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      group: [
        "TrainingProgramFeedback.id",
        "UserTraining.training_program_id",
        "UserTraining.id",
        "UserTraining->TrainingProgram.title",
        "UserTraining->TrainingProgram->ProgramTrainers->Trainer.id",
        "UserTraining.TrainingProgram.id",
      ],
    });

    console.log(feedback);

    return res.status(200).json({
      success: true,
      message: "Feedback templates retrieved successfully",
      data: feedback,
    });
  } catch (error: any) {
    console.error("Error retrieving all feedback:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export { getTrainingProgramAverageFeedback };
