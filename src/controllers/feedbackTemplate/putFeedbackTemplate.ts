import { Request, Response } from "express";
import { FeedbackTemplate } from "../../models/feedbackTemplate";
// function to update a feedback template
const updateFeedbackTemplate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Extracting name and template from the request body
    const { name, template } = req.body;
    // Extracting user ID from the decoded token in the request
    const { id } = res.locals.decodedToken;
    // Find the existing template by name
    const existingTemplate = await FeedbackTemplate.findOne({
      where: {
        name,
      },
    });
    // If the template does not exist, return a not found error
    if (!existingTemplate) {
      return res.status(404).json({
        success: false,
        error: "Feedback template not found for the specified templateName.",
      });
    }
    // Update the existing template with the new template
    await existingTemplate.update({
      template,
      createdBy: id,
    });
    // Return success message if the template is updated successfully
    const responseTemplate = {
      success: true,
      message: "Feedback template added successfully",
    };

    return res.status(200).json(responseTemplate);
  } catch (error: any) {
    console.error("Error updating feedback template:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export { updateFeedbackTemplate };
