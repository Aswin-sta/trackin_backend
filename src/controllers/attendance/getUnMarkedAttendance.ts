import { Sequelize, Op } from "sequelize";
import Attendance from "../../models/attendance";
import UserTraining from "../../models/userTraining";
import { Request, Response } from "express";
import User from "../../models/user";
import sequelize from "../../config/sequelize";
import TrainingProgram from "../../models/trainingProgram";

const getUnmarkedAttendance = async (req: Request, res: Response) => {
  try {
    const { id, date } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Training program ID is required" });
    }

    let startDate = null;
    let endDate = null;
    if (date) {
      startDate = date;
    } else {
      // Fetch the start date of the training program
      const trainingProgram = await TrainingProgram.findOne({
        where: { id: id },
      });

      if (trainingProgram) {
        startDate = trainingProgram.startDate;
        endDate = trainingProgram.endDate;
      }
    }

    const unmarkedUserTrainingIds = await UserTraining.findAll({
      where: {
        trainingProgramId: id,
      },
      attributes: [
        "id",
        [sequelize.col("User.first_name"), "firstName"],
        [sequelize.col("User.last_name"), "lastName"],
        [sequelize.col("User.email"), "email"],
        [Sequelize.col("TrainingProgram.title"), "title"],
      ],
      include: [
        {
          model: Attendance,
          required: false, // Perform a left join
          attributes: [],
          where: {
            date: startDate,
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
      // Filter rows where there is no matching attendance record
      having: Sequelize.literal('COUNT("Attendance"."id") = 0'),
      group: [
        "UserTraining.id",
        "Attendance.id",
        "User.id",
        "TrainingProgram.title",
      ],
    });

    res.status(200).json({
      success: true,
      startDate,
      endDate,
      data: unmarkedUserTrainingIds,
    });
  } catch (error) {
    console.error("Error fetching unmarked attendance:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export default getUnmarkedAttendance;
