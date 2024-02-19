import { Op } from 'sequelize';
import TrainingProgram from '../../models/trainingProgram';
import { Request, Response } from 'express';

const getCountOfPrograms = async (req: Request, res: Response) => {

  //JWT verification - Only L&D view the count
  const { id, role } = res.locals.decodedToken;

  if (role !== "L&D") {
    return res.status(422).json({ success: "false", error: "Invalid user data" });
  }

  //Querying using groupby to get the count of programs
  try {
    const counts = await TrainingProgram.count({
      group: ['status'],
      where: {
        status: {
          [Op.in]: ['Ongoing', 'Upcoming', 'Completed', 'Postponed'],
        }
      },

    });

    return res.json({ success: "true", counts });
  } catch (error) {
    console.error('Error fetching status counts:', error);
    return res.status(500).json({ success: "false", error: 'Internal Server Error' });
  }
};

export default getCountOfPrograms;
