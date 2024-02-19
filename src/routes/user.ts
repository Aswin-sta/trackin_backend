import express, { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  getCurrentUser,
} from "../controllers/user/getUSer";
import jwtVerification from "../middleware/jwtVerification";

const userRouter = express.Router();

userRouter.get("/users", jwtVerification, getAllUsers);

userRouter.get("/users/:id", jwtVerification, getUserById);

userRouter.get(
  "/profile",
  jwtVerification,
  async (req: Request, res: Response) => {
    getCurrentUser(req, res);
  }
);

export default userRouter;
