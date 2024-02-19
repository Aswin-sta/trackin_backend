import { Request, Response } from "express";

import UserTraining from "../../models/userTraining";
import TrainingProgramFeedback from "../../models/trainingProgramFeedback";
import sequelize from "../../config/sequelize";
import TrainingProgram from "../../models/trainingProgram";

const postTrainingProgramFeedback = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const transaction = await sequelize.transaction();
  try {
    const { userTrainingId, rating, feedback } = req.body;
    const { user_id, user_role } = res.locals.decodedToken;

    if (!user_id || !user_role || !userTrainingId || !rating || !feedback) {
      return res.status(400).json({
        success: false,
        error: "Bad request. Missing required fields.",
      });
    }

    const validRatings = ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
    if (!validRatings.includes(String(rating))) {
      return res
        .status(400)
        .json({ success: false, error: "Bad request. Invalid rating value." });
    }

    const existingFeedback = await TrainingProgramFeedback.findOne({
      where: {
        userTrainingId,
      },
      transaction,
    });

    if (existingFeedback) {
      return res.status(409).json({
        success: false,
        error:
          "Conflict: Feedback already submitted for this user and training program.",
      });
    }

    const trainingDetails = await TrainingProgram.findOne({
      include: [
        {
          model: UserTraining,
          required: true,
          where: { id: userTrainingId },
        },
      ],
      attributes: ["endDate"],
    });
    if (!trainingDetails || trainingDetails.endDate > new Date()) {
      return res.status(400).json({
        success: false,
        message: "adding feedback failed , invalid request",
      });
    }

    const feedbackData = await TrainingProgramFeedback.create({
      userTrainingId,
      rating,
      feedback,
      transaction,
    });

    await UserTraining.update(
      { completionStatus: "Completed" },
      { where: { id: userTrainingId }, transaction }
    );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Training program feedback added successfully",
    });
  } catch (error) {
    console.error("Error adding training program feedback:", error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export { postTrainingProgramFeedback };
