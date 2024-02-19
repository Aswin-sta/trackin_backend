// //api to send a nomination request for a training program

// import { Request, Response } from "express";
// import NominationRequest from "../../models/nominationRequest";
// import { UUID } from "crypto";

// const postNominationRequests = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const nominations =
//       (req.body as { traineeId: UUID; trainingProgramId: number }[]) || []; //get id of the trainee and program from body
//     const { user_id, manager_id } = res.locals.decodedToken; //get user id of the requester from jwt token

//     //Manager Nomination
//     let assignerId = user_id;
//     let status = "Approved by Manager"

//     for (const nomination of nominations) {
//       if (!nomination.traineeId || !nomination.trainingProgramId) {
//         return res.status(422).json({ error: "Bad Request" });
//       }

//       //check whether nomination already exists or not
//       const existingNomination = await NominationRequest.findOne({
//         where: {
//           userId: nomination.traineeId,
//           trainingProgramId: nomination.trainingProgramId,
//         },
//       });

//       //inform user nomination already exists
//       if (existingNomination) {
//         return res
//           .status(422)
//           .json({ success: "false", message: "Nomination already exists" });
//       }

//       // self-nomination
//       if (user_id === nomination.traineeId) {
//         assignerId = manager_id
//         status = "Manager Approval Pending"
//       }

//       //insert data into nomination request table
//       await NominationRequest.create({
//         userId: nomination.traineeId,
//         trainingProgramId: nomination.trainingProgramId,
//         assignerId: assignerId,
//         status: status,
//         createdBy: user_id,
//         isActive: true,
//       });
//     }

//     return res
//       .status(200)
//       .json({ success: "true", message: "Nomination added successfully" });
//   } catch (error: any) {
//     return res
//       .status(500)
//       .json({ success: "false", error: "Internal Server Error" });
//   }
// };

// export default postNominationRequests;
