import { NextFunction, Request, Response } from "express";
import User from "../../models/user";

// Function to get all users
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

const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, role } = res.locals.decodedToken;
    try {
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
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }
};

export { getAllUsers, getUserById, getCurrentUser };
