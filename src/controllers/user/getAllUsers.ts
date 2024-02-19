import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll({
      attributes: [
        "employeeId",
        "firstName",
        "lastName",
        "email",
        "jobTitle",
        "department",
      ],
    });

    return res.status(200).json({
      success: true,
      data: users,
      message: "All users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export default getAllUsers;
