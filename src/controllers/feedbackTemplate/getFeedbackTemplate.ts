import { Request, Response } from "express";
import { FeedbackTemplate } from "../../models/feedbackTemplate";

// Function to get all feedback templates
const getFeedbackTemplate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Retrieve all feedback templates
    const feedbackTemplates = await FeedbackTemplate.findAll({});

    // Return an error response if no feedback templates are found
    if (!feedbackTemplates || feedbackTemplates.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No feedback templates found.",
      });
    }

    // Return the array of feedback templates in the response
    const responseTemplate = {
      success: true,
      data: feedbackTemplates.map((template) => ({
        id: template.id,
        name: template.name,
        template: template.template,
      })),
      message: "Feedback templates retrieved successfully",
    };

    return res.status(200).json(responseTemplate);
  } catch (error: any) {
    console.error("Error retrieving all feedback templates:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export { getFeedbackTemplate };
