import { Request, Response } from "express";
import TrainingProgram from "../../models/trainingProgram";
import ProgramTrainer from "../../models/programTrainer";
import Trainer from "../../models/trainer";

const getOngoingTrainingPrograms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Retrieve the 4 upcoming training programs with nearest start date
    const upcomingPrograms = await TrainingProgram.findAll({
      where: {
        status: 'Ongoing'
      },
      include: [
        {
          model: ProgramTrainer,
          include: [
            {
              model: Trainer,
              attributes: ['fullname'] // Include only the trainer name
            }
          ]
        }
      ],
      order: [['startDate', 'ASC']], // Sort by start date in ascending order
      limit: 4 // Limit the results to 4
    });

    // Extract necessary information and format the response
    const formattedUpcomingPrograms = upcomingPrograms.map(program => ({
      trainingProgramName: program.title,
      trainerNames: program.ProgramTrainers.map((programTrainer: { Trainer: { fullname: any; }; }) => programTrainer.Trainer.fullname),
      startDate: program.startDate
    }));

    return res.status(200).json({
      success: true,
      data: formattedUpcomingPrograms
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export default getOngoingTrainingPrograms;
