import UserTraining from "../../models/userTraining";
import { Request, Response } from "express";

const getParticipantsCount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const totalParticipantsCount = await UserTraining.count({
        distinct: true,
        col: 'userId' 
      });

    return res.status(200).json({
        success: "true",
        data: {
          total: totalParticipantsCount
        },
      });
    } 
    catch (error: any) {
    return res
      .status(500)
      .json({ success: "false", error: "Internal Server Error" });
  }
};

export default getParticipantsCount;
