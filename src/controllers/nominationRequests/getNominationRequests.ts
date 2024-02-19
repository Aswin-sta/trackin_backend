import { Request, Response } from "express";
import UserManager from "../../models/userManager";
import NominationRequest from "../../models/nominationRequest";
import User from "../../models/user";
import { Sequelize, Op } from "sequelize";
import TrainingProgram from "../../models/trainingProgram";

const getNominationRequests = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user_id, user_role } = res.locals.decodedToken;
    let nominations;

    const status = req.query.status;
    const me = req.query.me === "true";
    console.log(me);
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = (page - 1) * limit;
    const query: any = {};

    if (user_role === "Employee") {
      query.userId = user_id;
    } else if (user_role === "Manager") {
      me ? (query.userId = user_id) : (query.assignerId = user_id);
      if (status === "Pending") {
        query.status = "Manager Approval Pending";
      } else if (status === "Rejected") {
        query.status = "Rejected by Manager";
      } else if (status === "Approved") {
        query.status = "Approved by Manager";
      }
    } else if (user_role === "L&D") {
      if (status === "Pending") {
        query.status = "Approved by Manager";
      } else if (status === "Rejected") {
        query.status = "Rejected by L&D";
      } else if (status === "Approved") {
        query.status = "Approved by L&D";
      }
    }
    console.log(query);
    nominations = await NominationRequest.findAll({
      where: query,
      include: [
        {
          model: User,
          as: "user",
          attributes: [],
        },
        {
          model: User,
          as: "approver",
          attributes: [],
        },
        {
          model: TrainingProgram,
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "userId",
        "trainingProgramId",
        "assignerId",
        "status",
        "remarks",
        "createdBy",
        "updatedBy",
        "isActive",
        "createdAt",
        "updatedAt",
        [Sequelize.col("user.id"), "user_id"],
        [Sequelize.col("user.first_name"), "user_name"],
        [Sequelize.col("approver.id"), "approver_id"],
        [Sequelize.col("approver.first_name"), "approver_name"],
        [Sequelize.col("TrainingProgram.id"), "trainingProgram_id"],
        [Sequelize.col("TrainingProgram.title"), "trainingProgram_name"],
        [Sequelize.col("TrainingProgram.available_seats"), "available_seats"],
      ],
      limit,
      offset,
    });

    return res.json({ nominations });
  } catch (error) {
    console.error("Error in getNominationRequests:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getNominationRequests;
