import { Request, Response } from "express";
import { Op } from "sequelize";
import moment from "moment";
import TrainingProgram from "../../models/trainingProgram";

const getCountOfProgramsByDate = async (req: Request, res: Response) => {
  // JWT Verification - L&D can view the no of programs in a month
  const { user_id, user_role } = res.locals.decodedToken;
  console.log(user_role)

  if (user_role !== "L&D" && user_role !== "Manager" && user_role !== "Employee") {
    console.log("Invalid user data")
    return res.status(422).json({ success: "false", error: "Invalid user data" });
  }
  try {
    // Get the first and last day of the current month
    const currentDate = moment();
    const firstDayOfMonth = moment(currentDate).startOf("month");
    const lastDayOfMonth = moment(currentDate).endOf("month");

    // Array to store the result for each day of the month
    const programsPerDate = [];

    // Iterate through each day of the month
    let currentDateIter = moment(firstDayOfMonth);
    while (currentDateIter <= lastDayOfMonth) {
      const date = currentDateIter.format("YYYY-MM-DD"); // Format the date to display only the date

      // Execute the query to count programs that occur on the current date
      const numberOfPrograms = await TrainingProgram.count({
        where: {
          [Op.and]: [
            {
              start_date: { [Op.lte]: currentDateIter.endOf("day").toDate() }, // Program starts before or on the current date
              [Op.or]: [
                {
                  occurance_type: "Once",
                  end_date: {
                    [Op.gte]: currentDateIter.startOf("day").toDate(),
                  }, // Program ends after or on the current date
                },
                {
                  occurance_type: "Daily",
                  end_date: {
                    [Op.gte]: currentDateIter.startOf("day").toDate(),
                  }, // Program ends after or on the current date
                },
                {
                  occurance_type: "Weekly",
                  start_date: {
                    [Op.lte]: currentDateIter.endOf("day").toDate(),
                  }, // Program starts before or on the current date
                  [Op.or]: [
                    {
                      end_date: {
                        [Op.gte]: currentDateIter.startOf("day").toDate(),
                      }, // Program ends after or on the current date
                    },
                    {
                      end_date: {
                        [Op.gt]: currentDateIter.endOf("day").toDate(),
                      }, // Program ends after the current date
                      // Program occurs on the current day of the week
                    },
                  ],
                },
                {
                  occurance_type: "Monthly",
                  start_date: {
                    [Op.lte]: currentDateIter.endOf("day").toDate(),
                  }, // Program starts before or on the current date
                  [Op.or]: [
                    {
                      end_date: {
                        [Op.gte]: currentDateIter.startOf("day").toDate(),
                      }, // Program ends after or on the current date
                    },
                    {
                      end_date: {
                        [Op.gt]: currentDateIter.endOf("day").toDate(),
                      }, // Program ends after the current date
                      // Program occurs on the current day of the month
                    },
                  ],
                },
              ],
            },
          ],
        },
      });

      // Store the result for the current date
      programsPerDate.push({ date, numberOfPrograms });

      // Move to the next day
      currentDateIter.add(1, "day");
    }

    // Return the result as JSON
    res.json(programsPerDate);
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getCountOfProgramsByDate;
