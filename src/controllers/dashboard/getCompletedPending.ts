import { Request, Response } from "express";
import TrainingProgram from "../../models/trainingProgram";
import { Op } from "sequelize";

const getCompletedPending = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Get count of completed training programs
    const completedCount = await TrainingProgram.count({
      where: {
        status: 'Completed'
      }
    });

    // Get count of ongoing training programs
    const ongoingCount = await TrainingProgram.count({
      where: {
        status: ['Ongoing', 'Upcoming']
      }
    });

    // Get count of cancelled training programs
    const cancelledCount = await TrainingProgram.count({
      where: {
        status: 'Cancelled'
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        completed: completedCount,
        pending: ongoingCount,
        cancelled: cancelledCount
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export default getCompletedPending;
