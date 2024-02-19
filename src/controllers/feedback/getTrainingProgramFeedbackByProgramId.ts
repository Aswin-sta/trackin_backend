import { Request, Response } from "express";
import { Sequelize, fn, col } from "sequelize";
import TrainingProgramFeedback from "../../models/trainingProgramFeedback";
import UserTraining from "../../models/userTraining";
import TrainingProgram from "../../models/trainingProgram";
import ProgramTrainer from "../../models/programTrainer";
import Trainer from "../../models/trainer";
import User from "../../models/user";

const getTrainingProgramFeedbackByProgramId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.query;

    const feedback = await TrainingProgramFeedback.findAll({
      attributes: [
        "id",
        "userTrainingId",
        "rating",
        "created_at",
        [Sequelize.col("UserTraining.User.first_name"), "name"],
        [Sequelize.col("UserTraining.User.department"), "department"],
      ],
      include: [
        {
          model: UserTraining,
          required: true,
          where: { trainingProgramId: id },
          attributes: [],
          include: [
            {
              model: User,
              required: true,
              attributes: [],
            },
          ],
        },
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

export { getTrainingProgramFeedbackByProgramId };
