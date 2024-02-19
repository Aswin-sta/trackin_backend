import { Request, Response } from "express";
import { FeedbackTemplate } from "../../models/feedbackTemplate";

// Function to get a feedback template by ID
const getFeedbackTemplateById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Extracting the ID parameter from the request
    const { id } = req.query;

    // Find a specific feedback template by ID
    const feedbackTemplate = await FeedbackTemplate.findOne({
      where: { id },
    });

    // Return an error response if the feedback template is not found
    if (!feedbackTemplate) {
      return res.status(404).json({
        success: false,
        error: "Feedback template not found for the specified ID.",
      });
    }

    // If the feedback template is found, return it in the response
    const responseTemplate = {
      success: true,
      data: {
        id: feedbackTemplate.id,
        name: feedbackTemplate.name,
        template: feedbackTemplate.template,
      },
      message: "Feedback template retrieved successfully",
    };

    return res.status(200).json(responseTemplate);
  } catch (error: any) {
    console.error("Error retrieving feedback template by ID:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export { getFeedbackTemplateById };
