import { Sequelize, Op } from "sequelize";
import Attendance from "../../models/attendance";
import UserTraining from "../../models/userTraining";
import { Request, Response } from "express";
import User from "../../models/user";
import sequelize from "../../config/sequelize";
import TrainingProgram from "../../models/trainingProgram";

const getMarkedAttendance = async (req: Request, res: Response) => {
  try {
    const { id, date } = req.query;

    if (!id || !date) {
      return res
        .status(400)
        .json({ error: "Training program ID and date are required" });
    }

    const markedUserTrainingIds = await UserTraining.findAll({
      where: {
        trainingProgramId: id,
      },
      attributes: [
        "id",
        [sequelize.col("User.first_name"), "firstName"],
        [sequelize.col("User.last_name"), "lastName"],
        [sequelize.col("User.email"), "email"],
        [Sequelize.col("TrainingProgram.title"), "title"],
        [Sequelize.col("TrainingProgram.start_date"), "startDate"],
        [Sequelize.col("TrainingProgram.end_date"), "endDate"],
        [Sequelize.col("Attendance.is_present"), "isPresent"],
      ],
      include: [
        {
          model: Attendance,
          required: true,
          attributes: [],
          where: {
            date: date,
          },
        },
        {
          model: User,
          required: true,
          attributes: [],
        },
        {
          model: TrainingProgram,
          attributes: [],
          required: true,
        },
      ],
    });

    res.status(200).json({ success: true, data: markedUserTrainingIds });
  } catch (error) {
    console.error("Error fetching marked attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getMarkedAttendance;
