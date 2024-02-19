import { Request, Response } from "express";
import UserTraining from "../../models/userTraining";
import User from "../../models/user";
import Attendance from "../../models/attendance";
import TrainingProgram from "../../models/trainingProgram";

const getAttendance = async (req: Request, res: Response) => {
  try {
    // Extract the trainingProgramId parameter from the query string
    const trainingProgramId = req.query.trainingProgramId as string;

    // Validate the presence of the trainingProgramId parameter
    if (trainingProgramId === undefined) {
      return res
        .status(400)
        .json({ error: "Bad request: Missing trainingProgramId parameter" });
    }

    // Find all userTraining records for the given training program ID
    const userTrainingRecords = await UserTraining.findAll({
      where: { trainingProgramId },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "jobTitle",
            "department",
          ],
        },
        {
          model: TrainingProgram,
          //attributes:['trainingName']
        },
        {
          model: Attendance,
          attributes: ["id", "isPresent", "date", "hoursAttended"],
        },
      ],
    });

    // Check if any userTraining records were found
    if (!userTrainingRecords || userTrainingRecords.length === 0) {
      return res
        .status(404)
        .json({
          error:
            "No attendance records found for the given training program ID",
        });
    }

    // Send the userTraining records as a response
    res.status(200).json({
      success: true,
      message: "Attendance retrieved successfully",
      data: userTrainingRecords,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAttendance;
