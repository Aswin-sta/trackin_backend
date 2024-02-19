import { Request, Response } from "express";
import UserTraining from "../../models/userTraining";
import { Op, Sequelize } from "sequelize"; // Import Op for Sequelize operators
import TrainingProgram from "../../models/trainingProgram";
import { FeedbackTemplate } from "../../models/feedbackTemplate";
import sequelize from "../../config/sequelize";

const getFeedbackTemplateByMappingId = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { user_id, user_role } = res.locals.decodedToken;
  try {
    const feedbacktemplate = await UserTraining.findOne({
      where: {
        id: id,
        userId: user_id,
        completionStatus: {
          [Op.notIn]: ["Completed", "Dropout"],
        },
      },
      attributes: [
        [Sequelize.col("TrainingProgram.FeedbackTemplate.id"), "id"],
        [Sequelize.col("TrainingProgram.title"), "program_name"],
        [
          Sequelize.col("TrainingProgram.FeedbackTemplate.template"),
          "template",
        ],
      ],
      include: [
        {
          model: TrainingProgram,
          attributes: [],
          include: [
            {
              model: FeedbackTemplate,
              attributes: [],
            },
          ],
        },
      ],
    });

    if (!feedbacktemplate) {
      return res.status(404).json({
        success: false,
        error: "Feedback template not found",
      });
    }
    const responseTemplate = {
      success: true,
      data: feedbacktemplate,
      message: "Feedback template retrieved successfully",
    };

    return res.status(200).json(responseTemplate);
  } catch (error) {
    console.error("Error retrieving feedback template by ID:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export { getFeedbackTemplateByMappingId };
