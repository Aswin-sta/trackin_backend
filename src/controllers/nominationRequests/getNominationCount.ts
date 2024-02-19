import { Request, Response } from "express";
import NominationRequest from "../../models/nominationRequest";
import { Op } from "sequelize";

const getNominationCount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user_id, user_role } = res.locals.decodedToken;

    if (user_role === "L&D") {
      const pendingNominationsCount = await NominationRequest.count({
        where: {
          status: "Approved by Manager",
        },
      });

      const approvedNominationsCount = await NominationRequest.count({
        where: {
          status: "Approved by L&D",
        },
      });

      const rejectedNominationsCount = await NominationRequest.count({
        where: {
          status: "Rejected by L&D",
        },
      });

      return res.status(200).json({
        success: "true",
        data: {
          pending: pendingNominationsCount,
          approved: approvedNominationsCount,
          rejected: rejectedNominationsCount,
        },
      });
    } else if (user_role === "Manager") {
      const pendingNominationsCount = await NominationRequest.count({
        where: {
          status: "Manager Approval Pending",
          assignerId: user_id,
        },
      });

      const approvedNominationsCount = await NominationRequest.count({
        where: {
          status: "Approved by Manager",
          assignerId: user_id,
        },
      });

      const rejectedNominationsCount = await NominationRequest.count({
        where: {
          status: "Rejected by Manager",
          assignerId: user_id,
        },
      });

      return res.status(200).json({
        success: "true",
        data: {
          pending: pendingNominationsCount,
          approved: approvedNominationsCount,
          rejected: rejectedNominationsCount,
        },
      });
    } else if (user_role === "Employee") {
      const pendingNominationsCount = await NominationRequest.count({
        where: {
          status: {
            [Op.in]: ["Manager Approval Pending", "Approved by Manager"],
          },
          userId: user_id,
        },
      });

      const approvedNominationsCount = await NominationRequest.count({
        where: {
          status: "Approved by L&D",
          userId: user_id,
        },
      });

      const rejectedNominationsCount = await NominationRequest.count({
        where: {
          status: {
            [Op.in]: ["Rejected by Manager", "Rejected by L&D"],
          },
          userId: user_id,
        },
      });

      return res.status(200).json({
        success: "true",
        data: {
          pending: pendingNominationsCount,
          approved: approvedNominationsCount,
          rejected: rejectedNominationsCount,
        },
      });
    } else {
      return res.status(403).json({ success: "false", Error: "Access Denied" });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: "false", error: "Internal Server Error" });
  }
};

export default getNominationCount;
