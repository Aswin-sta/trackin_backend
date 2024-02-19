import express, { Request, Response } from 'express';
import TargetAudience from '../../models/targetAudience';

const getTargetAudience = async (req: Request, res: Response) => {

  //JWT verification - All users can view the target audience
  const { id, user_role } = res.locals.decodedToken;

  if (user_role !== "L&D") {
    return res.status(422).json({ success: "false", error: "Invalid user data" });
  }

  //Getting all target audience records
  try {
    const targetAudiences = await TargetAudience.findAll();

    res.status(200).json({ success: "true", data: targetAudiences, message: "Target audience data fetched successfully" });
  } catch (error) {
    console.error("Error in fetching Target Audiences:", error);
    res.status(500).json({ success: "false", error: "Internal Server Error" });
  }
};

export default getTargetAudience;
