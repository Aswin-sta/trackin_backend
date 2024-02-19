import { Request, Response } from "express";
import User from "../../models/user";
import UserTraining from "../../models/userTraining";
import { Sequelize } from "sequelize";
import TrainingProgram from "../../models/trainingProgram";
import Attendance from "../../models/attendance";
const getParticipants = async (req: Request, res: Response) => {
  try {
    const trainingProgramId = req.query.trainingProgramId;

    if (!trainingProgramId) {
      return res.status(400).json({ error: "Training program ID is required" });
    }

    const usersEnrolled = await UserTraining.findAll({
      where: { trainingProgramId },
      attributes: [
        "id",
        [Sequelize.col("User.first_name"), "firstName"],
        [Sequelize.col("User.last_name"), "lastName"],
        [Sequelize.col("User.department"), "department"],
        [Sequelize.col("User.id"), "userId"],
        [Sequelize.col("User.email"), "email"],
        [Sequelize.col("TrainingProgram.title"), "title"],
        [Sequelize.col("TrainingProgram.start_date"), "startDate"],
      ],
      include: [
        {
          model: User,
          attributes: [],
          required: true,
        },
        {
          model: TrainingProgram,
          attributes: [],
          required: true,
        },
      ],
    });

    console.log(usersEnrolled);

    res.status(200).json({ success: true, data: usersEnrolled });
  } catch (error) {
    console.error("Error fetching users enrolled in training program:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getParticipants;
