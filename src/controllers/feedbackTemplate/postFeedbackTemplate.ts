import { Request, Response } from "express";
import { FeedbackTemplate } from "../../models/feedbackTemplate";
import sequelize from "../../config/sequelize";
const addFeedbackTemplate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, template } = req.body;
    const { user_id } = res.locals.decodedToken;

    if (!name || !template) {
      return res.status(422).json({
        success: false,
        error: "Bad request. Missing required fields.",
      });
    }

    const transaction = await sequelize.transaction();

    try {
      const existingTemplate = await FeedbackTemplate.findOne({
        where: { name },
        transaction,
      });

      if (existingTemplate) {
        await transaction.rollback();
        return res.status(409).json({
          success: false,
          error: "Conflict. A template with the same name already exists.",
        });
      }

      const feedbackTemplate = await FeedbackTemplate.create(
        {
          name,
          template,
          createdBy: user_id,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).json({
        success: true,
        message: "Feedback template added successfully",
        template: feedbackTemplate,
      });
    } catch (error) {
      await transaction.rollback();

      console.error("Error adding feedback template:", error);
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  } catch (error: any) {
    console.error("Error adding feedback template:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export { addFeedbackTemplate };
