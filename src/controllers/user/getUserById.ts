import { NextFunction, Request, Response } from "express";
import User from "../../models/user";

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
      attributes: [
        "employeeId",
        "firstName",
        "lastName",
        "email",
        "jobTitle",
        "department",
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "User data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export default getUserById;
