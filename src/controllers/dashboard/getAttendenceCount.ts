import { Request, Response } from 'express'; // Assuming Request and Response are from express
import Attendance from '../../models/attendance';
import UserTraining from '../../models/userTraining';
import TrainingProgram from '../../models/trainingProgram';
import sequelize from '../../config/sequelize';

// Define the query
const getAttendenceCount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const recentAttendanceQuery = await Attendance.findAll({
      attributes: [
        [sequelize.fn('date', sequelize.col('date')), 'attendance_date'], // Extract the date part
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN is_Present = true THEN 1 END')), 'present_count'], // Count users present
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN is_Present = false THEN 1 END')), 'absent_count'], // Count users absent
      ],
      include: [
        {
          model: UserTraining,
          attributes: [],
          include: [
            {
              model: TrainingProgram,
              attributes: ['title'],
            },
          ],
        },
      ],
      group: [sequelize.fn('date', sequelize.col('date')), 'UserTraining.TrainingProgram.id'], // Group by date and TrainingProgram
      order: [[sequelize.literal('attendance_date'), 'DESC']], // Order by attendance date in descending order
      limit: 5, // Limit the result to 5 records
      raw: true,
    });

    return res.status(200).json({
      success: true,
      data: recentAttendanceQuery,
    });
  } catch (error: any) {
    console.error('Error fetching attendance count:', error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export default getAttendenceCount;
