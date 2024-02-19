import { Notification } from "../../models/notification";
import { Request, Response } from "express";

const getNotification = async (req: Request, res: Response) => {
  try {
    const { user_id } = res.locals.decodedToken;
    const notifications = await Notification.findAll({
      where: {
        userId: user_id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Notification fetched successfully",
      data: {
        notifications: notifications,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
