//api to send a nomination request for a training program

import { Request, Response } from "express";
import NominationRequest from "../../models/nominationRequest";

const postNominationRequests = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const nominations =
      (req.body as { trainingProgramId: number }[]) || []; //get id of program from body
    const { user_id, manager_id } = res.locals.decodedToken; //get user id of the requester from jwt token

    for (const nomination of nominations) {
      if (!nomination.trainingProgramId) {
        return res.status(422).json({ error: "Bad Request" });
      }

      //check whether nomination already exists or not
      const existingNomination = await NominationRequest.findOne({
        where: {
          userId: user_id,
          trainingProgramId: nomination.trainingProgramId,
        },
      });

      //inform user nomination already exists
      if (existingNomination) {
        return res
          .status(422)
          .json({ success: "false", message: "Nomination already exists" });
      }

      //insert data into nomination request table
      await NominationRequest.create({
        userId: user_id,
        trainingProgramId: nomination.trainingProgramId,
        assignerId: manager_id,
        status: "Manager Approval Pending",
        createdBy: user_id,
        isActive: true,
      });
    }

    return res
      .status(200)
      .json({ success: "true", message: "Nomination added successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: "false", error: error });
  }
};

export default postNominationRequests;
