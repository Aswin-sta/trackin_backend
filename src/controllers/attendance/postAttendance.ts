import { Request, Response } from "express";
import Attendance from "../../models/attendance";
import { EmailContent, sendEmail } from "../../utils/nodemailer";
import { Op } from "sequelize";

const postAttendance = async (req: Request, res: Response) => {
  try {
    const attendanceArray = req.body.data;
    const { user_id, user_role } = res.locals.decodedToken;
    const extractedDataArray: { userTrainingId: number; user_email: string }[] =
      [];

    const programName = attendanceArray[0].training_title;
    const endDate = attendanceArray[0].end_date;
    const date = attendanceArray[0].date;
    const updatedAttendanceArray = attendanceArray.map(
      (attendanceArrayItem: any) => {
        const { userTrainingId, user_email, isPresent } = attendanceArrayItem;

        if (isPresent) {
          const modifiedEmail = user_email
            .replace("@sreegcloudgmail.onmicrosoft.com", "@experionglobal.com")
            .replace(/_/g, ".");

          extractedDataArray.push({
            userTrainingId,
            user_email: modifiedEmail,
          });
        }

        const { training_title, ...itemWithoutEmailandtitle } =
          attendanceArrayItem;

        return { ...itemWithoutEmailandtitle, createdBy: user_id };
      }
    );

    if (user_role === "L&D") {
      if (
        !Array.isArray(updatedAttendanceArray) ||
        updatedAttendanceArray.length === 0
      ) {
        return res.status(400).json({
          error: "Bad request: Attendance array is empty or not provided",
        });
      }

      for (const attendanceRecord of updatedAttendanceArray) {
        const { userTrainingId, isPresent, date } = attendanceRecord;

        if (!userTrainingId)
          console.error("Missing userTrainingId:", userTrainingId);
        if (!isPresent) console.error("Missing isPresent:", isPresent);
        if (!date) console.error("Missing date:", date);
      }

      const userTrainingIds = attendanceArray.map(
        (record: { userTrainingId: any }) => record.userTrainingId
      );

      const existingAttendances = await Attendance.findAll({
        where: {
          userTrainingId: { [Op.in]: userTrainingIds },
          date: attendanceArray[0].date,
        },
      });

      if (existingAttendances.length > 0)
        return res.status(409).json({ message: "Attendance already marked." });
      else {
        const newAttendanceArray = await Attendance.bulkCreate(
          updatedAttendanceArray
        );

        if (endDate === date) {
          const emailContent: EmailContent = {
            subject: "Feedback Form Link 📝",
            programName: programName,
            header: "Thank you for attending our training program!",
            body: `Dear Participant,
          Thank you for attending our training program titled "${programName}".
          We hope you found the sessions informative and engaging. Your participation contributes significantly to the success of our program.
          Your feedback is valuable to us and helps us improve our future programs. We kindly request you to take a few moments to fill out the feedback form for the "${programName}" training program.
          Your insights will assist us in enhancing our training content and delivery methods to better meet your needs and expectations.
          Please find feedback link below.
          Thank you for your cooperation and dedication to professional development.`,
            footer: "Best regards",
          };

          const sendFeedbackLink = true;

          sendEmail({
            userProgramInfo: extractedDataArray,
            emailContent,
            sendFeedbackLink,
          });
        }
        res.status(201).json({
          success: true,
          message: "Training attendance records created successfully",
          data: newAttendanceArray,
        });
      }
    } else {
      console.error("Invalid Authorization");
      return res.status(401).json({
        success: false,
        error: "Invalid Authorization",
      });
    }
  } catch (error) {
    console.log("Error adding attendance:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export default postAttendance;
