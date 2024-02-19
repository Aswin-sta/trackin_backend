import TargetAudience from '../../models/targetAudience';
import { Request, Response } from 'express';
const postTargetAudience = async (req: Request, res: Response): Promise<Response> => {
  //JWT Verification - Only L&D can add target audience
  const { user_id, user_role } = res.locals.decodedToken;
  try {
    const { name } = req.body;
    if (user_role === "L&D") {
      if (!name) {
        return res.status(400).json({ success: "false", error: "Bad request" });
      }
      const isExisting = await TargetAudience.findOne({
        where: { name },
        raw: true,
      });
      if (isExisting) {
        console.log("Target audience already exists");
        return res
          .status(409)
          .json({ success: false, message: "Target audience already exists" });
      }
      else {
        //Creating target audience record
        const newTargetAudience = await TargetAudience.create({
          name, createdBy: user_id
        });
        return res.status(201).json({
          success: "true",
          registration_id: `Added new Target Audience`,
        });
      }
    }
    else {
      return res.status(422).json({ success: "false", error: "Invalid user data" });
    }

  }
  catch (error) {
    console.error("Error in adding Target Audience:", error);
    return res.status(500).json({ success: "false", error: "Internal Server Error" });
  }
}

export default postTargetAudience;

