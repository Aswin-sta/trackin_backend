import { Request, Response } from "express";
import TrainingProgram from "../../models/trainingProgram";

const getTrainingHours = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Get total duration of all training programs
    const totalDurationResult = await TrainingProgram.sum('duration');

    // Get total duration of completed training programs
    const completedDurationResult = await TrainingProgram.sum('duration', {
      where: {
        status: 'Completed'
      }
    });

    // Parse the results to handle possible null values
    const totalDuration = totalDurationResult || 0;
    const completedDuration = completedDurationResult || 0;

    return res.status(200).json({
      success: true,
      data: {
        total: totalDuration,
        completed: completedDuration
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export default getTrainingHours;
