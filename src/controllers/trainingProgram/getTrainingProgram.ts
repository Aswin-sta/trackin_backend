import { Request, Response } from "express";
import TrainingProgram from "../../models/trainingProgram";
import ProgramAudience from "../../models/programAudience";
import TargetAudience from "../../models/targetAudience";
import TrainingType from "../../models/trainingType";
import { Sequelize } from "sequelize";
import ProgramTrainer from "../../models/programTrainer";
import Trainer from "../../models/trainer";

const viewTrainingProgram = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user_role } = res.locals.decodedToken;
    if (!user_role) {
      console.error("Invalid Authorization");
      return res.status(401).json({
        success: false,
        error: "Invalid Authorization",
      });
    }

    let statusFilter: string[] = [];

    if (user_role === "L&D") {
      statusFilter = ["Upcoming", "Postponed", "Completed"];
    } else if (user_role === "Manager" || user_role === "Employee") {
      statusFilter = ["Upcoming", "Postponed"];
    }

    let query = {};
    const selectedTypes = req.query.types;
    if (selectedTypes) {
      query = { id: selectedTypes };
    }
    const trainingPrograms = await TrainingProgram.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "trainingMode",
        "startDate",
        "endDate",
        "duration",
        "durationPerSession",
        "availableSeats",
        "occuranceType",
        "occuranceInterval",
        "status",
        [Sequelize.col("TrainingType.training_type"), "trainingType"],
      ],
      where: { status: statusFilter, isActive: true },
      order: [
        ["startDate", "ASC"],
        ["status", "ASC"],
      ], //join to get training type from TrainingType table, audience from TargetAudience table and trainer from ProgramTrainer table
      include: [
        {
          model: TrainingType,
          attributes: [],
          where: query,
          required: true,
        },
        {
          model: ProgramAudience,
          attributes: ["audienceId"],
          include: [
            {
              model: TargetAudience,
              attributes: ["name"],
            },
          ],
        },
        {
          model: ProgramTrainer,
          attributes: ["trainerId"],
          include: [
            {
              model: Trainer,
              attributes: ["trainerType", "fullname"],
            },
          ],
        },
      ],
    });
    return res.status(200).json({
      success: true,
      data: trainingPrograms,
      message: "Training program data fetched successfully",
    });
  } catch (error: any) {
    console.error("Error fetching training program:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export default viewTrainingProgram;
