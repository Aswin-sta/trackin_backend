//api for the managers and l&d to approve or reject nomination requests

import { Request, Response } from "express";
import NominationRequest from "../../models/nominationRequest";
import UserTraining from "../../models/userTraining";
import TrainingProgram from "../../models/trainingProgram";

const putNominations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const nominations = req.body as {
      id: number;
      status: string;
      remarks: string;
    }[]; //get nomination id, status and remarks(if rejected) from body
    const { user_id, user_role } = res.locals.decodedToken; //get user id and role from jwt token

    for (const nomination of nominations) {
      //check whether data is received from body or not
      console.log(nomination.id);
      if (!nomination.id || !nomination.status) {
        return res
          .status(422)
          .json({ success: "false", error: "Invalid Request" });
      }

      //approval/rejection for manager
      if (user_role === "Manager") {
        await NominationRequest.update(
          {
            status: nomination.status,
            remarks: nomination.remarks,
            updatedBy: user_id,
          },
          {
            where: {
              id: nomination.id,
              assignerId: user_id,
              status: "Manager Approval Pending",
            },
          }
        );
        return res
          .status(200)
          .json({ success: "true", message: "Manager Updated" });
      }

      //approval/rejection for l&d
      else if (user_role === "L&D") {
        await NominationRequest.update(
          {
            assignerId: user_id,
            status: nomination.status,
            remarks: nomination.remarks,
            updatedBy: user_id,
          },
          { where: { id: nomination.id, status: "Approved by Manager" } }
        );

        const details = await NominationRequest.findOne({
          attributes: ["userId", "trainingProgramId"],
          where: { id: nomination.id },
        });

        //insert details into user training table to enroll employee to training
        if (details) {
          await UserTraining.create({
            userId: details.userId,
            trainingProgramId: details.trainingProgramId,
            completionStatus: "Enrolled",
            isActive: true,
          });

          const seats = await TrainingProgram.findOne({
            attributes: ["availableSeats"],
            where: { id: details.trainingProgramId },
          });

          const availableSeats = seats?.availableSeats;
          const updatedSeats =
            availableSeats !== undefined ? availableSeats - 1 : undefined;

          //update the count of available seats in training program table
          await TrainingProgram.update(
            { availableSeats: updatedSeats },
            { where: { id: details.trainingProgramId } }
          );
        } else {
          // Handle the case where details is null
          console.error("Details not found for nomination ID:", nomination.id);
        }
        return res
          .status(200)
          .json({ success: "true", message: "L&D Updated" });
      } else {
        return res
          .status(403)
          .json({ success: "false", error: "Access Denied" });
      }
    }
    return res.status(200);
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: "false", error: "Internal Server Error" });
  }
};

export default putNominations;
