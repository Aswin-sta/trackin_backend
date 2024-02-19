import { Request, Response } from "express";
import { Sequelize, fn, col } from "sequelize";
import TrainingProgramFeedback from "../../models/trainingProgramFeedback";
import UserTraining from "../../models/userTraining";

import User from "../../models/user";

const getTrainingProgramFeedbackById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.query; // You missed a semicolon here

    const feedback = await TrainingProgramFeedback.findOne({
      attributes: [
        "id",
        "userTrainingId",
        "rating",
        "feedback",
        [Sequelize.col("UserTraining.User.first_name"), "user_name"],
        [Sequelize.col("UserTraining.User.department"), "department"],
      ],
      where: { id },
      include: [
        {
          model: UserTraining,
          required: true,
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

export { getTrainingProgramFeedbackById };
