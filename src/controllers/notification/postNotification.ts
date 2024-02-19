import { Notification } from "../../models/notification";
import { Request, Response } from "express";

const postNotification = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;

    const notification = await Notification.create({
      userId,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Notification created successfully",
    });
  } catch (error: any) {
    console.error("Error creating notification:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export { postNotification };
